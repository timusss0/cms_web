import { NextResponse } from 'next/server';
import { db } from '@/db';
import { news } from '@/db/schema';
import { distributeNews } from '@/lib/distribution';
import { desc } from 'drizzle-orm';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const allNews = await db.select().from(news).orderBy(desc(news.createdAt));
    return NextResponse.json(allNews, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, targetWebsiteIds } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Insert news
    const newNews = await db.insert(news).values({
      title,
      content,
      imageUrl,
    }).$returningId();
    
    const newsId = newNews[0].id;
    
    const newsData = { id: newsId, title, content, imageUrl };

    // Trigger distribution asynchronously (don't await so API returns fast)
    if (targetWebsiteIds && targetWebsiteIds.length > 0) {
      distributeNews(newsId, targetWebsiteIds, newsData).catch(console.error);
    }

    return NextResponse.json({ message: 'News created', id: newsId }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
