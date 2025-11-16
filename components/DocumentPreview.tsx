'use client';

import React, { useState } from 'react';
import { X, Download, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';

interface DocumentPreviewProps {
    document: Document | null;
    open: boolean;
    onClose: () => void;
    onDownload?: () => void;
}

export default function DocumentPreview({
    document,
    open,
    onClose,
    onDownload
}: DocumentPreviewProps) {
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    if (!document) return null;

    const isImage = document.fileType.startsWith('image/');
    const isPDF = document.fileType === 'application/pdf';
    const isText = document.fileType === 'text/plain';

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 flex flex-col gap-0">
                {/* Accessibility: Hidden title and description for screen readers */}
                <DialogTitle className="sr-only">{document.title}</DialogTitle>
                <DialogDescription className="sr-only">
                    Preview of {document.fileName}
                </DialogDescription>

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-background shrink-0">
                    <div className="flex-1 min-w-0 mr-4">
                        <h2 className="text-lg font-semibold truncate">{document.title}</h2>
                        <p className="text-sm text-muted-foreground truncate">{document.fileName}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {isImage && (
                            <div className="flex items-center gap-1 border rounded-lg px-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={handleZoomOut}
                                    disabled={zoom <= 50}
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </Button>
                                <span className="text-xs font-medium px-2 min-w-12 text-center">{zoom}%</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={handleZoomIn}
                                    disabled={zoom >= 200}
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(document.fileUrl, '_blank')}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-auto min-h-0">
                    {/* Image Preview */}
                    {isImage && (
                        <div className="flex items-center justify-center p-6 h-full bg-muted/30">
                            <img
                                src={document.fileUrl}
                                alt={document.title}
                                style={{ width: `${zoom}%` }}
                                className="max-w-full h-auto rounded-lg shadow-2xl"
                            />
                        </div>
                    )}

                    {/* PDF Preview - Using iframe for better compatibility */}
                    {isPDF && (
                        <div className="w-full h-full bg-muted/30">
                            <iframe
                                src={`${document.fileUrl}#view=FitH&toolbar=0&navpanes=0`}
                                className="w-full h-full border-0"
                                title={document.title}
                            />
                        </div>
                    )}

                    {/* Text Preview */}
                    {isText && document.content && (
                        <div className="p-6 h-full bg-muted/30">
                            <div className="bg-background rounded-lg p-6 shadow-sm border max-w-4xl mx-auto">
                                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                    {document.content}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Fallback for other file types */}
                    {!isImage && !isPDF && !isText && (
                        <div className="flex flex-col items-center justify-center h-full bg-muted/30">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                                    <ExternalLink className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">Preview not available</p>
                                    <p className="text-xs text-muted-foreground">
                                        This file type cannot be previewed in the browser
                                    </p>
                                </div>
                                <Button onClick={() => window.open(document.fileUrl, '_blank')}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open in New Tab
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Document Info Footer */}
                {document.description && (
                    <div className="p-4 border-t bg-muted/30 shrink-0">
                        <p className="text-sm">
                            <span className="font-medium text-foreground">Description:</span>{' '}
                            <span className="text-muted-foreground">{document.description}</span>
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
