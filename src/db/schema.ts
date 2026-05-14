import { mysqlTable, int, varchar, text, timestamp, boolean } from 'drizzle-orm/mysql-core';

export const news = mysqlTable('news', {
  id: int('id').autoincrement().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  imageUrl: varchar('image_url', { length: 1024 }),
  views: int('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const targetWebsites = mysqlTable('target_websites', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 1024 }).notNull(),
  apiKey: varchar('api_key', { length: 255 }), // If needed for auth
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsDistributionLog = mysqlTable('news_distribution_log', {
  id: int('id').autoincrement().primaryKey(),
  newsId: int('news_id').references(() => news.id).notNull(),
  websiteId: int('website_id').references(() => targetWebsites.id).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'pending', 'success', 'failed'
  errorMessage: text('error_message'),
  distributedAt: timestamp('distributed_at').defaultNow(),
});

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
