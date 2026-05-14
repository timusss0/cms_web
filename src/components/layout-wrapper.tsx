'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Newspaper, UploadCloud, Globe, Radio } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogoutButton } from '@/components/logout-button';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white/60 dark:bg-[#0d1326]/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/50 flex flex-col shadow-sm transition-all duration-300">
        <div className="h-20 flex items-center px-8 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-transparent to-transparent">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:text-white dark:to-violet-400">
              News CMS
            </h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <Link href="/" className={`group flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${pathname === '/' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
            <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Dashboard
          </Link>
          <Link href="/news" className={`group flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${pathname.startsWith('/news') && pathname !== '/news/upload' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
            <Newspaper className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            All News
          </Link>
          <Link href="/news/upload" className={`group flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${pathname === '/news/upload' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
            <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Upload News
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Settings</p>
          </div>
          <Link href="/websites" className={`group flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${pathname === '/websites' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
            <Globe className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Target Websites
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Admin</p>
                <p className="text-xs text-slate-500 italic">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/20 to-transparent pointer-events-none"></div>
        <div className="relative p-8 md:p-12 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
