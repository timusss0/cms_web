import { db } from '@/db';
import { news, targetWebsites, newsDistributionLog } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Newspaper, Globe, Send, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const allNews = await db.select().from(news).orderBy(desc(news.createdAt)).limit(5);
  const totalNews = await db.$count(news);
  const totalWebsites = await db.$count(targetWebsites);
  const totalDistributions = await db.$count(newsDistributionLog);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20" asChild>
          <Link href="/news/upload">Create News</Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total News</CardTitle>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-500">
              <Newspaper className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 dark:text-white">{totalNews}</div>
            <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Target Websites</CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500">
              <Globe className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 dark:text-white">{totalWebsites}</div>
            <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" /> Network growing
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Distributions</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-500">
              <Send className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 dark:text-white">{totalDistributions}</div>
            <p className="text-xs text-slate-500 font-medium mt-2">
              Total pushes across all sites
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent News</h2>
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" asChild>
            <Link href="/news">View all <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        
        <div className="grid gap-4">
          {allNews.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="block group">
              <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-5 flex items-center gap-6">
                  {item.imageUrl ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-800">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 border border-indigo-100 dark:border-indigo-500/20">
                      <Newspaper className="w-8 h-8" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        {item.views} Views
                      </span>
                      <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          {allNews.length === 0 && (
            <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
              <CardContent className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Newspaper className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700" />
                <p className="text-lg font-medium">No news found yet.</p>
                <p className="text-sm mt-1 text-slate-400">Create your first article to see it here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
