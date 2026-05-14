import 'dotenv/config';
import { db } from './index';
import { sql } from 'drizzle-orm';

async function createUsersTable() {
  console.log('Manually creating users table...');
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`username\` varchar(255) NOT NULL,
        \`password_hash\` varchar(255) NOT NULL,
        \`created_at\` timestamp DEFAULT (now()),
        CONSTRAINT \`users_id\` PRIMARY KEY(\`id\`),
        CONSTRAINT \`users_username_unique\` UNIQUE(\`username\`)
      )
    `);
    console.log('Users table created successfully (or already existed).');
    process.exit(0);
  } catch (error) {
    console.error('Error creating users table:', error);
    process.exit(1);
  }
}

createUsersTable();
