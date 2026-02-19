import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const AdminProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: { type: Boolean, default: false },
  isActive: Boolean,
  createdBy: mongoose.Schema.Types.ObjectId
});

const AdminProduct = mongoose.model('AdminProduct', AdminProductSchema);

async function publishAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Update all active products to be published
    const result = await AdminProduct.updateMany(
      { isActive: true },
      { $set: { published: true } }
    );
    
    console.log(`✨ Published ${result.modifiedCount} products`);
    
    // Check results
    const published = await AdminProduct.countDocuments({ published: true });
    console.log(`📦 Total published products: ${published}`);
    
    const samples = await AdminProduct.find({ published: true });
    console.log(`\n✅ Published products:`);
    samples.forEach(p => {
      console.log(`  - ${p.title}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

publishAll();
