/**
 * Content Extraction Utilities
 * Extract text content from various file formats for indexing and search
 */

import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

/**
 * Extract text content from PDF file
 * Dynamically imports PDF.js only on the client side to avoid SSR issues
 */
export async function extractPDFContent(file: File): Promise<string> {
    // Only run in browser
    if (typeof window === 'undefined') {
        console.warn('PDF extraction is only available in the browser');
        return '';
    }

    try {
        console.log('📄 Starting PDF extraction...');
        // Dynamic import to avoid SSR issues with DOMMatrix
        const pdfjsLib = await import('pdfjs-dist');
        console.log(`📄 PDF.js version: ${pdfjsLib.version}`);

        // Configure PDF.js worker - use the npm package's worker
        // The worker needs to be served from the public directory or via CDN
        if (typeof window !== 'undefined') {
            // Use unpkg CDN with the correct .mjs extension for newer versions
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            console.log(`📄 Worker URL: ${pdfjsLib.GlobalWorkerOptions.workerSrc}`);
        }

        const arrayBuffer = await file.arrayBuffer();
        console.log(`📄 Array buffer size: ${arrayBuffer.byteLength} bytes`);

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        console.log(`📄 PDF loaded, pages: ${pdf.numPages}`);

        let fullText = '';

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n';
            console.log(`📄 Page ${i}/${pdf.numPages}: ${pageText.length} characters`);
        }

        console.log(`📄 Total extracted: ${fullText.trim().length} characters`);
        return fullText.trim();
    } catch (error) {
        console.error('❌ Error extracting PDF content:', error);
        console.error('❌ Error details:', error instanceof Error ? error.message : String(error));
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return '';
    }
}/**
 * Extract text content from DOCX file
 */
export async function extractDOCXContent(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value.trim();
    } catch (error) {
        console.error('Error extracting DOCX content:', error);
        return '';
    }
}

/**
 * Extract text content from TXT file
 */
export async function extractTextContent(file: File): Promise<string> {
    try {
        const text = await file.text();
        return text.trim();
    } catch (error) {
        console.error('Error extracting text content:', error);
        return '';
    }
}

/**
 * Extract text content from Excel file (XLSX, XLS)
 */
export async function extractExcelContent(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        let fullText = '';

        // Extract text from all sheets
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetText = XLSX.utils.sheet_to_txt(worksheet);
            fullText += `\n--- ${sheetName} ---\n${sheetText}\n`;
        });

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting Excel content:', error);
        return '';
    }
}

/**
 * Extract metadata from image files
 */
export async function extractImageMetadata(file: File): Promise<string> {
    try {
        // For now, return basic metadata
        // In the future, we could add EXIF extraction, OCR, etc.
        return `Image file: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB, Type: ${file.type}`;
    } catch (error) {
        console.error('Error extracting image metadata:', error);
        return '';
    }
}

/**
 * Main content extraction function - routes to appropriate extractor based on file type
 */
export async function extractFileContent(file: File): Promise<string> {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    try {
        // PDF files
        if (fileType === 'application/pdf') {
            console.log(`📄 Extracting content from PDF: ${file.name}`);
            return await extractPDFContent(file);
        }

        // Word documents
        if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            fileName.endsWith('.docx')
        ) {
            console.log(`📝 Extracting content from DOCX: ${file.name}`);
            return await extractDOCXContent(file);
        }

        if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
            console.log(`📝 Extracting content from DOC: ${file.name}`);
            // DOC files need special handling or conversion
            return `DOC file: ${file.name} (legacy format - content extraction limited)`;
        }

        // Excel files
        if (
            fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            fileType === 'application/vnd.ms-excel' ||
            fileName.endsWith('.xlsx') ||
            fileName.endsWith('.xls')
        ) {
            console.log(`📊 Extracting content from Excel: ${file.name}`);
            return await extractExcelContent(file);
        }

        // Text files
        if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
            console.log(`📃 Extracting content from TXT: ${file.name}`);
            return await extractTextContent(file);
        }

        // Image files
        if (fileType.startsWith('image/')) {
            console.log(`🖼️ Extracting metadata from image: ${file.name}`);
            return await extractImageMetadata(file);
        }

        // Unsupported file type
        console.log(`⚠️ No content extraction available for: ${file.type}`);
        return `File: ${file.name} (${file.type})`;

    } catch (error) {
        console.error(`Error extracting content from ${file.name}:`, error);
        return '';
    }
}

/**
 * Truncate content to a maximum length for preview
 */
export function truncateContent(content: string, maxLength: number = 500): string {
    if (content.length <= maxLength) {
        return content;
    }
    return content.substring(0, maxLength) + '...';
}

/**
 * Extract searchable keywords from content
 */
export function extractKeywords(content: string, limit: number = 20): string[] {
    // Remove common stop words
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
        'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
        'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this',
        'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    ]);

    // Extract words
    const words = content
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word));

    // Count word frequency
    const wordCount = new Map<string, number>();
    words.forEach(word => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Sort by frequency and return top keywords
    return Array.from(wordCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word);
}

/**
 * Clean and normalize extracted content
 */
export function cleanContent(content: string): string {
    return content
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
        .trim();
}
