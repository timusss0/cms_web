import { NextResponse } from 'next/server';
import { db } from '@/db';
import { targetWebsites } from '@/db/schema';

export async function GET() {
  try {
    const websites = await db.select().from(targetWebsites);
    return NextResponse.json(websites);
  } catch (error) {
    console.error('Error fetching websites:', error);
    return NextResponse.json({ error: 'Failed to fetch websites' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, url, apiKey } = body;

    if (!name || !url) {
      return NextResponse.json({ error: 'Name and URL are required' }, { status: 400 });
    }

    const newWebsite = await db.insert(targetWebsites).values({
      name,
      url,
      apiKey,
    }).$returningId();

    return NextResponse.json({ id: newWebsite[0].id, name, url }, { status: 201 });
  } catch (error) {
    console.error('Error adding website:', error);
    return NextResponse.json({ error: 'Failed to add website' }, { status: 500 });
  }
}
