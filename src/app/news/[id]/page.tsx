'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [newsDetail, setNewsDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const res = await fetch(`/api/news/${id}`);
      if (res.ok) {
        setNewsDetail(await res.json());
      }
    } catch (error) {
      console.error('Error fetching news details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!newsDetail) return <div className="p-8 text-center">News not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">News Details</h1>
          <p className="text-slate-500 mt-1">View complete article information and distribution status.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20" asChild>
          <Link href="/news">Back to News</Link>
        </Button>
      </div>
      
      <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-[#0d1326]/80 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
        <CardHeader className="pt-8 pb-4">
          <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">{newsDetail.title}</CardTitle>
          <CardDescription className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
              {newsDetail.createdAt ? new Date(newsDetail.createdAt).toLocaleString() : 'N/A'}
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              {newsDetail.views} Views
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {newsDetail.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <img src={newsDetail.imageUrl} alt={newsDetail.title} className="w-full max-h-[400px] object-cover" />
            </div>
          )}
          <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
            {newsDetail.content}
          </div>
        </CardContent>
      </Card>

      <div className="pt-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Distribution Log</h2>
        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-[#0d1326]/80 backdrop-blur-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
              <TableRow className="border-slate-100 dark:border-slate-800/50 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 py-4 px-6">Target Website</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 py-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 py-4">Date</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 py-4 px-6">Error Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsDetail.distributionLogs && newsDetail.distributionLogs.map((log: any) => (
                <TableRow key={log.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100 py-4 px-6">{log.websiteName}</TableCell>
                  <TableCell className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      log.status === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      log.status === 'failed' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm py-4">{log.distributedAt ? new Date(log.distributedAt).toLocaleString() : 'N/A'}</TableCell>
                  <TableCell className="text-rose-500 dark:text-rose-400 text-sm max-w-xs truncate py-4 px-6" title={log.errorMessage}>
                    {log.errorMessage || '-'}
                  </TableCell>
                </TableRow>
              ))}
              {(!newsDetail.distributionLogs || newsDetail.distributionLogs.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-12">
                    This news was not distributed to any external websites.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
