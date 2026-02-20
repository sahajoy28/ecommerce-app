import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminProduct from './models/AdminProduct.js';
import User from './models/User.js';

dotenv.config();

const CATEGORIES = ['Tiles', 'Marble', 'Granite', 'Ceramic', 'Porcelain', 'Natural Stone', 'Bathroom Fittings'];
const MATERIALS = ['Tiles', 'Marble', 'Granite', 'Ceramic', 'Porcelain', 'Natural Stone', 'Bathroom Fittings'];
const FINISHES = ['Glossy', 'Matte', 'Polish', 'Textured', 'Honed'];
const COLORS = ['White', 'Ivory', 'Beige', 'Grey', 'Dark Grey', 'Black', 'Brown', 'Cream', 'Blue', 'Green', 'Terracotta', 'Sand', 'Pearl', 'Silver', 'Gold'];
const SIZES_POOL = ['1x1', '2x1', '2x2', '2x4', '4x2', '4x4', '12x24', '24x24', '24x48', '60x60', '60x120', '80x80', '80x120', '120x120'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickN = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const PRODUCTS = [
  // Tiles
  { title: 'Carrara White Floor Tile', desc: 'Premium Carrara-inspired white floor tile with subtle grey veining. Perfect for living rooms and hallways.', cat: 'Tiles', mat: 'Tiles', imgs: ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'] },
  { title: 'Midnight Black Porcelain Tile', desc: 'Sleek black porcelain tile with a high-gloss finish. Ideal for contemporary kitchens and bathrooms.', cat: 'Tiles', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'] },
  { title: 'Rustic Terracotta Floor Tile', desc: 'Traditional terracotta-style tile with warm earthy tones. Great for patios and outdoor areas.', cat: 'Tiles', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'] },
  { title: 'Ocean Blue Mosaic Tile', desc: 'Stunning ocean blue mosaic tile perfect for pool surrounds and bathroom accent walls.', cat: 'Tiles', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'] },
  { title: 'Sandstone Beige Wall Tile', desc: 'Natural sandstone look wall tile in warm beige. Ideal for feature walls and bathrooms.', cat: 'Tiles', mat: 'Tiles', imgs: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'] },
  { title: 'Grey Concrete Effect Tile', desc: 'Industrial concrete-look tile in grey. Perfect for modern lofts and commercial spaces.', cat: 'Tiles', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'] },
  { title: 'Herringbone Chevron Tile', desc: 'Elegant herringbone pattern tile in classic white. Creates stunning visual impact on floors and walls.', cat: 'Tiles', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'] },
  { title: 'Wood Plank Porcelain Tile', desc: 'Realistic wood grain porcelain tile. Get the look of hardwood with the durability of porcelain.', cat: 'Tiles', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'] },

  // Marble
  { title: 'Italian Statuario Marble Slab', desc: 'Premium imported Italian Statuario marble with bold grey veining on white background. Luxury countertops and floors.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'] },
  { title: 'Calacatta Gold Marble', desc: 'Exquisite Calacatta marble with warm gold veining. A statement piece for kitchen islands and bathrooms.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'] },
  { title: 'Emperador Dark Marble Tile', desc: 'Rich dark brown Emperador marble tile with lighter brown veining. Perfect for elegant flooring.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'] },
  { title: 'Bianco Dolomite Marble', desc: 'Classic Bianco Dolomite marble with soft grey tones. Timeless choice for any interior space.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'] },
  { title: 'Verde Guatemala Green Marble', desc: 'Deep green Guatemala marble with white veining. A unique choice for accent walls and tabletops.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'] },
  { title: 'Crema Marfil Marble Tile', desc: 'Warm cream-colored Crema Marfil marble with subtle veining. A popular choice for flooring.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'] },
  { title: 'Nero Marquina Black Marble', desc: 'Dramatic black marble with striking white veining. Makes a bold statement in any space.', cat: 'Marble', mat: 'Marble', imgs: ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'] },

  // Granite
  { title: 'Kashmir White Granite Slab', desc: 'Beautiful white granite with grey and burgundy flecks. Extremely durable for kitchen countertops.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'] },
  { title: 'Tan Brown Granite', desc: 'Dark brown granite with black and tan mineral deposits. Excellent for high-traffic countertops.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'] },
  { title: 'Black Galaxy Granite', desc: 'Striking black granite with gold and white specks resembling a starry night sky. Premium countertop material.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'] },
  { title: 'Absolute Black Granite Tile', desc: 'Pure jet-black granite tile with a polished finish. Timeless elegance for floors and walls.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'] },
  { title: 'Colonial Gold Granite Slab', desc: 'Warm gold and brown granite with intricate patterns. A popular choice for kitchen countertops.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'] },
  { title: 'Steel Grey Granite', desc: 'Medium grey granite with a uniform pattern. A versatile choice for indoor and outdoor use.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'] },
  { title: 'River White Granite', desc: 'White granite with flowing grey and burgundy veins. Creates a natural, elegant appearance.', cat: 'Granite', mat: 'Granite', imgs: ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'] },

  // Ceramic
  { title: 'Classic White Subway Tile', desc: 'Timeless white ceramic subway tile. Perfect for kitchen backsplashes and bathroom walls.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'] },
  { title: 'Penny Round Ceramic Mosaic', desc: 'Charming penny round ceramic mosaic in assorted colors. Ideal for shower floors and accent details.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'] },
  { title: 'Moroccan Pattern Ceramic Tile', desc: 'Hand-painted Moroccan-inspired ceramic tile with intricate geometric patterns. Perfect for feature walls.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'] },
  { title: 'Cream Gloss Ceramic Wall Tile', desc: 'Smooth cream ceramic wall tile with a glossy finish. Classic choice for kitchens and bathrooms.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'] },
  { title: 'Aqua Blue Ceramic Tile', desc: 'Vibrant aqua blue ceramic tile perfect for pool areas and coastal-themed bathrooms.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop'] },
  { title: 'Hexagonal Ceramic Floor Tile', desc: 'Trendy hexagonal ceramic tile in matte white. Creates a unique geometric floor pattern.', cat: 'Ceramic', mat: 'Ceramic', imgs: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'] },

  // Porcelain
  { title: 'Calacatta Look Porcelain Slab', desc: 'Large format porcelain slab mimicking Calacatta marble. Low maintenance luxury for countertops.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'] },
  { title: 'Travertine Look Porcelain Tile', desc: 'Porcelain tile with authentic travertine appearance. All the beauty without the maintenance.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'] },
  { title: 'Outdoor Anti-Slip Porcelain', desc: 'Heavy duty anti-slip porcelain paver for outdoor patios, walkways and pool decks.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'] },
  { title: 'Matt Grey Porcelain Floor Tile', desc: 'Contemporary matte grey porcelain floor tile. A modern minimalist choice for any room.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'] },
  { title: 'Onyx Effect Porcelain Tile', desc: 'Luxurious onyx-effect porcelain tile with translucent quality. Perfect for backlit feature walls.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'] },
  { title: 'Terrazzo Look Porcelain', desc: 'Colorful terrazzo-inspired porcelain tile. A trendy, playful option for floors and walls.', cat: 'Porcelain', mat: 'Porcelain', imgs: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'] },

  // Natural Stone
  { title: 'Indian Sandstone Paving', desc: 'Natural Indian sandstone paving slab in warm buff tones. Perfect for garden patios.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'] },
  { title: 'Slate Grey Cladding Stone', desc: 'Natural slate cladding in charcoal grey. Creates dramatic exterior and interior feature walls.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&h=600&fit=crop'] },
  { title: 'Limestone Floor Tile', desc: 'Honed natural limestone floor tile in pale cream. A refined choice for traditional and modern interiors.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop'] },
  { title: 'Quartzite Silver Tile', desc: 'Shimmering silver quartzite tile with natural sparkle. A unique option for bathrooms and entryways.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=600&fit=crop'] },
  { title: 'Tumbled Travertine Tile', desc: 'Tumbled travertine tile with aged, rustic edges. Adds Old World charm to any space.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=600&fit=crop'] },
  { title: 'Basalt Black Paving Stone', desc: 'Dense black basalt paving stone for contemporary landscapes. Extremely hard-wearing and low maintenance.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&h=600&fit=crop'] },
  { title: 'Cobblestone Natural Paver', desc: 'Classic natural cobblestone paver for driveways and walkways. Timeless European aesthetic.', cat: 'Natural Stone', mat: 'Natural Stone', imgs: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=600&fit=crop'] },

  // Bathroom Fittings
  { title: 'Chrome Rainfall Showerhead', desc: 'Luxury 12-inch chrome rainfall showerhead with adjustable arm. Creates a spa-like shower experience.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop'] },
  { title: 'Wall-Mounted Basin Mixer Tap', desc: 'Modern wall-mounted basin mixer tap in brushed nickel. Sleek design for contemporary bathrooms.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop'] },
  { title: 'Freestanding Bathtub Faucet', desc: 'Floor-standing bathtub faucet in matte black. A statement piece for freestanding tub installations.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=600&fit=crop'] },
  { title: 'Concealed Cistern Flush System', desc: 'Dual-flush concealed cistern system for wall-hung toilets. Water-efficient and space-saving.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&h=600&fit=crop'] },
  { title: 'Stainless Steel Towel Rail', desc: 'Heated stainless steel towel rail with 6 bars. Keeps towels warm and dry all year.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop'] },
  { title: 'Glass Shower Enclosure 900x900', desc: '8mm tempered glass corner shower enclosure with chrome frame. Easy-clean glass coating included.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop'] },
  { title: 'Ceramic Pedestal Wash Basin', desc: 'Classic white ceramic pedestal wash basin. Timeless design with generous bowl size.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop'] },
  { title: 'Gold Finish Bathroom Accessory Set', desc: '5-piece bathroom accessory set in brushed gold. Includes soap dish, tumbler, towel ring, robe hook, and toilet paper holder.', cat: 'Bathroom Fittings', mat: 'Bathroom Fittings', imgs: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop'] },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('❌ No admin user found. Please create an admin account first.');
      process.exit(1);
    }
    console.log(`👤 Using admin: ${admin.name || admin.email}`);

    const products = PRODUCTS.map((p, i) => {
      const basePrice = rand(150, 8000);
      const mrp = basePrice + rand(50, 500);
      const finish = pick(FINISHES);
      const color = pick(COLORS);
      const sizes = pickN(SIZES_POOL, rand(2, 5));
      const quantity = rand(10, 500);

      return {
        title: p.title,
        description: p.desc,
        price: basePrice,
        mrp,
        retailPrice: basePrice + rand(0, 200),
        discount: Math.random() > 0.5 ? { discountType: 'percentage', discountValue: rand(5, 20) } : {},
        showPriceInListing: Math.random() > 0.2,
        category: p.cat,
        quantity,
        images: p.imgs || [],
        material: p.mat,
        finish,
        sizes,
        color,
        specifications: {
          thickness: `${rand(6, 20)}mm`,
          weight: `${rand(12, 30)} kg/box`,
          waterAbsorption: `<${(Math.random() * 3).toFixed(1)}%`,
          mohs: `${rand(3, 7)}-${rand(7, 9)}`
        },
        createdBy: admin._id,
        isActive: true,
        published: true,
        rating: 0,
        reviewCount: 0,
        reviews: []
      };
    });

    const result = await AdminProduct.insertMany(products);
    console.log(`✅ Seeded ${result.length} products successfully!`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
