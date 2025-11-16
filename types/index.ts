import { Models } from 'appwrite';

export interface Document extends Models.Document {
    title: string;
    description?: string;
    fileId: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
    content?: string;
    categoryId?: string;
    tags: string[];
    uploadedBy: string;
    teamId?: string;
    views: number;
    downloads: number;
    createdAt: string;
    updatedAt: string;
}

export interface Category extends Models.Document {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    createdBy: string;
    teamId?: string;
}

export interface Tag extends Models.Document {
    name: string;
    color?: string;
    usageCount: number;
}

export interface User {
    $id: string;
    name: string;
    email: string;
    prefs?: Record<string, any>;
}

export interface SearchFilters {
    query?: string;
    categoryId?: string;
    tags?: string[];
    fileType?: string;
    dateFrom?: string;
    dateTo?: string;
    uploadedBy?: string;
}

export interface UploadProgress {
    fileName: string;
    progress: number;
    status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
    error?: string;
}

export type FileType = 'pdf' | 'doc' | 'docx' | 'txt' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'image' | 'other';

export interface DocumentStats {
    totalDocuments: number;
    totalSize: number;
    totalViews: number;
    totalDownloads: number;
    documentsByCategory: Record<string, number>;
    documentsByType: Record<string, number>;
    recentUploads: number;
}
