'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { databases, storage, Query, DATABASE_ID, DOCUMENTS_COLLECTION_ID, BUCKET_ID } from '@/lib/appwrite';
import { searchDocuments, updateDocumentInSearch, deleteDocumentFromSearch, checkMeilisearchHealth } from '@/lib/meilisearch';
import { Document, SearchFilters } from '@/types';
import SearchBar from '@/components/SearchBar';
import DocumentCard from '@/components/DocumentCard';
import FileUpload from '@/components/FileUpload';
import DocumentPreview from '@/components/DocumentPreview';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Upload, LogOut, FileSearch } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({});
    const [useMeilisearch, setUseMeilisearch] = useState(true);
    const [searchTime, setSearchTime] = useState<number>(0);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    // Check if Meilisearch is available on mount
    useEffect(() => {
        const checkSearch = async () => {
            const isAvailable = await checkMeilisearchHealth();
            setUseMeilisearch(isAvailable);
            // No need to log - checkMeilisearchHealth handles logging internally
        };
        checkSearch();
    }, []);

    const fetchDocuments = async (searchFilters: SearchFilters = {}) => {
        try {
            setLoading(true);
            const startTime = performance.now();

            // Try Meilisearch first if available
            if (useMeilisearch && searchFilters.query) {
                const searchResults = await searchDocuments(searchFilters.query, {
                    fileType: searchFilters.fileType,
                    categoryId: searchFilters.categoryId,
                    tags: searchFilters.tags,
                });

                const endTime = performance.now();
                setSearchTime(searchResults.processingTimeMs || Math.round(endTime - startTime));

                // Transform Meilisearch hits to Document format
                const docs = searchResults.hits.map((hit: any) => ({
                    $id: hit.id,
                    $collectionId: DOCUMENTS_COLLECTION_ID,
                    $databaseId: DATABASE_ID,
                    $createdAt: new Date(hit.createdAt).toISOString(),
                    $updatedAt: new Date(hit.createdAt).toISOString(),
                    $permissions: [],
                    $sequence: 0,
                    title: hit.title,
                    description: hit.description,
                    fileName: hit.fileName,
                    fileType: hit.fileType,
                    fileSize: hit.fileSize,
                    fileUrl: hit.fileUrl,
                    fileId: hit.fileId,
                    categoryId: hit.categoryId,
                    tags: hit.tags,
                    uploadedBy: hit.uploadedBy,
                    views: hit.views,
                    downloads: hit.downloads,
                    createdAt: new Date(hit.createdAt).toISOString(),
                    updatedAt: new Date(hit.createdAt).toISOString(),
                    _highlightResult: hit._formatted, // For highlighting
                }));

                setDocuments(docs);
            } else {
                // Fallback to Appwrite search
                const queries = [];

                // Build queries based on filters
                if (searchFilters.query) {
                    queries.push(Query.search('title', searchFilters.query));
                }
                if (searchFilters.categoryId) {
                    queries.push(Query.equal('categoryId', searchFilters.categoryId));
                }
                if (searchFilters.fileType) {
                    queries.push(Query.equal('fileType', searchFilters.fileType));
                }

                // Order by most recent
                queries.push(Query.orderDesc('$createdAt'));
                queries.push(Query.limit(50));

                const response = await databases.listDocuments(
                    DATABASE_ID,
                    DOCUMENTS_COLLECTION_ID,
                    queries
                );

                const endTime = performance.now();
                setSearchTime(Math.round(endTime - startTime));

                setDocuments(response.documents as unknown as Document[]);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);

    const handleSearch = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        fetchDocuments(newFilters);
    };

    const handleUploadComplete = () => {
        setShowUpload(false);
        fetchDocuments(filters);
    };

    const handleViewDocument = async (document: Document) => {
        try {
            const newViewCount = (document.views || 0) + 1;

            // Increment view count in Appwrite
            await databases.updateDocument(
                DATABASE_ID,
                DOCUMENTS_COLLECTION_ID,
                document.$id,
                { views: newViewCount }
            );

            // Update Meilisearch
            if (useMeilisearch) {
                await updateDocumentInSearch(document.$id, { views: newViewCount });
            }

            // Update local state
            setDocuments(prev => prev.map(d =>
                d.$id === document.$id ? { ...d, views: newViewCount } : d
            ));

            // Show preview modal instead of opening in new tab
            setSelectedDocument({ ...document, views: newViewCount });
            setShowPreview(true);
        } catch (error) {
            console.error('Error viewing document:', error);
        }
    };

    const handleDownloadDocument = async (document: Document) => {
        try {
            const newDownloadCount = (document.downloads || 0) + 1;

            // Increment download count in Appwrite
            await databases.updateDocument(
                DATABASE_ID,
                DOCUMENTS_COLLECTION_ID,
                document.$id,
                { downloads: newDownloadCount }
            );

            // Update Meilisearch
            if (useMeilisearch) {
                await updateDocumentInSearch(document.$id, { downloads: newDownloadCount });
            }

            // Get download URL
            const result = storage.getFileDownload(BUCKET_ID, document.fileId);

            // Trigger download
            const link = window.document.createElement('a');
            link.href = result;
            link.download = document.fileName;
            link.click();

            // Refresh documents to show updated counts
            fetchDocuments(filters);
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    };

    const handleDeleteDocument = async (document: Document) => {
        if (!confirm(`Are you sure you want to delete "${document.title}"?`)) {
            return;
        }

        try {
            // Delete file from storage
            await storage.deleteFile(BUCKET_ID, document.fileId);

            // Delete document record from Appwrite
            await databases.deleteDocument(
                DATABASE_ID,
                DOCUMENTS_COLLECTION_ID,
                document.$id
            );

            // Delete from Meilisearch
            if (useMeilisearch) {
                await deleteDocumentFromSearch(document.$id);
            }

            // Refresh documents
            fetchDocuments(filters);
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FileSearch className="w-8 h-8 text-primary" />
                            <div>
                                <h1 className="text-2xl font-bold">Knowledge Discovery</h1>
                                <p className="text-sm text-muted-foreground">
                                    Find what you need, instantly
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-muted-foreground">
                                {user.name || user.email}
                            </span>
                            <Button variant="outline" onClick={logout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Upload */}
                <div className="mb-8 space-y-4">
                    <SearchBar onSearchAction={handleSearch} />
                    <div className="flex justify-end">
                        <Button onClick={() => setShowUpload(true)}>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Documents
                        </Button>
                    </div>
                </div>

                {/* Documents Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : documents.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    {documents.length} document{documents.length !== 1 ? 's' : ''} found
                                </p>
                                {searchTime > 0 && (
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Search completed in {searchTime}ms
                                    </p>
                                )}
                            </div>
                            {useMeilisearch && (
                                <span className="text-xs px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Enhanced Search
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {documents.map((doc) => {
                                // Extract highlighted snippet from Meilisearch results
                                const highlighted = (doc as any)._highlightResult;
                                const snippet = highlighted?.content || highlighted?.description || highlighted?.title;

                                return (
                                    <DocumentCard
                                        key={doc.$id}
                                        document={doc}
                                        onView={handleViewDocument}
                                        onDownload={handleDownloadDocument}
                                        onDelete={handleDeleteDocument}
                                        highlightedSnippet={snippet}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FileSearch className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                        <p className="text-muted-foreground mb-4">
                            {filters.query || filters.categoryId || filters.fileType
                                ? 'Try adjusting your search filters'
                                : 'Upload your first document to get started'}
                        </p>
                        <Button onClick={() => setShowUpload(true)}>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Documents
                        </Button>
                    </div>
                )}
            </main>

            {/* Upload Dialog */}
            <Dialog open={showUpload} onOpenChange={setShowUpload}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Upload Documents</DialogTitle>
                    </DialogHeader>
                    <FileUpload onUploadComplete={handleUploadComplete} />
                </DialogContent>
            </Dialog>

            {/* Document Preview */}
            <DocumentPreview
                document={selectedDocument}
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onDownload={() => selectedDocument && handleDownloadDocument(selectedDocument)}
            />
        </div>
    );
}
