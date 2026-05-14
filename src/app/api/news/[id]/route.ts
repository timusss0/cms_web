import { NextResponse } from 'next/server';
import { db } from '@/db';
import { news, newsDistributionLog, targetWebsites } from '@/db/schema';
import { eq } from 'drizzle-orm';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400, headers: corsHeaders });
    }

    const newsItem = await db.select().from(news).where(eq(news.id, newsId)).limit(1);

    if (newsItem.length === 0) {
      return NextResponse.json({ error: 'News not found' }, { status: 404, headers: corsHeaders });
    }

    // Get distribution logs for this news
    const logs = await db
      .select({
        id: newsDistributionLog.id,
        status: newsDistributionLog.status,
        errorMessage: newsDistributionLog.errorMessage,
        distributedAt: newsDistributionLog.distributedAt,
        websiteName: targetWebsites.name,
        websiteUrl: targetWebsites.url,
      })
      .from(newsDistributionLog)
      .leftJoin(targetWebsites, eq(newsDistributionLog.websiteId, targetWebsites.id))
      .where(eq(newsDistributionLog.newsId, newsId));

    return NextResponse.json({
      ...newsItem[0],
      distributionLogs: logs,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching news details:', error);
    return NextResponse.json({ error: 'Failed to fetch news details' }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    await db.update(news).set({ title, content, imageUrl }).where(eq(news.id, newsId));

    return NextResponse.json({ message: 'News updated successfully' });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // First delete distribution logs due to foreign key constraints
    await db.delete(newsDistributionLog).where(eq(newsDistributionLog.newsId, newsId));
    
    // Then delete the news item
    await db.delete(news).where(eq(news.id, newsId));

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
