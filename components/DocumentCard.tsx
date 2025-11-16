'use client';

import React from 'react';
import { Download, Eye, FileText, MoreVertical, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={handleView}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className="text-3xl">{getFileIcon(document.fileName)}</div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                {document.title}
                            </h3>
                            {highlightedSnippet ? (
                                <div
                                    className="text-xs text-muted-foreground mt-1 line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: highlightedSnippet }}
                                    style={{
                                        // Style for highlighted text
                                        '--mark-bg': 'rgb(var(--primary) / 0.2)',
                                        '--mark-color': 'rgb(var(--primary))',
                                    } as React.CSSProperties}
                                />
                            ) : document.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {document.description}
                                </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span>{formatFileSize(document.fileSize)}</span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {document.views || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Download className="w-3 h-3" />
                                    {document.downloads || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {document.tags && document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {document.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                        {document.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
                                +{document.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {formatDate(document.createdAt)}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleDownload}
                        title="Download"
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                            onClick={handleDelete}
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
