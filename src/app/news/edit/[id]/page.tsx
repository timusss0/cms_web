'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, FileText, Type, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const res = await fetch(`/api/news/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title || '');
        setContent(data.content || '');
        setImageUrl(data.imageUrl || '');
      } else {
        console.error('Failed to fetch news detail');
      }
    } catch (error) {
      console.error('Error fetching news details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          imageUrl, 
        }),
      });

      if (res.ok) {
        router.push('/news');
      }
    } catch (error) {
      console.error('Error updating news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="rounded-full shadow-sm hover:shadow-md transition-all">
          <Link href="/news"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Edit News</h1>
          <p className="text-slate-500 mt-1">Update your existing content.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader className="pt-8">
            <CardTitle className="text-xl">Content Editor</CardTitle>
            <CardDescription>Modify the fields below to update the article.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Type className="w-4 h-4" /> Headline
              </Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                placeholder="Enter a captivating headline..." 
                className="text-lg font-medium border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus-visible:ring-indigo-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FileText className="w-4 h-4" /> Article Body
              </Label>
              <textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
                className="flex min-h-[300px] w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                placeholder="Write your news content here..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ImageIcon className="w-4 h-4" /> Featured Image URL (Optional)
              </Label>
              <Input 
                id="imageUrl" 
                type="url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/image.jpg"
                className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4">
              <Button type="button" variant="ghost" asChild>
                <Link href="/news">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 px-8 transition-all">
                {isSubmitting ? 'Saving...' : (
                  <>
                    Save Changes <Save className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
