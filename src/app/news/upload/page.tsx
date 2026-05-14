'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Send, Image as ImageIcon, FileText, Type } from 'lucide-react';

export default function UploadNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websites, setWebsites] = useState<any[]>([]);
  const [selectedWebsites, setSelectedWebsites] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    const res = await fetch('/api/websites');
    if (res.ok) {
      setWebsites(await res.json());
    }
  };

  const handleCheckboxChange = (websiteId: number, checked: boolean) => {
    if (checked) {
      setSelectedWebsites([...selectedWebsites, websiteId]);
    } else {
      setSelectedWebsites(selectedWebsites.filter(id => id !== websiteId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          imageUrl, 
          targetWebsiteIds: selectedWebsites 
        }),
      });

      if (res.ok) {
        router.push('/news');
      }
    } catch (error) {
      console.error('Error uploading news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Create News</h1>
        <p className="text-slate-500 mt-1">Draft your content and distribute it across your network.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl">Content Editor</CardTitle>
                <CardDescription>Write the main body of your news article.</CardDescription>
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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg">Distribution</CardTitle>
                <CardDescription>Select where to publish.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {websites.map((website) => (
                    <div key={website.id} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer">
                      <Checkbox 
                        id={`website-${website.id}`} 
                        checked={selectedWebsites.includes(website.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(website.id, checked as boolean)}
                        className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                      />
                      <div className="space-y-1 leading-none">
                        <label 
                          htmlFor={`website-${website.id}`} 
                          className="text-sm font-medium text-slate-900 dark:text-slate-100 cursor-pointer"
                        >
                          {website.name}
                        </label>
                        <p className="text-xs text-slate-500 truncate max-w-[180px]">{website.url}</p>
                      </div>
                    </div>
                  ))}
                  {websites.length === 0 && (
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 text-sm text-center">
                      No target websites configured. Add them in Settings.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Button type="submit" disabled={isSubmitting || websites.length === 0 && selectedWebsites.length === 0} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 h-12 text-base font-medium transition-all group">
                    {isSubmitting ? 'Publishing...' : (
                      <>
                        Publish <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
