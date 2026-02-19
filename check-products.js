import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

async function check() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const db = connection.connection.db;
    const products = await db.collection('adminproducts').find({}).toArray();
    
    console.log(`📦 Total products: ${products.length}\n`);
    
    products.forEach((p, i) => {
      console.log(`Product ${i + 1}: ${p.title}`);
      console.log(`  ID: ${p._id}`);
      console.log(`  Images: ${p.images ? p.images.length + ' images' : 'NO IMAGES'}`);
      if (p.images && p.images.length > 0) {
        console.log(`    - First image: ${p.images[0].substring(0, 100)}...`);
      }
      console.log(`  Published: ${p.published}`);
      console.log(`  Active: ${p.isActive}`);
      console.log(`  Keys: ${Object.keys(p).join(', ')}`);
      console.log();
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

check();
