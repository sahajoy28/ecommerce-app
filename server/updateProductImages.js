import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminProduct from './models/AdminProduct.js';
dotenv.config();

const IMAGE_MAP = {
  'Carrara White Floor Tile': ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'],
  'Midnight Black Porcelain Tile': ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'],
  'Rustic Terracotta Floor Tile': ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],
  'Ocean Blue Mosaic Tile': ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'],
  'Sandstone Beige Wall Tile': ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],
  'Grey Concrete Effect Tile': ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'],
  'Herringbone Chevron Tile': ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'],
  'Wood Plank Porcelain Tile': ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'],
  'Italian Statuario Marble Slab': ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'],
  'Calacatta Gold Marble': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'],
  'Emperador Dark Marble Tile': ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'],
  'Bianco Dolomite Marble': ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'],
  'Verde Guatemala Green Marble': ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'],
  'Crema Marfil Marble Tile': ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'],
  'Nero Marquina Black Marble': ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'],
  'Kashmir White Granite Slab': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'],
  'Tan Brown Granite': ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'],
  'Black Galaxy Granite': ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'],
  'Absolute Black Granite Tile': ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'],
  'Colonial Gold Granite Slab': ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'],
  'Steel Grey Granite': ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'],
  'River White Granite': ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'],
  'Classic White Subway Tile': ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'],
  'Penny Round Ceramic Mosaic': ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'],
  'Moroccan Pattern Ceramic Tile': ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],
  'Cream Gloss Ceramic Wall Tile': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'],
  'Aqua Blue Ceramic Tile': ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'],
  'Hexagonal Ceramic Floor Tile': ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'],
  'Calacatta Look Porcelain Slab': ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'],
  'Travertine Look Porcelain Tile': ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'],
  'Outdoor Anti-Slip Porcelain': ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'],
  'Matt Grey Porcelain Floor Tile': ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'],
  'Onyx Effect Porcelain Tile': ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'],
  'Terrazzo Look Porcelain': ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'],
  'Indian Sandstone Paving': ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],
  'Slate Grey Cladding Stone': ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'],
  'Limestone Floor Tile': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'],
  'Quartzite Silver Tile': ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'],
  'Tumbled Travertine Tile': ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'],
  'Basalt Black Paving Stone': ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'],
  'Cobblestone Natural Paver': ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'],
  'Chrome Rainfall Showerhead': ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop'],
  'Wall-Mounted Basin Mixer Tap': ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop'],
  'Freestanding Bathtub Faucet': ['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=600&fit=crop'],
  'Concealed Cistern Flush System': ['https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&h=600&fit=crop'],
  'Stainless Steel Towel Rail': ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop'],
  'Glass Shower Enclosure 900x900': ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop'],
  'Ceramic Pedestal Wash Basin': ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop'],
  'Gold Finish Bathroom Accessory Set': ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop'],
  'Premium Marble Effect Bathroom Panel': ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop'],
};

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    let updated = 0;
    for (const [title, imgs] of Object.entries(IMAGE_MAP)) {
      const result = await AdminProduct.updateMany(
        { title, images: { $size: 0 } },
        { $set: { images: imgs } }
      );
      if (result.modifiedCount > 0) {
        console.log(`  ✅ ${title}: ${result.modifiedCount} updated`);
        updated += result.modifiedCount;
      }
    }
    console.log(`\n🎉 Updated ${updated} products with images`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

updateImages();
