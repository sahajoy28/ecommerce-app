import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const AdminProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: Boolean,
  isActive: Boolean,
  createdBy: mongoose.Schema.Types.ObjectId
});

const AdminProduct = mongoose.model('AdminProduct', AdminProductSchema);

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const total = await AdminProduct.countDocuments();
    console.log(`\n📊 Total products in DB: ${total}`);
    
    const published = await AdminProduct.countDocuments({ published: true });
    console.log(`📦 Published products: ${published}`);
    
    const unpublished = await AdminProduct.countDocuments({ published: false });
    console.log(`🔒 Unpublished (Draft) products: ${unpublished}`);
    
    const active = await AdminProduct.countDocuments({ isActive: true });
    console.log(`✔️ Active products: ${active}`);
    
    const publishedAndActive = await AdminProduct.countDocuments({ isActive: true, published: true });
    console.log(`✨ Published & Active: ${publishedAndActive}`);
    
    if (total > 0) {
      console.log(`\n📋 Sample products (first 3):`);
      const samples = await AdminProduct.find().limit(3);
      samples.forEach(p => {
        console.log(`  - ${p.title} (published: ${p.published}, active: ${p.isActive})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

check();
