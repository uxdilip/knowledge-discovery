# 🔍 Knowledge Discovery# 🔍 Knowledge Discovery# 🔍 Knowledge DiscoveryThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



**Smart Internal Search Tool for Marketing Teams**



A powerful document management and search platform that helps marketing teams find their documents and assets instantly. Built with Next.js 14, TypeScript, Appwrite, Meilisearch, and Tailwind CSS.Smart internal search tool for marketing teams to manage and discover documents instantly.



[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)



---## ✨ Features**Smart Internal Search Tool for Marketing Teams**## Getting Started



## ✨ Features



### 🎯 Core Features- 📁 **File Upload** - Drag & drop support for multiple formats



- **📁 Smart File Upload**: Drag-and-drop interface supporting multiple formats- 🔎 **Smart Search** - Full-text search with advanced filters

- **🔎 Lightning-Fast Search**: Powered by Meilisearch with typo tolerance

- **📊 Multi-Format Support**: PDF, DOCX, TXT, XLSX, Images, and more- 📊 **Multi-Format** - PDF, DOCX, TXT, XLSX, ImagesA powerful, AI-ready document management and search platform that helps marketing teams find their documents and assets instantly. Built with Next.js 14, TypeScript, Appwrite, and Tailwind CSS.First, run the development server:

- **🏷️ Tagging System**: Organize documents with custom tags

- **👁️ Quick Preview**: Instant document preview and download- 👁️ **Quick Preview** - Instant document viewing

- **📈 Analytics**: Track views and downloads for each document

- **🔐 Secure Authentication**: Email/password auth with Appwrite- 📈 **Analytics** - Track views and downloads

- **🎨 Modern UI**: Clean, responsive interface built with Shadcn/ui

- **⚡ Auto-Fallback**: Graceful degradation to Appwrite search if Meilisearch is unavailable- 🔐 **Secure Auth** - User authentication with Appwrite



### 🚀 What Makes It Special- 🎨 **Modern UI** - Clean, responsive design![Knowledge Discovery Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=Knowledge+Discovery)```bash



- **< 10ms Search**: Ultra-fast search results with Meilisearch

- **Typo-Tolerant**: Find documents even with spelling mistakes

- **Smart Indexing**: Automatically indexes document content## 🛠️ Tech Stacknpm run dev

- **Real-Time Updates**: Document changes sync to search instantly

- **Offline-First**: Works even when search service is down



---- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui## ✨ Features# or



## 🛠️ Tech Stack- **Backend**: Appwrite (Auth, Database, Storage)



### Frontend- **Deployment**: Vercelyarn dev



- **[Next.js 14](https://nextjs.org/)** - React framework with App Router

- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS## 🚀 Quick Start### 🎯 Core Features (MVP)# or

- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components

- **[Lucide Icons](https://lucide.dev/)** - Icon library

- **[React Dropzone](https://react-dropzone.js.org/)** - Drag & drop uploads

### 1. Install Dependencies- **📁 Smart File Upload**: Drag-and-drop interface supporting multiple formatspnpm dev

### Backend & Services



- **[Appwrite](https://appwrite.io/)** - Open-source Backend-as-a-Service

  - Authentication\`\`\`bash- **🔎 Full-Text Search**: Fast and relevant search across all documents# or

  - Database (Documents storage)

  - File Storagenpm install

  - Teams & Permissions

\`\`\`- **📊 Multi-Format Support**: PDF, DOCX, TXT, XLSX, Images, and morebun dev

- **[Meilisearch](https://www.meilisearch.com/)** - Lightning-fast search engine ⚡

  - Typo-tolerant search

  - Instant search results (< 10ms)

  - Faceted search & filters### 2. Setup Appwrite- **🏷️ Auto-Categorization**: Keyword-based automatic document organization```

  - Self-hosted or cloud



- **[Vercel](https://vercel.com/)** - Deployment platform

1. Create account at [cloud.appwrite.io](https://cloud.appwrite.io/)- **👁️ Quick Preview**: Instant document preview and download

### File Processing

2. Create new project

- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF text extraction

- **[Mammoth.js](https://github.com/mwilliamson/mammoth.js/)** - Word document processing3. Create database with collections:- **📈 Analytics**: Track views and downloads for each documentOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **[XLSX](https://github.com/SheetJS/sheetjs)** - Excel file processing

   - **documents** (with attributes: title, description, fileId, etc.)

---

   - **categories** (optional)- **🔐 Secure Authentication**: Email/password auth with Appwrite

## 📋 Prerequisites

   - **tags** (optional)

Before you begin, ensure you have:

4. Create storage bucket for file uploads- **👥 Team Management**: Share documents across your teamYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Node.js 18+** installed

- **npm** or **yarn** package manager

- **Docker** (for Meilisearch - optional but recommended)

- **Appwrite instance** (self-hosted or cloud)### 3. Environment Variables- **🎨 Modern UI**: Clean, responsive interface built with Shadcn/ui

- **Vercel account** (for deployment)



---

Copy \`.env.local.example\` to \`.env.local\`:This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🚀 Quick Start



### 1. Clone the Repository

\`\`\`env### 🚀 Coming Soon (Full-Featured)

```bash

git clone https://github.com/uxdilip/knowledge-discovery.gitNEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

cd knowledge-discovery

```NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id- **🤖 AI-Powered Search**: Semantic search with OpenAI embeddings## Learn More



### 2. Install DependenciesNEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id



```bashNEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID=documents- **🔍 Advanced Filters**: Filter by date, type, category, and more

npm install

```NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id



### 3. Set Up Appwrite\`\`\`- **📑 OCR Support**: Extract text from images and scanned PDFsTo learn more about Next.js, take a look at the following resources:



You can use Appwrite Cloud (easiest) or self-host with Docker.



#### Option A: Appwrite Cloud (Recommended)### 4. Run Development Server- **🏢 Team Workspaces**: Separate spaces for different teams



1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)

2. Create a new project

3. Note your Project ID and Endpoint\`\`\`bash- **📱 Mobile App**: iOS and Android applications- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.



#### Option B: Self-Hosted Appwritenpm run dev



```bash\`\`\`- **📊 Analytics Dashboard**: Comprehensive usage insights- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

docker run -d \

  --name appwrite \

  -p 80:80 \

  -p 443:443 \Open [http://localhost:3000](http://localhost:3000)- **🔔 Notifications**: Real-time updates and alerts

  -v appwrite_data:/storage \

  appwrite/appwrite:latest

```

## 📦 DeploymentYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### 4. Configure Appwrite



1. **Create Database**: Name it `knowledge-discovery-db`

### Deploy to Vercel---

2. **Create Collections**:



   **Documents Collection** (`documents`):

   - `title` (String, 255, required)1. Push to GitHub## Deploy on Vercel

   - `description` (String, 1000)

   - `fileId` (String, 255, required)2. Import repository on [vercel.com](https://vercel.com)

   - `fileName` (String, 255, required)

   - `fileSize` (Integer, required)3. Add environment variables## 🛠️ Tech Stack

   - `fileType` (String, 100, required)

   - `fileUrl` (String, 500, required)4. Deploy!

   - `content` (String, 10000)

   - `categoryId` (String, 255)The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

   - `tags` (String[], array)

   - `uploadedBy` (String, 255, required)[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

   - `views` (Integer, default: 0)

   - `downloads` (Integer, default: 0)### Frontend

   - `createdAt` (DateTime, required)

   - `updatedAt` (DateTime, required)## 🔧 Configuration



   **Optional Collections**: `categories`, `tags`- **[Next.js 14](https://nextjs.org/)** - React framework with App RouterCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



3. **Create Storage Bucket** (`documents-bucket`):### Bucket Permissions (Appwrite Console)

   - Max file size: 52428800 (50MB)

   - Allowed extensions: `pdf,doc,docx,txt,xls,xlsx,jpg,jpeg,png,gif,svg`- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

   - Permissions: Read/Write for authenticated users

Set these permissions on your storage bucket:- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS

### 5. Environment Variables

- **Read**: Role `Any`- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components

Create `.env.local` file in the root directory:

- **Create**: Role `Users`- **[Lucide Icons](https://lucide.dev/)** - Icon library

```env

# Appwrite Configuration- **Update**: Role `Users`- **[React Query](https://tanstack.com/query)** - Data fetching & caching

NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here- **Delete**: Role `Users`



# Appwrite Database Configuration### Backend & Services

NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID=documents### File Settings- **[Appwrite](https://appwrite.io/)** - Open-source Backend-as-a-Service

NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=categories

NEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID=tags  - Authentication



# Appwrite Storage Configuration- Max file size: 50MB  - Database (Documents storage)

NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id

- Allowed extensions: pdf, doc, docx, txt, xls, xlsx, jpg, png, gif, svg  - File Storage

# Appwrite API Key (for scripts)

NEXT_PUBLIC_APPWRITE_API_SECRET_ID=your_api_key  - Teams & Permissions



# Meilisearch Configuration (Optional - for enhanced search)## 📖 Usage- **[Vercel](https://vercel.com/)** - Deployment platform

NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700

NEXT_PUBLIC_MEILISEARCH_KEY=

```

1. **Register** - Create an account at `/register`### File Processing

### 6. Set Up Meilisearch (Optional but Recommended)

2. **Upload** - Click "Upload Documents" and drag files- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF text extraction

Meilisearch provides ultra-fast, typo-tolerant search.

3. **Search** - Use search bar with filters- **[Mammoth.js](https://github.com/mwilliamson/mammoth.js/)** - Word document processing

#### Run Meilisearch with Docker:

4. **View** - Click documents to preview- **[XLSX](https://github.com/SheetJS/sheetjs)** - Excel file processing

```bash

docker run -d \5. **Download** - Hover and click download icon- **[React Dropzone](https://react-dropzone.js.org/)** - Drag & drop uploads

  --name meilisearch \

  -p 7700:7700 \

  -v $(pwd)/meili_data:/meili_data \

  getmeili/meilisearch:latest## 💰 Cost### Future Integrations

```

- **[Meilisearch](https://www.meilisearch.com/)** - Advanced search engine

#### Sync Existing Documents:

- **Development**: Free (Appwrite Cloud free tier)- **[OpenAI](https://openai.com/)** - Semantic search & categorization

After starting Meilisearch, sync your Appwrite documents:

- **Production**: ~$5-10/month (Vercel + Appwrite)- **[Langchain](https://www.langchain.com/)** - Document processing pipeline

```bash

node scripts/sync-meilisearch.js

```

## 📄 License---

This will:

- ✅ Create the Meilisearch index

- ✅ Configure searchable/filterable attributes

- ✅ Sync all documents from AppwriteMIT License - see LICENSE file## 📋 Prerequisites

- ✅ Enable enhanced search features



**Note**: If Meilisearch is not available, the app automatically falls back to Appwrite's search.

## 🙏 AcknowledgmentsBefore you begin, ensure you have:

### 7. Run Development Server

- **Node.js 18+** installed

```bash

npm run dev- [Next.js](https://nextjs.org/)- **npm** or **yarn** package manager

```

- [Appwrite](https://appwrite.io/)- **Appwrite instance** (self-hosted or cloud)

Open [http://localhost:3000](http://localhost:3000) in your browser.

- [Shadcn/ui](https://ui.shadcn.com/)- **Vercel account** (for deployment)

---

- [Vercel](https://vercel.com/)

## 📦 Deployment

---

### Deploy to Vercel (Recommended)

---

1. **Push to GitHub**:

```bash## 🚀 Quick Start

git add .

git commit -m "Initial commit"**Built with ❤️ for marketing teams**

git push origin main

```### 1. Clone the Repository



2. **Deploy on Vercel**:\`\`\`bash

   - Go to [Vercel](https://vercel.com/)git clone https://github.com/yourusername/knowledge-discovery.git

   - Import your GitHub repositorycd knowledge-discovery

   - Add environment variables from `.env.local`\`\`\`

   - Deploy!

### 2. Install Dependencies

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/uxdilip/knowledge-discovery)

\`\`\`bash

### Deploy Meilisearch (Production)npm install

# or

For production, you can:yarn install

\`\`\`

1. **Self-host on Railway**: $5-10/month

   - Deploy Meilisearch template### 3. Set Up Appwrite

   - Get endpoint URL

   - Update `NEXT_PUBLIC_MEILISEARCH_HOST`#### Option A: Appwrite Cloud (Easiest)

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)

2. **Use Meilisearch Cloud**: $30+/month2. Create a new project

   - Go to [Meilisearch Cloud](https://www.meilisearch.com/cloud)3. Note your Project ID and Endpoint

   - Create instance

   - Get API keys#### Option B: Self-Hosted Appwrite



---Deploy on Railway (Recommended):

1. Click: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/appwrite)

## 📖 Usage Guide2. Follow the setup instructions

3. Note your Appwrite endpoint URL

### For Users

Or use Docker locally:

1. **Register Account**: Create an account at `/register`\`\`\`bash

2. **Upload Documents**: docker run -d \\

   - Click "Upload Documents" button  --name appwrite \\

   - Drag & drop files or click to browse  -p 80:80 \\

   - Add title, description, and tags (optional)  -p 443:443 \\

   - Upload!  -v appwrite_data:/storage/certificates \\

3. **Search Documents**:  -v appwrite_data:/storage/config \\

   - Type in the search bar (typo-tolerant!)  -v appwrite_data:/storage/uploads \\

   - Apply filters (category, file type, date)  -v appwrite_data:/storage/cache \\

   - Get results in < 10ms ⚡  -v appwrite_data:/storage/functions \\

4. **Manage Documents**:  appwrite/appwrite:latest

   - Click to preview\`\`\`

   - Download documents

   - Delete your uploads### 4. Configure Appwrite



### For Developers1. Open Appwrite Console

2. **Create Database**:

#### Project Structure   - Name: \`knowledge-discovery-db\`

```   - Copy the Database ID

knowledge-discovery/

├── app/                    # Next.js app directory3. **Create Collections**:

│   ├── dashboard/         # Dashboard page

│   ├── login/            # Login page   **Documents Collection**:

│   ├── register/         # Register page   - Name: \`documents\`

│   ├── layout.tsx        # Root layout   - Attributes:

│   └── page.tsx          # Landing page     - \`title\` (String, 255, required)

├── components/            # React components     - \`description\` (String, 1000)

│   ├── ui/               # Shadcn UI components     - \`fileId\` (String, 255, required)

│   ├── DocumentCard.tsx  # Document card component     - \`fileName\` (String, 255, required)

│   ├── FileUpload.tsx    # File upload component     - \`fileSize\` (Integer, required)

│   └── SearchBar.tsx     # Search component     - \`fileType\` (String, 100, required)

├── contexts/             # React contexts     - \`fileUrl\` (String, 500, required)

│   └── AuthContext.tsx   # Authentication context     - \`content\` (String, 10000)

├── lib/                  # Utility libraries     - \`categoryId\` (String, 255)

│   ├── appwrite.ts       # Appwrite client setup     - \`tags\` (String[], array)

│   ├── meilisearch.ts    # Meilisearch client & functions     - \`uploadedBy\` (String, 255, required)

│   └── utils.ts          # Helper functions     - \`teamId\` (String, 255)

├── scripts/              # Utility scripts     - \`views\` (Integer, default: 0)

│   └── sync-meilisearch.js  # Sync Appwrite → Meilisearch     - \`downloads\` (Integer, default: 0)

├── types/                # TypeScript types     - \`createdAt\` (DateTime, required)

│   └── index.ts          # Type definitions     - \`updatedAt\` (DateTime, required)

└── public/               # Static assets   - Permissions: Read/Write access for authenticated users

```   - Indexes:

     - \`title\` (fulltext)

#### Key Functions     - \`createdAt\` (key, DESC)



**Meilisearch Integration** (`lib/meilisearch.ts`):   **Categories Collection** (optional):

- `initializeMeilisearch()` - Set up index and configuration   - Name: \`categories\`

- `addDocumentToSearch(doc)` - Add single document   - Attributes:

- `updateDocumentInSearch(id, updates)` - Update document     - \`name\` (String, 100, required)

- `deleteDocumentFromSearch(id)` - Remove document     - \`description\` (String, 500)

- `searchDocuments(query, filters)` - Search with filters     - \`color\` (String, 20)

- `syncAllDocuments(docs)` - Bulk sync from Appwrite     - \`icon\` (String, 50)

- `checkMeilisearchHealth()` - Check availability

   **Tags Collection** (optional):

**Auto-Sync Behavior**:   - Name: \`tags\`

- ✅ Document uploaded → Added to Meilisearch   - Attributes:

- ✅ Document viewed → View count updated     - \`name\` (String, 50, required)

- ✅ Document downloaded → Download count updated     - \`usageCount\` (Integer, default: 0)

- ✅ Document deleted → Removed from Meilisearch

- ✅ Search query → Meilisearch first, Appwrite fallback4. **Create Storage Bucket**:

   - Name: \`documents-bucket\`

---   - Max file size: 52428800 (50MB)

   - Allowed file extensions: \`pdf,doc,docx,txt,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif,svg\`

## 💰 Cost Estimate   - Permissions: Read/Write for authenticated users



### Development### 5. Environment Variables

- **Next.js + Vercel**: Free tier

- **Appwrite Cloud**: Free tier (1GB storage, 1GB bandwidth)Create \`.env.local\` file in the root directory:

- **Meilisearch (Docker)**: Free (self-hosted)

- **Total MVP**: **$0/month** 🎉\`\`\`env

# Appwrite Configuration

### Production (Small Team)NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

- **Vercel Pro**: $20/monthNEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

- **Appwrite Cloud**: $15-25/month

- **Meilisearch (Railway)**: $5-10/month# Appwrite Database Configuration

- **Total**: **$40-55/month**NEXT_PUBLIC_APPWRITE_DATABASE_ID=knowledge-discovery-db

NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID=documents

### Production (Large Team)NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=categories

- **Vercel Pro**: $20/monthNEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID=tags

- **Appwrite Pro**: $75/month

- **Meilisearch Cloud**: $30-100/month# Appwrite Storage Configuration

- **Total**: **$125-195/month**NEXT_PUBLIC_APPWRITE_BUCKET_ID=documents-bucket



---# Meilisearch Configuration (Optional - for enhanced search)

# Run locally: docker run -d -p 7700:7700 -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:latest

## 🗺️ RoadmapNEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700

NEXT_PUBLIC_MEILISEARCH_KEY=

### Phase 1: MVP ✅\`\`\`

- [x] File upload system

- [x] Basic search functionality### 6. (Optional) Set Up Meilisearch for Enhanced Search

- [x] User authentication

- [x] Document managementMeilisearch provides ultra-fast, typo-tolerant search with better relevance than basic database search.

- [x] Responsive UI

#### Run Meilisearch with Docker:

### Phase 2: Enhanced Search (In Progress) 🚧

- [x] Meilisearch integration\`\`\`bash

- [x] Typo-tolerant searchdocker run -d \\

- [x] Fast search performance (< 10ms)  --name meilisearch \\

- [x] Auto-fallback to Appwrite search  -p 7700:7700 \\

- [ ] Search highlighting in results  -v $(pwd)/meili_data:/meili_data \\

- [ ] Advanced filters UI  getmeili/meilisearch:latest

- [ ] Search analytics dashboard\`\`\`

- [ ] Saved searches

- [ ] Bulk document operations#### Sync Existing Documents:



### Phase 3: AI Features (Planned)After starting Meilisearch, sync your existing Appwrite documents:

- [ ] OpenAI integration

- [ ] Semantic search\`\`\`bash

- [ ] Auto-tagging with AInode scripts/sync-meilisearch.js

- [ ] Smart categorization\`\`\`

- [ ] Document summarization

- [ ] Content recommendationsThis will:

- Create the Meilisearch index

### Phase 4: Collaboration (Future)- Configure searchable/filterable attributes

- [ ] Team workspaces- Sync all documents from Appwrite

- [ ] Document sharing- Enable enhanced search features

- [ ] Comments and annotations

- [ ] Real-time collaboration**Note**: If Meilisearch is not available, the app will automatically fall back to Appwrite's built-in search.

- [ ] Activity feeds

### 7. Run Development Server

---

\`\`\`bash

## 🤝 Contributingnpm run dev

# or

Contributions are welcome! Please follow these steps:yarn dev

\`\`\`

1. Fork the repository

2. Create a feature branch: `git checkout -b feature/amazing-feature`Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Commit changes: `git commit -m 'Add amazing feature'`

4. Push to branch: `git push origin feature/amazing-feature`---

5. Open a Pull Request

## 📦 Deployment

---

### Deploy to Vercel (Recommended)

## 📄 License

1. **Push to GitHub**:

This project is licensed under the MIT License.\`\`\`bash

git add .

---git commit -m "Initial commit"

git push origin main

## 🙏 Acknowledgments\`\`\`



- [Next.js](https://nextjs.org/) - The React Framework2. **Deploy on Vercel**:

- [Appwrite](https://appwrite.io/) - Open-source Backend-as-a-Service   - Go to [Vercel](https://vercel.com/)

- [Meilisearch](https://www.meilisearch.com/) - Lightning-fast search engine   - Import your GitHub repository

- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components   - Add environment variables from \`.env.local\`

- [Vercel](https://vercel.com/) - Deployment platform   - Deploy!



---[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/knowledge-discovery)



**Built with ❤️ for marketing teams worldwide**### Deploy Appwrite on Railway



⭐ Star this repo if you find it helpful!1. Go to [Railway](https://railway.app/)

2. Click "New Project" → "Deploy from Template"

📧 Questions? Open an issue or reach out!3. Search for "Appwrite"

4. Configure and deploy
5. Copy the endpoint URL to your \`.env.local\`

---

## 📖 Usage Guide

### For Users

1. **Register Account**: Create an account at \`/register\`
2. **Upload Documents**: 
   - Click "Upload Documents" button
   - Drag & drop files or click to browse
   - Add title, description, and tags (optional)
   - Upload!
3. **Search Documents**:
   - Use the search bar on dashboard
   - Apply filters (category, file type, date)
   - Click on any document to preview
4. **Manage Documents**:
   - View document details
   - Download documents
   - Delete documents you uploaded

### For Developers

#### Project Structure
\`\`\`
knowledge-discovery/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── DocumentCard.tsx  # Document card component
│   ├── FileUpload.tsx    # File upload component
│   └── SearchBar.tsx     # Search component
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility libraries
│   ├── appwrite.ts       # Appwrite client setup
│   └── utils.ts          # Helper functions
├── types/                # TypeScript types
│   └── index.ts          # Type definitions
└── public/               # Static assets
\`\`\`

---

## 💰 Cost Estimate

### Development
- **Next.js + Vercel**: Free tier available
- **Appwrite Self-Hosted**: $10-20/month (Railway/DigitalOcean)
- **Total MVP**: **$10-20/month**

### Production (100s of documents)
- **Vercel Pro**: $20/month
- **Appwrite (Railway)**: $20/month
- **Meilisearch**: $30/month (optional)
- **OpenAI API**: $20-50/month (optional)
- **Total Full-Featured**: **$90-120/month**

---

## 🗺️ Roadmap

### Phase 1: MVP (Current) ✅
- [x] File upload system
- [x] Basic search functionality
- [x] User authentication
- [x] Document management
- [x] Responsive UI

### Phase 2: Enhanced Search (In Progress) 🚧
- [x] Meilisearch integration
- [x] Typo-tolerant search
- [x] Fast search performance (< 10ms)
- [x] Auto-fallback to Appwrite search
- [ ] Search highlighting
- [ ] Advanced filters UI
- [ ] Search analytics dashboard
- [ ] Saved searches

### Phase 3: AI Features (Future)
- [ ] OpenAI integration
- [ ] Semantic search
- [ ] Auto-tagging
- [ ] Smart categorization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Appwrite](https://appwrite.io/) - Open-source Backend-as-a-Service
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Vercel](https://vercel.com/) - Deployment platform

---

**Built with ❤️ for marketing teams worldwide**

⭐ Star this repo if you find it helpful!
