'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileEdit, Trash2, Eye, Plus, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function NewsListPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await fetch('/api/news');
    if (res.ok) {
      setNewsList(await res.json());
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news?')) return;
    
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Failed to delete news', error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">All News</h1>
          <p className="text-slate-500 mt-1">Manage and track your published content.</p>
        </div>
        <Button className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20" asChild>
          <Link href="/news/upload" className="flex items-center"><Plus className="w-5 h-5 mr-2" /> Upload News</Link>
        </Button>
      </div>
      
      <Card className="border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-950 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 px-6">News Title</TableHead>
                <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 text-center">Published Date</TableHead>
                <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 text-center">Stats</TableHead>
                <TableHead className="font-bold text-slate-800 dark:text-slate-200 py-4 text-right px-6">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsList.map((item) => (
                <TableRow key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-colors group">
                  <TableCell className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">{item.title}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">ID: #{item.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-center text-slate-600 dark:text-slate-400 font-medium">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '---'}
                  </TableCell>
                  <TableCell className="py-5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                        {item.views || 0}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 text-xs font-medium" asChild>
                        <Link href={`/news/${item.id}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10 text-xs font-medium" asChild>
                        <Link href={`/news/edit/${item.id}`}>Edit</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 text-xs font-medium" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {newsList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-16 bg-slate-50/30 dark:bg-transparent">
                    <div className="flex flex-col items-center gap-2">
                      <Newspaper className="w-10 h-10 text-slate-300" />
                      <p className="font-medium text-slate-400">No news found. Click 'Upload News' to create your first article.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
