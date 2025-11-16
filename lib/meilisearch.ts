import { MeiliSearch } from 'meilisearch';

// Meilisearch client configuration
// For local development: Use Docker (see README)
// For production: Update with your Meilisearch host URL

const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST;
const MEILISEARCH_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || '';

// Check if Meilisearch is enabled
const isMeilisearchEnabled = !!MEILISEARCH_HOST;

export const meiliClient = isMeilisearchEnabled ? new MeiliSearch({
    host: MEILISEARCH_HOST,
    apiKey: MEILISEARCH_KEY,
}) : null;

// Index name for documents
export const DOCUMENTS_INDEX = 'documents';

// Initialize Meilisearch index with settings
export async function initializeMeilisearch() {
    if (!isMeilisearchEnabled || !meiliClient) {
        console.log('ℹ️ Meilisearch is disabled. Using Appwrite search.');
        return false;
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);

        // Configure searchable attributes
        await index.updateSearchableAttributes([
            'title',
            'description',
            'content',
            'fileName',
            'tags',
        ]);

        // Configure filterable attributes
        await index.updateFilterableAttributes([
            'fileType',
            'categoryId',
            'uploadedBy',
            'createdAt',
            'tags',
        ]);

        // Configure sortable attributes
        await index.updateSortableAttributes([
            'createdAt',
            'views',
            'downloads',
        ]);

        // Configure displayed attributes
        await index.updateDisplayedAttributes([
            'id',
            'title',
            'description',
            'fileName',
            'fileType',
            'fileSize',
            'fileUrl',
            'categoryId',
            'tags',
            'views',
            'downloads',
            'createdAt',
            'fileId',
        ]);

        console.log('✅ Meilisearch index configured successfully');
        return true;
    } catch (error) {
        console.error('❌ Error initializing Meilisearch:', error);
        return false;
    }
}

// Add document to Meilisearch
export async function addDocumentToSearch(document: any) {
    if (!isMeilisearchEnabled || !meiliClient) {
        return true; // Silently skip if disabled
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);

        // Transform Appwrite document to Meilisearch format
        const searchDoc = {
            id: document.$id,
            title: document.title,
            description: document.description || '',
            content: document.content || '',
            fileName: document.fileName,
            fileType: document.fileType,
            fileSize: document.fileSize,
            fileUrl: document.fileUrl,
            fileId: document.fileId,
            categoryId: document.categoryId || null,
            tags: document.tags || [],
            uploadedBy: document.uploadedBy,
            views: document.views || 0,
            downloads: document.downloads || 0,
            createdAt: new Date(document.createdAt).getTime(), // Unix timestamp for sorting
        };

        await index.addDocuments([searchDoc]);
        console.log('✅ Document added to Meilisearch:', document.title);
        return true;
    } catch (error) {
        console.error('❌ Error adding document to Meilisearch:', error);
        return false;
    }
}

// Update document in Meilisearch
export async function updateDocumentInSearch(documentId: string, updates: any) {
    if (!isMeilisearchEnabled || !meiliClient) {
        return true; // Silently skip if disabled
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);
        await index.updateDocuments([{ id: documentId, ...updates }]);
        console.log('✅ Document updated in Meilisearch');
        return true;
    } catch (error) {
        console.error('❌ Error updating document in Meilisearch:', error);
        return false;
    }
}

// Delete document from Meilisearch
export async function deleteDocumentFromSearch(documentId: string) {
    if (!isMeilisearchEnabled || !meiliClient) {
        return true; // Silently skip if disabled
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);
        await index.deleteDocument(documentId);
        console.log('✅ Document deleted from Meilisearch');
        return true;
    } catch (error) {
        console.error('❌ Error deleting document from Meilisearch:', error);
        return false;
    }
}

// Search documents with Meilisearch
export async function searchDocuments(query: string, filters?: any) {
    if (!isMeilisearchEnabled || !meiliClient) {
        return { hits: [], query, processingTimeMs: 0, limit: 0, offset: 0, estimatedTotalHits: 0 };
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);

        // Build filter string
        let filterString = '';
        if (filters) {
            const filterParts = [];

            if (filters.fileType) {
                filterParts.push(`fileType = "${filters.fileType}"`);
            }
            if (filters.categoryId) {
                filterParts.push(`categoryId = "${filters.categoryId}"`);
            }
            if (filters.tags && filters.tags.length > 0) {
                const tagFilters = filters.tags.map((tag: string) => `tags = "${tag}"`).join(' OR ');
                filterParts.push(`(${tagFilters})`);
            }

            filterString = filterParts.join(' AND ');
        }

        const searchResults = await index.search(query, {
            filter: filterString || undefined,
            limit: 50,
            attributesToHighlight: ['title', 'description', 'content'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
            sort: ['createdAt:desc'],
        });

        return searchResults;
    } catch (error) {
        console.error('❌ Error searching documents:', error);
        return { hits: [], query, processingTimeMs: 0, limit: 0, offset: 0, estimatedTotalHits: 0 };
    }
}

// Sync all Appwrite documents to Meilisearch
export async function syncAllDocuments(documents: any[]) {
    if (!isMeilisearchEnabled || !meiliClient) {
        console.log('ℹ️ Meilisearch is disabled. Skipping sync.');
        return false;
    }

    try {
        const index = meiliClient.index(DOCUMENTS_INDEX);

        const searchDocs = documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            description: doc.description || '',
            content: doc.content || '',
            fileName: doc.fileName,
            fileType: doc.fileType,
            fileSize: doc.fileSize,
            fileUrl: doc.fileUrl,
            fileId: doc.fileId,
            categoryId: doc.categoryId || null,
            tags: doc.tags || [],
            uploadedBy: doc.uploadedBy,
            views: doc.views || 0,
            downloads: doc.downloads || 0,
            createdAt: new Date(doc.createdAt).getTime(),
        }));

        await index.addDocuments(searchDocs);
        console.log(`✅ Synced ${searchDocs.length} documents to Meilisearch`);
        return true;
    } catch (error) {
        console.error('❌ Error syncing documents to Meilisearch:', error);
        return false;
    }
}

// Check if Meilisearch is available
export async function checkMeilisearchHealth() {
    if (!isMeilisearchEnabled || !meiliClient) {
        return false; // Disabled, so return false without warning
    }

    try {
        const health = await meiliClient.health();
        return health.status === 'available';
    } catch (error) {
        console.warn('⚠️ Meilisearch not available, using Appwrite search');
        return false;
    }
}
