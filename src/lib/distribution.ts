import { db } from '@/db';
import { newsDistributionLog, targetWebsites } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function distributeNews(newsId: number, targetWebsiteIds: number[], newsData: any) {
  if (!targetWebsiteIds || targetWebsiteIds.length === 0) return;

  const websites = await db.select().from(targetWebsites).where(inArray(targetWebsites.id, targetWebsiteIds));

  for (const website of websites) {
    try {
      // Create initial log entry
      const log = await db.insert(newsDistributionLog).values({
        newsId,
        websiteId: website.id,
        status: 'pending',
      }).$returningId();
      
      const logId = log[0].id;

      // Make API call to target website
      // We assume the target URL accepts POST requests with the news data
      const response = await fetch(website.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(website.apiKey && { 'Authorization': `Bearer ${website.apiKey}` }),
        },
        body: JSON.stringify(newsData),
      });

      if (response.ok) {
        await db.update(newsDistributionLog)
          .set({ status: 'success' })
          .where(eq(newsDistributionLog.id, logId));
      } else {
        const errorText = await response.text();
        await db.update(newsDistributionLog)
          .set({ status: 'failed', errorMessage: `Status ${response.status}: ${errorText}`.substring(0, 500) })
          .where(eq(newsDistributionLog.id, logId));
      }

    } catch (error: any) {
      console.error(`Error distributing to website ${website.name}:`, error);
      await db.insert(newsDistributionLog).values({
        newsId,
        websiteId: website.id,
        status: 'failed',
        errorMessage: String(error.message).substring(0, 500),
      });
    }
  }
}
