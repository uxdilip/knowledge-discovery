/**
 * Re-index Existing Documents Script
 * 
 * This script:
 * 1. Fetches all existing documents from Appwrite
 * 2. Downloads each file from storage
 * 3. Extracts text content using appropriate extractors
 * 4. Updates document records with extracted content
 * 5. Re-syncs to Meilisearch with full content
 * 
 * Usage:
 * node scripts/reindex-documents.js
 */

const { Client, Databases, Storage, Query } = require('node-appwrite');
const { MeiliSearch } = require('meilisearch');
const mammoth = require('mammoth');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Note: PDF extraction is skipped in this script due to Node.js compatibility issues
// PDFs will be extracted on upload via the browser-based FileUpload component

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_SECRET_ID;

const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY || '';

const DOCUMENTS_INDEX = 'documents';
const TEMP_DIR = path.join(__dirname, '../temp_files');

// Content extraction functions (server-side versions)

async function extractPDFContent(filePath) {
    // PDF extraction skipped in Node.js - will be handled on upload
    console.log('   ⚠️  PDF content extraction skipped (upload new file to extract content)');
    return '';
}

async function extractDOCXContent(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer });
        return result.value.trim();
    } catch (error) {
        console.error('Error extracting DOCX content:', error.message);
        return '';
    }
}

async function extractTextContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8').trim();
    } catch (error) {
        console.error('Error extracting text content:', error.message);
        return '';
    }
}

async function extractExcelContent(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        let fullText = '';

        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetText = XLSX.utils.sheet_to_txt(worksheet);
            fullText += `\n--- ${sheetName} ---\n${sheetText}\n`;
        });

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting Excel content:', error.message);
        return '';
    }
}

async function downloadFile(url, filePath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filePath);

        protocol.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function extractContentFromFile(fileUrl, fileName, fileType) {
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    const tempFilePath = path.join(TEMP_DIR, fileName);

    try {
        // Download file
        await downloadFile(fileUrl, tempFilePath);

        // Extract content based on file type
        let content = '';

        if (fileType === 'application/pdf') {
            content = await extractPDFContent(tempFilePath);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
            content = await extractDOCXContent(tempFilePath);
        } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
            content = await extractTextContent(tempFilePath);
        } else if (
            fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            fileType === 'application/vnd.ms-excel' ||
            fileName.endsWith('.xlsx') ||
            fileName.endsWith('.xls')
        ) {
            content = await extractExcelContent(tempFilePath);
        } else {
            content = `File: ${fileName} (${fileType})`;
        }

        // Clean up temp file
        fs.unlinkSync(tempFilePath);

        return content;
    } catch (error) {
        console.error(`Error processing ${fileName}:`, error.message);

        // Clean up temp file on error
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        return '';
    }
}

function cleanContent(content) {
    return content
        .replace(/\s+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

async function main() {
    try {
        console.log('🚀 Starting document re-indexing...\n');

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)
            .setKey(API_KEY);

        const databases = new Databases(client);
        const storage = new Storage(client);

        // Initialize Meilisearch client
        const meiliClient = new MeiliSearch({
            host: MEILISEARCH_HOST,
            apiKey: MEILISEARCH_KEY,
        });

        // Fetch all documents
        console.log('📥 Fetching documents from Appwrite...');
        const response = await databases.listDocuments(
            DATABASE_ID,
            'documents',
            [Query.limit(1000)]
        );

        console.log(`Found ${response.documents.length} documents\n`);

        if (response.documents.length === 0) {
            console.log('⚠️  No documents to reindex');
            return;
        }

        let processed = 0;
        let updated = 0;
        let errors = 0;

        // Process each document
        for (const doc of response.documents) {
            try {
                console.log(`\n📄 Processing: ${doc.fileName}`);

                // Get file download URL
                const fileUrl = storage.getFileDownload(BUCKET_ID, doc.fileId);

                // Extract content
                console.log('   🔍 Extracting content...');
                const content = await extractContentFromFile(fileUrl.toString(), doc.fileName, doc.fileType);
                const cleanedContent = cleanContent(content);

                console.log(`   ✅ Extracted ${cleanedContent.length} characters`);

                // Update document in Appwrite
                console.log('   💾 Updating Appwrite...');
                await databases.updateDocument(
                    DATABASE_ID,
                    'documents',
                    doc.$id,
                    {
                        content: cleanedContent,
                        updatedAt: new Date().toISOString(),
                    }
                );

                // Update in Meilisearch
                console.log('   🔎 Updating Meilisearch...');
                const index = meiliClient.index(DOCUMENTS_INDEX);
                await index.updateDocuments([{
                    id: doc.$id,
                    content: cleanedContent,
                }]);

                updated++;
                console.log(`   ✨ Success! (${updated}/${response.documents.length})`);

            } catch (error) {
                errors++;
                console.error(`   ❌ Error processing ${doc.fileName}:`, error.message);
            }

            processed++;
        }

        // Clean up temp directory
        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true });
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 Re-indexing Summary:');
        console.log(`   Total documents: ${response.documents.length}`);
        console.log(`   Successfully updated: ${updated}`);
        console.log(`   Errors: ${errors}`);
        console.log('='.repeat(50));

        console.log('\n🎉 Re-indexing complete!');

    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

main();
