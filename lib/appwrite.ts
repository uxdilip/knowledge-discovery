import { Client, Account, Databases, Storage, Teams, ID, Query } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

// Export utilities
export { ID, Query };

// Constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const DOCUMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID!;
export const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!;
export const TAGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

export default client;
