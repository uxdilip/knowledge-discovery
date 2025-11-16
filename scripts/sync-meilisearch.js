/**
 * Script to initialize Meilisearch index and sync all existing documents from Appwrite
 * 
 * Usage:
 * 1. Make sure Meilisearch is running locally (see README for Docker command)
 * 2. Run: node scripts/sync-meilisearch.js
 */

const { Client, Databases, Query } = require('node-appwrite');
const { MeiliSearch } = require('meilisearch');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_SECRET_ID;

const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || '';

const DOCUMENTS_INDEX = 'documents';

async function main() {
    try {
        console.log('🚀 Starting Meilisearch sync...\n');

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)
            .setKey(API_KEY);

        const databases = new Databases(client);

        // Initialize Meilisearch client
        const meiliClient = new MeiliSearch({
            host: MEILISEARCH_HOST,
            apiKey: MEILISEARCH_KEY,
        });

        // Check Meilisearch health
        console.log('📡 Checking Meilisearch connection...');
        const health = await meiliClient.health();
        console.log(`✅ Meilisearch is ${health.status}\n`);

        // Create/get index with primary key
        console.log('📝 Setting up Meilisearch index...');
        await meiliClient.createIndex(DOCUMENTS_INDEX, { primaryKey: 'id' });
        const index = meiliClient.index(DOCUMENTS_INDEX);

        // Update index settings
        await index.updateSettings({
            searchableAttributes: [
                'title',
                'description',
                'content',
                'fileName',
                'tags',
            ],
            filterableAttributes: [
                'fileType',
                'categoryId',
                'uploadedBy',
                'createdAt',
                'tags',
            ],
            sortableAttributes: [
                'createdAt',
                'views',
                'downloads',
            ],
            displayedAttributes: [
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
            ],
        });

        console.log('✅ Meilisearch index configured\n');

        // Fetch all documents from Appwrite
        console.log('📥 Fetching documents from Appwrite...');
        const response = await databases.listDocuments(
            DATABASE_ID,
            'documents',
            [Query.limit(1000)] // Adjust if you have more documents
        );

        console.log(`Found ${response.documents.length} documents\n`);

        if (response.documents.length === 0) {
            console.log('⚠️  No documents to sync');
            return;
        }

        // Transform documents for Meilisearch
        const searchDocs = response.documents.map(doc => ({
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

        // Add documents to Meilisearch with primary key specified
        console.log('📤 Syncing documents to Meilisearch...');
        const task = await index.addDocuments(searchDocs, { primaryKey: 'id' });
        console.log(`Task ID: ${task.taskUid}`);
        console.log('⏳ Documents are being indexed in the background...');

        console.log(`✅ Successfully queued ${searchDocs.length} documents for indexing!\n`);        // Get index stats
        const stats = await index.getStats();
        console.log('📊 Index Statistics:');
        console.log(`   - Total documents: ${stats.numberOfDocuments}`);
        console.log(`   - Is indexing: ${stats.isIndexing}`);
        console.log(`   - Field distribution:`, Object.keys(stats.fieldDistribution).join(', '));

        console.log('\n🎉 Sync complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
}

main();
