'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { storage, databases, ID, BUCKET_ID, DATABASE_ID, DOCUMENTS_COLLECTION_ID } from '@/lib/appwrite';
import { addDocumentToSearch } from '@/lib/meilisearch';
import { extractFileContent, cleanContent, truncateContent } from '@/lib/extractors';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { UploadProgress } from '@/types';
import { formatFileSize, getFileIcon } from '@/lib/utils';

const ALLOWED_FILE_TYPES = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FileUploadProps {
    onUploadComplete?: () => void;
    categoryId?: string;
}

export default function FileUpload({ onUploadComplete, categoryId }: FileUploadProps) {
    const { user } = useAuth();
    const [uploads, setUploads] = useState<UploadProgress[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const processFile = async (file: File, uploadedFileId: string) => {
        try {
            // Extract text content from the file
            console.log(`🔍 Extracting content from ${file.name}...`);
            const extractedContent = await extractFileContent(file);
            const cleanedContent = cleanContent(extractedContent);

            console.log(`✅ Extracted ${cleanedContent.length} characters from ${file.name}`);

            // Create document record in database with extracted content
            const document = await databases.createDocument(
                DATABASE_ID,
                DOCUMENTS_COLLECTION_ID,
                ID.unique(),
                {
                    title: title || file.name,
                    description: description || truncateContent(cleanedContent, 200),
                    content: cleanedContent, // Store full extracted content
                    fileId: uploadedFileId,
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    fileUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
                    categoryId: categoryId || null,
                    tags: tags ? tags.split(',').map(t => t.trim()) : [],
                    uploadedBy: user?.$id || '',
                    views: 0,
                    downloads: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            );

            // Add document to Meilisearch index (includes content for search)
            await addDocumentToSearch(document);

            return true;
        } catch (error) {
            console.error('Error creating document record:', error);
            return false;
        }
    };

    const uploadFile = async (file: File) => {
        const uploadId = file.name;

        setUploads(prev => [...prev, {
            fileName: file.name,
            progress: 0,
            status: 'uploading',
        }]);

        try {
            // Upload file to Appwrite Storage
            const response = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                file,
                // @ts-ignore - Appwrite SDK typing issue
                undefined,
                (progress) => {
                    const percentage = Math.round((progress.chunksUploaded / progress.chunksTotal) * 100);
                    setUploads(prev => prev.map(u =>
                        u.fileName === uploadId ? { ...u, progress: percentage } : u
                    ));
                }
            );

            // Update status to processing
            setUploads(prev => prev.map(u =>
                u.fileName === uploadId ? { ...u, status: 'processing', progress: 100 } : u
            ));

            // Process and create document record
            const success = await processFile(file, response.$id);

            if (success) {
                setUploads(prev => prev.map(u =>
                    u.fileName === uploadId ? { ...u, status: 'completed' } : u
                ));

                // Clear form
                setTitle('');
                setDescription('');
                setTags('');

                if (onUploadComplete) {
                    onUploadComplete();
                }
            } else {
                throw new Error('Failed to process file');
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            setUploads(prev => prev.map(u =>
                u.fileName === uploadId ? {
                    ...u,
                    status: 'error',
                    error: error.message || 'Upload failed'
                } : u
            ));
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Maximum size is 50MB.`);
                return;
            }
            uploadFile(file);
        });
    }, [title, description, tags]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ALLOWED_FILE_TYPES,
        maxSize: MAX_FILE_SIZE,
    });

    const removeUpload = (fileName: string) => {
        setUploads(prev => prev.filter(u => u.fileName !== fileName));
    };

    return (
        <div className="space-y-4">
            {/* File metadata form */}
            <Card className="p-4">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Title (optional)</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document title (defaults to filename)"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Description (optional)</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the document"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Tags (optional)</label>
                        <Input
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="marketing, strategy, campaign (comma-separated)"
                        />
                    </div>
                </div>
            </Card>

            {/* Dropzone */}
            <Card
                {...getRootProps()}
                className={`p-8 cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-dashed'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                    <div>
                        <p className="text-lg font-medium">
                            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            or click to browse
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Supported: PDF, DOC, DOCX, TXT, XLS, XLSX, Images • Max 50MB
                    </p>
                </div>
            </Card>

            {/* Upload progress */}
            {uploads.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Uploads</h3>
                    {uploads.map((upload) => (
                        <Card key={upload.fileName} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                    <File className="w-5 h-5 text-muted-foreground" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {upload.fileName}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            {upload.status === 'uploading' && (
                                                <>
                                                    <div className="w-full bg-secondary rounded-full h-1.5">
                                                        <div
                                                            className="bg-primary h-1.5 rounded-full transition-all"
                                                            style={{ width: `${upload.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {upload.progress}%
                                                    </span>
                                                </>
                                            )}
                                            {upload.status === 'processing' && (
                                                <div className="flex items-center space-x-2">
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    <span className="text-xs text-muted-foreground">
                                                        Processing...
                                                    </span>
                                                </div>
                                            )}
                                            {upload.status === 'completed' && (
                                                <span className="text-xs text-green-600">✓ Completed</span>
                                            )}
                                            {upload.status === 'error' && (
                                                <span className="text-xs text-red-600">
                                                    ✗ {upload.error}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {upload.status !== 'uploading' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeUpload(upload.fileName)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
