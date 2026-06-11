import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    console.log(`\n🔗 Connecting to: ${mongoUri}\n`);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log(`✅ Admin user already exists: ${existingAdmin.email}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      phone: '+1234567890',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: admin@ecommerce.com`);
    console.log(`   Password: admin123`);
    console.log(`   Role: admin\n`);
    console.log('⚠️  IMPORTANT: Change this password immediately in production!\n');

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
