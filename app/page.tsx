import Link from "next/link";
import { FileSearch, Zap, Shield, Users, Search, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileSearch className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Knowledge Discovery</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <FileSearch className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Find Marketing Documents
            <br />
            <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart internal search tool that indexes all your marketing documents and assets.
            Stop wasting time searching—start finding.
          </p>
          <div className="flex items-center justify-center gap-4 pt-6">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Find Information Fast
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Search className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>
                Search across all document formats with intelligent full-text search.
                Find what you need in seconds, not minutes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FolderTree className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Auto-Categorization</CardTitle>
              <CardDescription>
                Documents are automatically organized by topic, project, and team.
                No manual filing required.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Multiple Formats</CardTitle>
              <CardDescription>
                Index PDFs, Word docs, Excel files, images, and more.
                All your content in one searchable place.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your documents stay on your infrastructure.
                Full control with team-based permissions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Share documents with your team. Track views and downloads.
                Everyone stays aligned.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileSearch className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Quick Preview</CardTitle>
              <CardDescription>
                Preview documents instantly without downloading.
                Link directly to files when you find what you need.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center space-y-4 py-12">
            <CardTitle className="text-3xl md:text-4xl">
              Ready to Transform Your Document Search?
            </CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Join marketing teams who save hours every week with smart document discovery.
            </CardDescription>
            <div className="pt-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Knowledge Discovery. Built with Next.js and Appwrite.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
