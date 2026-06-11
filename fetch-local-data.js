import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env from current directory
dotenv.config();

async function fetchAllData() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    console.log(`\n🔗 Connecting to: ${mongoUri}\n`);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to local MongoDB\n');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`📚 Found ${collections.length} collections:\n`);
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const col = db.collection(collectionName);
      const count = await col.countDocuments();
      
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📦 Collection: ${collectionName} (${count} documents)`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      
      if (count === 0) {
        console.log('  (empty)');
      } else {
        const documents = await col.find({}).limit(5).toArray();
        documents.forEach((doc, index) => {
          console.log(`\n  Document ${index + 1}:`);
          console.log(`  ${JSON.stringify(doc, null, 2)
            .split('\n')
            .map((line, i) => i === 0 ? line : '    ' + line)
            .join('\n')}`);
        });
        
        if (count > 5) {
          console.log(`\n  ... and ${count - 5} more documents`);
        }
      }
    }
    
    console.log(`\n\n✨ Data fetch complete!\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fetchAllData();
