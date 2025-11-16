# 🔍 Knowledge Discovery# 🔍 Knowledge DiscoveryThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Smart internal search tool for marketing teams to manage and discover documents instantly.



## ✨ Features**Smart Internal Search Tool for Marketing Teams**## Getting Started



- 📁 **File Upload** - Drag & drop support for multiple formats

- 🔎 **Smart Search** - Full-text search with advanced filters

- 📊 **Multi-Format** - PDF, DOCX, TXT, XLSX, ImagesA powerful, AI-ready document management and search platform that helps marketing teams find their documents and assets instantly. Built with Next.js 14, TypeScript, Appwrite, and Tailwind CSS.First, run the development server:

- 👁️ **Quick Preview** - Instant document viewing

- 📈 **Analytics** - Track views and downloads

- 🔐 **Secure Auth** - User authentication with Appwrite

- 🎨 **Modern UI** - Clean, responsive design![Knowledge Discovery Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=Knowledge+Discovery)```bash



## 🛠️ Tech Stacknpm run dev



- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui## ✨ Features# or

- **Backend**: Appwrite (Auth, Database, Storage)

- **Deployment**: Vercelyarn dev



## 🚀 Quick Start### 🎯 Core Features (MVP)# or



### 1. Install Dependencies- **📁 Smart File Upload**: Drag-and-drop interface supporting multiple formatspnpm dev



\`\`\`bash- **🔎 Full-Text Search**: Fast and relevant search across all documents# or

npm install

\`\`\`- **📊 Multi-Format Support**: PDF, DOCX, TXT, XLSX, Images, and morebun dev



### 2. Setup Appwrite- **🏷️ Auto-Categorization**: Keyword-based automatic document organization```



1. Create account at [cloud.appwrite.io](https://cloud.appwrite.io/)- **👁️ Quick Preview**: Instant document preview and download

2. Create new project

3. Create database with collections:- **📈 Analytics**: Track views and downloads for each documentOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

   - **documents** (with attributes: title, description, fileId, etc.)

   - **categories** (optional)- **🔐 Secure Authentication**: Email/password auth with Appwrite

   - **tags** (optional)

4. Create storage bucket for file uploads- **👥 Team Management**: Share documents across your teamYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



### 3. Environment Variables- **🎨 Modern UI**: Clean, responsive interface built with Shadcn/ui



Copy \`.env.local.example\` to \`.env.local\`:This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



\`\`\`env### 🚀 Coming Soon (Full-Featured)

NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id- **🤖 AI-Powered Search**: Semantic search with OpenAI embeddings## Learn More

NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID=documents- **🔍 Advanced Filters**: Filter by date, type, category, and more

NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id

\`\`\`- **📑 OCR Support**: Extract text from images and scanned PDFsTo learn more about Next.js, take a look at the following resources:



### 4. Run Development Server- **🏢 Team Workspaces**: Separate spaces for different teams



\`\`\`bash- **📱 Mobile App**: iOS and Android applications- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

npm run dev

\`\`\`- **📊 Analytics Dashboard**: Comprehensive usage insights- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



Open [http://localhost:3000](http://localhost:3000)- **🔔 Notifications**: Real-time updates and alerts



## 📦 DeploymentYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



### Deploy to Vercel---



1. Push to GitHub## Deploy on Vercel

2. Import repository on [vercel.com](https://vercel.com)

3. Add environment variables## 🛠️ Tech Stack

4. Deploy!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Frontend

## 🔧 Configuration

- **[Next.js 14](https://nextjs.org/)** - React framework with App RouterCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Bucket Permissions (Appwrite Console)

- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

Set these permissions on your storage bucket:- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS

- **Read**: Role `Any`- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components

- **Create**: Role `Users`- **[Lucide Icons](https://lucide.dev/)** - Icon library

- **Update**: Role `Users`- **[React Query](https://tanstack.com/query)** - Data fetching & caching

- **Delete**: Role `Users`

### Backend & Services

### File Settings- **[Appwrite](https://appwrite.io/)** - Open-source Backend-as-a-Service

  - Authentication

- Max file size: 50MB  - Database (Documents storage)

- Allowed extensions: pdf, doc, docx, txt, xls, xlsx, jpg, png, gif, svg  - File Storage

  - Teams & Permissions

## 📖 Usage- **[Vercel](https://vercel.com/)** - Deployment platform



1. **Register** - Create an account at `/register`### File Processing

2. **Upload** - Click "Upload Documents" and drag files- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF text extraction

3. **Search** - Use search bar with filters- **[Mammoth.js](https://github.com/mwilliamson/mammoth.js/)** - Word document processing

4. **View** - Click documents to preview- **[XLSX](https://github.com/SheetJS/sheetjs)** - Excel file processing

5. **Download** - Hover and click download icon- **[React Dropzone](https://react-dropzone.js.org/)** - Drag & drop uploads



## 💰 Cost### Future Integrations

- **[Meilisearch](https://www.meilisearch.com/)** - Advanced search engine

- **Development**: Free (Appwrite Cloud free tier)- **[OpenAI](https://openai.com/)** - Semantic search & categorization

- **Production**: ~$5-10/month (Vercel + Appwrite)- **[Langchain](https://www.langchain.com/)** - Document processing pipeline



## 📄 License---



MIT License - see LICENSE file## 📋 Prerequisites



## 🙏 AcknowledgmentsBefore you begin, ensure you have:

- **Node.js 18+** installed

- [Next.js](https://nextjs.org/)- **npm** or **yarn** package manager

- [Appwrite](https://appwrite.io/)- **Appwrite instance** (self-hosted or cloud)

- [Shadcn/ui](https://ui.shadcn.com/)- **Vercel account** (for deployment)

- [Vercel](https://vercel.com/)

---

---

## 🚀 Quick Start

**Built with ❤️ for marketing teams**

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/knowledge-discovery.git
cd knowledge-discovery
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set Up Appwrite

#### Option A: Appwrite Cloud (Easiest)
1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new project
3. Note your Project ID and Endpoint

#### Option B: Self-Hosted Appwrite

Deploy on Railway (Recommended):
1. Click: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/appwrite)
2. Follow the setup instructions
3. Note your Appwrite endpoint URL

Or use Docker locally:
\`\`\`bash
docker run -d \\
  --name appwrite \\
  -p 80:80 \\
  -p 443:443 \\
  -v appwrite_data:/storage/certificates \\
  -v appwrite_data:/storage/config \\
  -v appwrite_data:/storage/uploads \\
  -v appwrite_data:/storage/cache \\
  -v appwrite_data:/storage/functions \\
  appwrite/appwrite:latest
\`\`\`

### 4. Configure Appwrite

1. Open Appwrite Console
2. **Create Database**:
   - Name: \`knowledge-discovery-db\`
   - Copy the Database ID

3. **Create Collections**:

   **Documents Collection**:
   - Name: \`documents\`
   - Attributes:
     - \`title\` (String, 255, required)
     - \`description\` (String, 1000)
     - \`fileId\` (String, 255, required)
     - \`fileName\` (String, 255, required)
     - \`fileSize\` (Integer, required)
     - \`fileType\` (String, 100, required)
     - \`fileUrl\` (String, 500, required)
     - \`content\` (String, 10000)
     - \`categoryId\` (String, 255)
     - \`tags\` (String[], array)
     - \`uploadedBy\` (String, 255, required)
     - \`teamId\` (String, 255)
     - \`views\` (Integer, default: 0)
     - \`downloads\` (Integer, default: 0)
     - \`createdAt\` (DateTime, required)
     - \`updatedAt\` (DateTime, required)
   - Permissions: Read/Write access for authenticated users
   - Indexes:
     - \`title\` (fulltext)
     - \`createdAt\` (key, DESC)

   **Categories Collection** (optional):
   - Name: \`categories\`
   - Attributes:
     - \`name\` (String, 100, required)
     - \`description\` (String, 500)
     - \`color\` (String, 20)
     - \`icon\` (String, 50)

   **Tags Collection** (optional):
   - Name: \`tags\`
   - Attributes:
     - \`name\` (String, 50, required)
     - \`usageCount\` (Integer, default: 0)

4. **Create Storage Bucket**:
   - Name: \`documents-bucket\`
   - Max file size: 52428800 (50MB)
   - Allowed file extensions: \`pdf,doc,docx,txt,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif,svg\`
   - Permissions: Read/Write for authenticated users

### 5. Environment Variables

Create \`.env.local\` file in the root directory:

\`\`\`env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

# Appwrite Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=knowledge-discovery-db
NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID=documents
NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=categories
NEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID=tags

# Appwrite Storage Configuration
NEXT_PUBLIC_APPWRITE_BUCKET_ID=documents-bucket
\`\`\`

### 6. Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Add environment variables from \`.env.local\`
   - Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/knowledge-discovery)

### Deploy Appwrite on Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from Template"
3. Search for "Appwrite"
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

### Phase 2: Enhanced Search (Next)
- [ ] Meilisearch integration
- [ ] Advanced filters
- [ ] Search analytics
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
