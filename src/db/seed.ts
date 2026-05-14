import 'dotenv/config';
import { db } from './index';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Starting seed process...');
  
  try {
    const defaultUsername = 'admin';
    const defaultPassword = 'password123';
    
    // Check if user already exists
    const existingUsers = await db.select().from(users);
    
    if (existingUsers.length > 0) {
      console.log('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);

    await db.insert(users).values({
      username: defaultUsername,
      passwordHash: passwordHash,
    });

    console.log(`Successfully created default admin user. Username: ${defaultUsername}, Password: ${defaultPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
