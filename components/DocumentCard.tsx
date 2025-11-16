'use client';

import React from 'react';
import { Download, Eye, Trash2, File } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';
import { formatFileSize, formatDate, getFileIcon } from '@/lib/utils';

interface DocumentCardProps {
    document: Document;
    onView?: (document: Document) => void;
    onDownload?: (document: Document) => void;
    onDelete?: (document: Document) => void;
    highlightedSnippet?: string; // HTML string with <mark> tags from Meilisearch
}

export default function DocumentCard({
    document,
    onView,
    onDownload,
    onDelete,
    highlightedSnippet
}: DocumentCardProps) {
    const handleView = () => {
        if (onView) onView(document);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDownload) onDownload(document);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) onDelete(document);
    };

    return (
        <Card
            className="group relative overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
            onClick={handleView}
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-5">
                {/* Header with icon and actions */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* File Icon */}
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                            {getFileIcon(document.fileName)}
                        </div>
                        
                        {/* File info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                                {document.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {document.fileName}
                            </p>
                        </div>
                    </div>
                    
                    {/* Action buttons - always visible on mobile, hover on desktop */}
                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            onClick={handleDownload}
                            title="Download"
                        >
                            <Download className="w-4 h-4" />
                        </Button>
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                onClick={handleDelete}
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Description or Highlighted Snippet */}
                {highlightedSnippet ? (
                    <div
                        className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightedSnippet }}
                    />
                ) : document.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {document.description}
                    </p>
                )}

                {/* Tags */}
                {document.tags && document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {document.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                        {document.tags.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                                +{document.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer metadata */}
                <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-muted-foreground font-medium">
                        {formatDate(document.createdAt)}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium">{formatFileSize(document.fileSize)}</span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {document.views || 0}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
