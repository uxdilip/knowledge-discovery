'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SearchFilters } from '@/types';

interface SearchBarProps {
    onSearchAction: (filters: SearchFilters) => void;
    categories?: Array<{ $id: string; name: string }>;
}

export default function SearchBar({ onSearchAction, categories = [] }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({});

    const handleSearch = () => {
        onSearchAction({
            ...filters,
            query: query || undefined,
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearFilters = () => {
        setQuery('');
        setFilters({});
        onSearchAction({});
    };

    const hasActiveFilters = query || filters.categoryId || filters.fileType || filters.tags?.length;

    return (
        <div className="space-y-4">
            {/* Main search bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search documents, files, or content..."
                        className="pl-10 pr-10"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <Button onClick={handleSearch}>Search</Button>
                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Advanced filters */}
            {showFilters && (
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Category</label>
                            <select
                                value={filters.categoryId || ''}
                                onChange={(e) => setFilters({ ...filters, categoryId: e.target.value || undefined })}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.$id} value={cat.$id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">File Type</label>
                            <select
                                value={filters.fileType || ''}
                                onChange={(e) => setFilters({ ...filters, fileType: e.target.value || undefined })}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">All Types</option>
                                <option value="application/pdf">PDF</option>
                                <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Word</option>
                                <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">Excel</option>
                                <option value="text/plain">Text</option>
                                <option value="image">Images</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Date From</label>
                            <Input
                                type="date"
                                value={filters.dateFrom || ''}
                                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" onClick={clearFilters}>
                            Clear All
                        </Button>
                        <Button onClick={handleSearch}>Apply Filters</Button>
                    </div>
                </Card>
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {query && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                            Search: {query}
                            <button onClick={() => setQuery('')}>
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.categoryId && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                            Category
                            <button onClick={() => setFilters({ ...filters, categoryId: undefined })}>
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.fileType && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                            File Type
                            <button onClick={() => setFilters({ ...filters, fileType: undefined })}>
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}
