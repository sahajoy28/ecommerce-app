import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminProduct from './models/AdminProduct.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Banner from './models/Banner.js';
import SiteSettings from './models/SiteSettings.js';

dotenv.config();

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ===================== CATEGORIES =====================
const CATEGORIES = [
  { name: 'Electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Home & Living', icon: '🏠', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Sports & Outdoors', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: 'Beauty & Health', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Books & Stationery', icon: '📚', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { name: 'Kitchen & Dining', icon: '🍳', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Toys & Games', icon: '🎮', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=500&fit=crop', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
];

// ===================== PRODUCTS WITH 4-5 IMAGES EACH =====================
const PRODUCTS = [
  // ========== ELECTRONICS ==========
  {
    title: 'Pro Wireless Noise-Cancelling Headphones',
    desc: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support. Features comfortable memory foam ear cups and multipoint Bluetooth 5.3 connectivity.',
    cat: 'Electronics', material: 'Aluminum & Protein Leather', finish: 'Matte',
    color: 'Space Grey', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop',
    ],
    specs: { 'Driver Size': '40mm', 'Frequency Response': '4Hz–40kHz', 'Battery Life': '30 hours', 'Bluetooth': '5.3', 'Weight': '250g', 'Noise Cancellation': 'Active (ANC)', 'Codec Support': 'LDAC, AAC, SBC' }
  },
  {
    title: 'Ultra-Slim 4K OLED Smart TV 55"',
    desc: 'Stunning 55-inch 4K OLED display with Dolby Vision, HDR10+, and 120Hz refresh rate. Built-in smart platform with voice control and all major streaming apps.',
    cat: 'Electronics', material: 'Aluminum', finish: 'Brushed Metal',
    color: 'Black', sizes: ['43"', '50"', '55"', '65"', '75"'],
    imgs: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&h=600&fit=crop',
    ],
    specs: { 'Display': 'OLED 4K (3840x2160)', 'Refresh Rate': '120Hz', 'HDR': 'Dolby Vision, HDR10+', 'Speakers': '40W Dolby Atmos', 'HDMI': '4x HDMI 2.1', 'Smart OS': 'webOS', 'Energy Rating': 'A+' }
  },
  {
    title: 'Mechanical Gaming Keyboard RGB',
    desc: 'Full-size mechanical keyboard with hot-swappable switches, per-key RGB lighting, and aircraft-grade aluminum frame. Includes wrist rest and USB-C connectivity.',
    cat: 'Electronics', material: 'Aluminum Alloy', finish: 'Anodized',
    color: 'Gunmetal', sizes: ['Full Size', '75%', 'TKL'],
    imgs: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop',
    ],
    specs: { 'Switch Type': 'Cherry MX Brown (Hot-Swap)', 'Key Layout': '104 Keys', 'Backlighting': 'Per-key RGB', 'Connection': 'USB-C, Wireless 2.4GHz', 'Polling Rate': '1000Hz', 'Anti-Ghosting': 'N-Key Rollover', 'Frame': 'CNC Aluminum' }
  },
  {
    title: 'Portable Bluetooth Speaker Waterproof',
    desc: 'Rugged waterproof Bluetooth speaker with 360° sound, 24-hour playtime, and IP67 rating. Built-in microphone for calls and USB-C fast charging.',
    cat: 'Electronics', material: 'Silicone & Fabric', finish: 'Textured',
    color: 'Midnight Blue', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop',
    ],
    specs: { 'Power Output': '30W', 'Battery Life': '24 hours', 'Waterproof': 'IP67', 'Bluetooth': '5.3', 'Weight': '680g', 'Charging': 'USB-C (3hr full)', 'Drivers': 'Dual 45mm + Passive Radiator' }
  },
  {
    title: 'Smart Fitness Watch Pro',
    desc: 'Advanced fitness smartwatch with AMOLED always-on display, GPS, heart rate & SpO2 monitoring, sleep tracking, and 14-day battery life. 100+ sport modes.',
    cat: 'Electronics', material: 'Titanium & Sapphire Glass', finish: 'Polished',
    color: 'Silver', sizes: ['42mm', '46mm'],
    imgs: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop',
    ],
    specs: { 'Display': '1.43" AMOLED 466x466', 'Battery': '14 days typical', 'Sensors': 'HR, SpO2, Accelerometer, Gyro, GPS', 'Water Resistance': '5 ATM', 'Sport Modes': '100+', 'Weight': '52g (without strap)' }
  },
  {
    title: 'Wireless Charging Pad Trio',
    desc: 'Three-device wireless charging station for phone, earbuds, and watch simultaneously. Supports Qi2 and MagSafe with up to 15W fast charging.',
    cat: 'Electronics', material: 'Vegan Leather & Zinc Alloy', finish: 'Premium',
    color: 'Charcoal', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1601999109332-542b18dbfb68?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
    ],
    specs: { 'Output': '15W + 5W + 5W', 'Standard': 'Qi2 / MagSafe', 'Input': 'USB-C 30W PD', 'LED Indicator': 'Yes', 'Safety': 'Overheat, Overvoltage Protection', 'Dimensions': '200 x 90 x 12mm' }
  },

  // ========== FASHION ==========
  {
    title: 'Classic Leather Crossbody Bag',
    desc: 'Handcrafted Italian full-grain leather crossbody bag with adjustable strap, brass hardware, and multiple compartments. Timeless design for everyday elegance.',
    cat: 'Fashion', material: 'Full-Grain Italian Leather', finish: 'Natural',
    color: 'Cognac Brown', sizes: ['Small', 'Medium'],
    imgs: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    ],
    specs: { 'Leather Type': 'Full-Grain Italian', 'Hardware': 'Solid Brass', 'Lining': 'Cotton Twill', 'Strap Drop': '20-24 inches (adjustable)', 'Pockets': '2 Interior + 1 Zip', 'Dimensions': '10" x 7" x 3"' }
  },
  {
    title: 'Premium Aviator Sunglasses',
    desc: 'Iconic aviator sunglasses with polarized UV400 lenses, lightweight titanium frame, and adjustable silicone nose pads. Includes hard case and cleaning cloth.',
    cat: 'Fashion', material: 'Titanium', finish: 'Polished',
    color: 'Gold / Green', sizes: ['Standard', 'Large'],
    imgs: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=600&fit=crop',
    ],
    specs: { 'Frame': 'Titanium', 'Lens': 'Polarized CR-39', 'UV Protection': 'UV400', 'Bridge': '14mm', 'Temple': '140mm', 'Weight': '28g' }
  },
  {
    title: 'Merino Wool Crew Neck Sweater',
    desc: 'Ultra-soft 100% extra-fine Merino wool sweater. Naturally temperature-regulating, moisture-wicking, and machine washable. Ribbed cuffs and hem.',
    cat: 'Fashion', material: '100% Extra-Fine Merino Wool', finish: 'Knit',
    color: 'Navy Blue', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    imgs: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cda3a36?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=600&fit=crop',
    ],
    specs: { 'Fabric': '100% Extra-Fine Merino (19.5 micron)', 'Weight': '200 GSM', 'Gauge': '12GG Fine Knit', 'Care': 'Machine washable 30°C', 'Fit': 'Regular' }
  },
  {
    title: 'Minimalist Automatic Watch',
    desc: 'Swiss-made automatic movement watch with sapphire crystal, exhibition caseback, and genuine leather strap. 42mm case with 50m water resistance.',
    cat: 'Fashion', material: 'Stainless Steel 316L', finish: 'Brushed & Polished',
    color: 'Silver / White Dial', sizes: ['38mm', '42mm'],
    imgs: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73b7651af0a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&h=600&fit=crop',
    ],
    specs: { 'Movement': 'Swiss Automatic (Sellita SW200)', 'Case': '316L Stainless Steel', 'Crystal': 'Sapphire (AR coated)', 'Water Resistance': '50m / 5 ATM', 'Power Reserve': '38 hours', 'Strap': 'Genuine Italian Leather 20mm' }
  },
  {
    title: 'Canvas Weekender Duffel Bag',
    desc: 'Heavy-duty waxed canvas weekender bag with full-grain leather handles and detachable shoulder strap. Brass zipper and shoe compartment.',
    cat: 'Fashion', material: 'Waxed Canvas & Leather', finish: 'Waxed',
    color: 'Olive Green', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=600&fit=crop',
    ],
    specs: { 'Exterior': '18oz Waxed Canvas', 'Handles': 'Full-Grain Leather', 'Hardware': 'YKK Brass Zippers', 'Lining': 'Cotton Twill', 'Shoe Compartment': 'Yes (ventilated)', 'Capacity': '45L', 'Dimensions': '22" x 12" x 10"' }
  },

  // ========== HOME & LIVING ==========
  {
    title: 'Scandinavian Floor Lamp with Shelf',
    desc: 'Modern Scandinavian-style floor lamp with integrated wooden shelf, linen shade, and dimmable warm LED bulb included. Perfect reading companion.',
    cat: 'Home & Living', material: 'Solid Oak & Linen', finish: 'Natural Oil',
    color: 'Natural Oak / White', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    ],
    specs: { 'Height': '160cm', 'Shade': '30cm Linen Drum', 'Bulb': 'E26 LED 12W (included)', 'Dimmer': 'Foot switch dimmer', 'Shelf Size': '25cm x 25cm', 'Wood': 'FSC Certified Solid Oak', 'Cable': '2m fabric-wrapped' }
  },
  {
    title: 'Handwoven Jute Area Rug',
    desc: 'Ethically handwoven 100% natural jute area rug with geometric pattern. Reversible design, low-pile, and eco-friendly.',
    cat: 'Home & Living', material: '100% Natural Jute', finish: 'Handwoven',
    color: 'Natural / Ivory', sizes: ["4'x6'", "5'x8'", "6'x9'", "8'x10'"],
    imgs: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop',
    ],
    specs: { 'Material': '100% Natural Jute', 'Weave': 'Flatweave / Handwoven', 'Pile Height': '0.5 inch (low pile)', 'Backing': 'Cotton slip-resistant', 'Reversible': 'Yes', 'Care': 'Vacuum regularly, spot clean', 'Origin': 'Handmade in India' }
  },
  {
    title: 'Memory Foam Ergonomic Pillow Set',
    desc: 'Set of 2 premium memory foam pillows with cooling gel layer and breathable bamboo cover. Contoured design for natural neck alignment.',
    cat: 'Home & Living', material: 'Memory Foam & Bamboo Rayon', finish: 'Quilted',
    color: 'White', sizes: ['Standard', 'Queen', 'King'],
    imgs: [
      'https://images.unsplash.com/photo-1584100936595-c0c6b300e3e7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592789705501-f9ae4287c4b9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&h=600&fit=crop',
    ],
    specs: { 'Fill': 'Gel-Infused Memory Foam', 'Cover': 'Bamboo Rayon (removable)', 'Density': 'Medium-Firm', 'Cooling': 'Phase-change gel layer', 'Hypoallergenic': 'Yes', 'CertiPUR-US': 'Certified', 'Set Includes': '2 pillows + 2 spare covers' }
  },
  {
    title: 'Ceramic Planter Set — Modern Geometric',
    desc: 'Set of 3 modern geometric ceramic planters with bamboo saucers and drainage holes. Matte finish in graduated sizes.',
    cat: 'Home & Living', material: 'Stoneware Ceramic', finish: 'Matte',
    color: 'Sage Green', sizes: ['4 inch', '5.5 inch', '7 inch'],
    imgs: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&h=600&fit=crop',
    ],
    specs: { 'Material': 'Fired Stoneware Ceramic', 'Drainage': 'Yes (with bamboo saucer)', 'Set': '3 planters + 3 saucers', 'Sizes': '4", 5.5", 7" diameter', 'Weight': '1.2kg total' }
  },
  {
    title: 'Velvet Throw Blanket — Luxury Plush',
    desc: 'Ultra-soft microfiber velvet throw blanket with elegant tassel trim. Double-sided — velvet on one side, sherpa fleece on the other. Machine washable.',
    cat: 'Home & Living', material: 'Microfiber Velvet & Sherpa', finish: 'Plush',
    color: 'Dusty Rose', sizes: ['50x60 inches', '60x80 inches'],
    imgs: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop',
    ],
    specs: { 'Front': '280 GSM Microfiber Velvet', 'Back': '220 GSM Sherpa Fleece', 'Trim': 'Hand-tied tassels', 'Care': 'Machine wash cold, tumble dry low', 'Hypoallergenic': 'Yes', 'Weight': '1.8 lbs (50x60)' }
  },

  // ========== SPORTS & OUTDOORS ==========
  {
    title: 'Carbon Fiber Road Bicycle',
    desc: 'Lightweight full carbon frame road bike with Shimano 105 groupset, hydraulic disc brakes, and tubeless-ready wheels. Race geometry for serious cyclists.',
    cat: 'Sports & Outdoors', material: 'T800 Carbon Fiber', finish: 'Gloss',
    color: 'Metallic Red', sizes: ['48cm', '51cm', '54cm', '56cm', '58cm'],
    imgs: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=600&fit=crop',
    ],
    specs: { 'Frame': 'T800 Carbon Monocoque', 'Groupset': 'Shimano 105 R7100 12-Speed', 'Brakes': 'Hydraulic Disc (160mm)', 'Wheels': '700C Tubeless Ready', 'Tire': '700x28C', 'Weight': '8.2 kg' }
  },
  {
    title: 'Ultralight Backpacking Tent 2P',
    desc: 'Professional-grade 2-person ultralight tent with DAC Featherlite poles, silnylon fly, and full mesh inner. Packs to just 1.1kg.',
    cat: 'Sports & Outdoors', material: 'Silicone-coated Nylon', finish: 'Ripstop',
    color: 'Forest Green', sizes: ['2-Person', '3-Person'],
    imgs: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=600&h=600&fit=crop',
    ],
    specs: { 'Weight': '1.1 kg (trail weight)', 'Poles': 'DAC Featherlite NSL', 'Fly': '20D Silnylon (3000mm HH)', 'Floor': '30D Silnylon (5000mm HH)', 'Vestibule': '2 (front & rear)', 'Packed Size': '42 x 12 cm', 'Season': '3-season' }
  },
  {
    title: 'Premium Yoga Mat — Natural Rubber',
    desc: 'Eco-friendly natural rubber yoga mat with microfiber suede surface. Non-slip wet or dry, 5mm cushion, and carrying strap included.',
    cat: 'Sports & Outdoors', material: 'Natural Tree Rubber', finish: 'Suede Top',
    color: 'Midnight Purple', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=600&fit=crop',
    ],
    specs: { 'Surface': 'Microfiber Suede', 'Base': 'Natural Tree Rubber', 'Thickness': '5mm', 'Dimensions': '183 x 68 cm', 'Weight': '2.5 kg', 'Non-Slip': 'Wet & dry grip', 'Eco': 'PVC-free, biodegradable' }
  },
  {
    title: 'Insulated Stainless Steel Water Bottle',
    desc: 'Triple-wall vacuum insulated water bottle keeps drinks cold 24hrs or hot 12hrs. Food-grade 18/8 stainless steel with powder-coated exterior.',
    cat: 'Sports & Outdoors', material: '18/8 Stainless Steel', finish: 'Powder Coated',
    color: 'Ocean Blue', sizes: ['500ml', '750ml', '1L'],
    imgs: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100fc609d6?w=600&h=600&fit=crop',
    ],
    specs: { 'Insulation': 'Triple-wall vacuum', 'Cold': '24 hours', 'Hot': '12 hours', 'Steel': 'Food-grade 18/8', 'Cap': 'Leak-proof bamboo lid', 'BPA Free': 'Yes' }
  },
  {
    title: 'Trail Running Shoes — Waterproof',
    desc: 'High-performance waterproof trail runners with Vibram Megagrip outsole, Gore-Tex membrane, and responsive cushioning.',
    cat: 'Sports & Outdoors', material: 'Recycled Mesh & Gore-Tex', finish: 'Technical',
    color: 'Black / Neon Green', sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    imgs: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
    ],
    specs: { 'Upper': 'Recycled Mesh + Gore-Tex', 'Outsole': 'Vibram Megagrip', 'Lug Depth': '5mm', 'Drop': '6mm', 'Weight': '310g (US 9)', 'Waterproof': 'Gore-Tex membrane' }
  },

  // ========== BEAUTY & HEALTH ==========
  {
    title: 'Professional Hair Dryer — Ionic',
    desc: 'Salon-grade ionic hair dryer with 110,000 RPM brushless motor, 3 heat settings, cool shot button, and magnetic styling attachments. 350g lightweight.',
    cat: 'Beauty & Health', material: 'Polycarbonate', finish: 'Soft-Touch',
    color: 'Rose Gold', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1522338242992-e1a54571eebe?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&h=600&fit=crop',
    ],
    specs: { 'Motor': '110,000 RPM Brushless', 'Wattage': '1600W', 'Ionic': 'Negative Ion Generator', 'Heat Settings': '3 + Cool Shot', 'Attachments': 'Concentrator, Diffuser (magnetic)', 'Weight': '350g' }
  },
  {
    title: 'Vitamin C Brightening Serum',
    desc: 'Concentrated 20% L-Ascorbic Acid serum with Hyaluronic Acid and Vitamin E. Brightens skin, reduces dark spots, and boosts collagen. Dermatologist tested.',
    cat: 'Beauty & Health', material: 'Glass Bottle', finish: 'Frosted',
    color: 'Amber', sizes: ['15ml', '30ml'],
    imgs: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
    ],
    specs: { 'Active': '20% L-Ascorbic Acid', 'Supporting': 'Hyaluronic Acid, Vitamin E, Ferulic Acid', 'pH': '3.2', 'Skin Type': 'All skin types', 'Cruelty Free': 'Yes', 'Paraben Free': 'Yes', 'Volume': '30ml' }
  },
  {
    title: 'Electric Toothbrush — Sonic Pro',
    desc: 'Ultrasonic electric toothbrush with 40,000 vibrations/min, pressure sensor, smart timer, and 5 brushing modes. Includes travel case and 3 replacement heads.',
    cat: 'Beauty & Health', material: 'ABS Plastic', finish: 'Glossy',
    color: 'Pearl White', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop',
    ],
    specs: { 'Vibrations': '40,000/min', 'Modes': '5 (Clean, White, Gum Care, Sensitive, Deep Clean)', 'Timer': '2-min with 30s intervals', 'Battery': '30 days on single charge', 'Waterproof': 'IPX7', 'Includes': 'Travel case, 3 brush heads' }
  },
  {
    title: 'Aromatherapy Essential Oil Diffuser',
    desc: 'Ultrasonic essential oil diffuser with 400ml capacity, wood grain design, 7 LED color options, and whisper-quiet operation. Auto shut-off.',
    cat: 'Beauty & Health', material: 'BPA-Free PP & Wood Grain', finish: 'Wood Grain',
    color: 'Light Oak', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616401784845-180882c8eabc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600493572828-a0a14e1aca4a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=600&h=600&fit=crop',
    ],
    specs: { 'Capacity': '400ml', 'Coverage': 'Up to 40m²', 'Run Time': '8-12 hours (low mist)', 'LED': '7 colors (steady or cycling)', 'Noise Level': '<25dB', 'Auto Shut-off': 'Yes (empty tank)' }
  },

  // ========== BOOKS & STATIONERY ==========
  {
    title: 'Premium Leather-Bound Journal — A5',
    desc: 'Handstitched genuine leather journal with 200 pages of acid-free 100gsm paper. Features lay-flat binding, ribbon bookmark, and inner pocket.',
    cat: 'Books & Stationery', material: 'Genuine Buffalo Leather', finish: 'Vegetable Tanned',
    color: 'Vintage Brown', sizes: ['A5', 'A4'],
    imgs: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=600&h=600&fit=crop',
    ],
    specs: { 'Cover': 'Full-grain Buffalo Leather', 'Pages': '200 (100 sheets)', 'Paper': '100gsm Acid-Free Ivory', 'Binding': 'Smyth-sewn lay-flat', 'Bookmark': 'Satin ribbon', 'Closure': 'Leather wrap-around strap', 'Dimensions': '14.8 x 21 cm' }
  },
  {
    title: 'Fountain Pen — Brass & Ebonite',
    desc: 'Artisan brass fountain pen with hand-turned ebonite barrel and 14K gold nib. Schmidt ink converter included. Heavy, balanced feel.',
    cat: 'Books & Stationery', material: 'Brass & Ebonite', finish: 'Patina-Ready',
    color: 'Raw Brass / Black', sizes: ['Fine Nib', 'Medium Nib', 'Broad Nib'],
    imgs: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
    ],
    specs: { 'Nib': '14K Gold (JoWo #6)', 'Barrel': 'Hand-Turned Ebonite', 'Cap': 'Solid Brass', 'Filling': 'Schmidt K5 Converter', 'Weight': '48g (posted)', 'Length': '140mm (capped)' }
  },

  // ========== KITCHEN & DINING ==========
  {
    title: 'Japanese Chef Knife — Damascus Steel',
    desc: '8-inch Gyuto chef knife with 67-layer VG10 Damascus steel blade, 62 HRC hardness, and octagonal walnut handle. Hand-sharpened to 15° per side.',
    cat: 'Kitchen & Dining', material: 'VG10 Damascus Steel', finish: 'Hand-Hammered',
    color: 'Damascus Pattern', sizes: ['6 inch', '8 inch', '10 inch'],
    imgs: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589792923962-537704632910?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909172-89cf0b8fdd5d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=600&fit=crop',
    ],
    specs: { 'Steel': 'VG10 core, 67-layer Damascus', 'Hardness': '62 HRC', 'Edge Angle': '15° per side', 'Handle': 'Octagonal Walnut + Pakka Wood', 'Blade Length': '210mm (8 inch)', 'Weight': '175g' }
  },
  {
    title: 'Cast Iron Dutch Oven — Enameled',
    desc: '6-quart enameled cast iron Dutch oven with self-basting lid, stainless steel knob, and wide handles. Oven-safe to 500°F.',
    cat: 'Kitchen & Dining', material: 'Enameled Cast Iron', finish: 'Glossy Enamel',
    color: 'French Blue', sizes: ['4 Qt', '6 Qt', '8 Qt'],
    imgs: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop',
    ],
    specs: { 'Material': 'Cast Iron + Porcelain Enamel', 'Capacity': '6 Quart / 5.7 Liters', 'Oven Safe': 'Up to 500°F / 260°C', 'Lid': 'Self-basting with stainless knob', 'Induction': 'Compatible (all cooktops)', 'Weight': '5.6 kg' }
  },
  {
    title: 'Pour Over Coffee Set — Borosilicate',
    desc: 'Complete pour over coffee set with borosilicate glass carafe, stainless steel permanent filter, bamboo collar, and gooseneck kettle.',
    cat: 'Kitchen & Dining', material: 'Borosilicate Glass & Bamboo', finish: 'Clear',
    color: 'Clear / Natural Bamboo', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497515114889-1c03275f403e?w=600&h=600&fit=crop',
    ],
    specs: { 'Carafe': 'Borosilicate Glass (600ml)', 'Filter': 'Stainless Steel Mesh (reusable)', 'Collar': 'Heat-resistant Bamboo', 'Kettle': '350ml Gooseneck', 'Set Includes': 'Carafe, filter, collar, kettle, scoop' }
  },
  {
    title: 'Bamboo Cutting Board Set',
    desc: 'Set of 3 premium organic bamboo cutting boards with juice grooves, non-slip feet, and integrated handle. Anti-bacterial, knife-friendly.',
    cat: 'Kitchen & Dining', material: 'Organic Moso Bamboo', finish: 'Food-Safe Oil',
    color: 'Natural Bamboo', sizes: ['Small (10x7")', 'Medium (14x10")', 'Large (18x12")'],
    imgs: [
      'https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606923829169-7cb30c060bfa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop',
    ],
    specs: { 'Material': 'Organic Moso Bamboo', 'Treatment': 'Food-safe mineral oil', 'Non-Slip': 'Silicone feet', 'Juice Groove': 'Yes (all sizes)', 'Anti-Bacterial': 'Naturally anti-microbial', 'Set': '3 boards (Small, Medium, Large)' }
  },

  // ========== TOYS & GAMES ==========
  {
    title: 'Wooden Building Blocks — 100 Pieces',
    desc: 'Premium 100-piece wooden building block set made from sustainably sourced beechwood with non-toxic paints. Includes arches, columns, triangles, and planks.',
    cat: 'Toys & Games', material: 'Beechwood', finish: 'Non-Toxic Paint',
    color: 'Multi-Color', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=600&fit=crop',
    ],
    specs: { 'Pieces': '100', 'Wood': 'FSC Certified Beechwood', 'Paint': 'Water-based non-toxic (EN71 certified)', 'Shapes': '12 different shapes', 'Colors': '12 colors + natural wood', 'Age': '3+ years', 'Storage': 'Cotton drawstring bag included' }
  },
  {
    title: '1000-Piece Jigsaw Puzzle — Mountain Panorama',
    desc: 'High-quality 1000-piece jigsaw puzzle featuring a stunning Alpine mountain panorama. Premium cardboard with linen finish to reduce glare.',
    cat: 'Toys & Games', material: 'Recycled Cardboard', finish: 'Linen Textured',
    color: 'Multicolor', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1606503153255-59d5e417c4ed?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611329532992-0b7ba27d85fb?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549056796-bb0f199e2b1f?w=600&h=600&fit=crop',
    ],
    specs: { 'Pieces': '1000', 'Completed Size': '70 x 50 cm', 'Material': '100% Recycled Cardboard', 'Surface': 'Linen finish (anti-glare)', 'Age': '12+', 'Includes': 'Reference poster + resealable bag' }
  },
  {
    title: 'RC Off-Road Monster Truck 4WD',
    desc: 'High-speed 1:10 scale 4WD remote control monster truck with brushless motor, waterproof electronics, and rechargeable 5000mAh battery. Top speed 60km/h.',
    cat: 'Toys & Games', material: 'Nylon Composite', finish: 'Painted Shell',
    color: 'Red / Black', sizes: [],
    imgs: [
      'https://images.unsplash.com/photo-1581235707960-35f13de229c0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612902456551-404854679e5b?w=600&h=600&fit=crop',
    ],
    specs: { 'Scale': '1:10', 'Motor': 'Brushless 3660 3300KV', 'Speed': '60 km/h max', 'Battery': 'LiPo 5000mAh 11.1V', 'Drive': '4WD Full-time', 'Radio': '2.4GHz 3-channel', 'Waterproof': 'Yes (ESC, Servo, Receiver)' }
  },
];

// ===================== BANNERS =====================
const BANNERS = [
  {
    title: 'Welcome to Our Store',
    subtitle: 'Discover premium products across electronics, fashion, home decor, and more',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop',
    linkUrl: '/catalog',
    isActive: true,
    displayOrder: 0
  },
  {
    title: 'New Season Collection',
    subtitle: 'Fresh arrivals in fashion, accessories, and lifestyle essentials',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop',
    linkUrl: '/catalog',
    isActive: true,
    displayOrder: 1
  },
  {
    title: 'Tech Deals of the Week',
    subtitle: 'Up to 30% off on selected electronics and gadgets',
    imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=500&fit=crop',
    linkUrl: '/catalog',
    isActive: true,
    displayOrder: 2
  },
  {
    title: 'Home & Kitchen Essentials',
    subtitle: 'Transform your space with handpicked home products',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&h=500&fit=crop',
    linkUrl: '/catalog',
    isActive: true,
    displayOrder: 3
  },
];

// ===================== SEED FUNCTION =====================
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');

    // Find admin user (keep existing users)
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('❌ No admin user found. Please create an admin account first.');
      process.exit(1);
    }
    console.log(`👤 Using admin: ${admin.name || admin.email}`);

    // 1. Clear existing products
    await AdminProduct.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // 2. Clear and reseed categories
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');

    const categoryDocs = await Category.insertMany(
      CATEGORIES.map((c, i) => ({
        name: c.name,
        icon: c.icon,
        image: c.image,
        gradient: c.gradient,
        displayOrder: i + 1,
        isPredefined: true,
        isActive: true,
        showOnHome: true,
        createdBy: admin._id
      }))
    );
    console.log(`✅ Seeded ${categoryDocs.length} categories`);

    // 3. Clear and reseed banners
    await Banner.deleteMany({});
    console.log('🗑️  Cleared existing banners');

    const bannerDocs = await Banner.insertMany(
      BANNERS.map(b => ({ ...b, createdBy: admin._id }))
    );
    console.log(`✅ Seeded ${bannerDocs.length} banners`);

    // 4. Seed products
    const products = PRODUCTS.map((p) => {
      const hasPricing = Math.random() > 0.2;
      const basePrice = hasPricing ? rand(15, 2500) : 0;
      const mrp = hasPricing ? basePrice + rand(5, 300) : 0;

      return {
        title: p.title,
        description: p.desc,
        price: basePrice,
        mrp: hasPricing ? mrp : null,
        retailPrice: hasPricing ? basePrice + rand(0, 100) : null,
        discount: hasPricing && Math.random() > 0.5 ? { discountType: 'percentage', discountValue: rand(5, 25) } : {},
        showPriceInListing: hasPricing ? Math.random() > 0.15 : false,
        category: p.cat,
        quantity: rand(10, 500),
        images: p.imgs || [],
        material: p.material || '',
        finish: p.finish || '',
        sizes: p.sizes || [],
        color: p.color || '',
        specifications: p.specs || {},
        createdBy: admin._id,
        isActive: true,
        published: true,
        rating: 0,
        reviewCount: 0,
        reviews: []
      };
    });

    const result = await AdminProduct.insertMany(products);
    console.log(`✅ Seeded ${result.length} products`);

    // 5. Update SiteSettings for a generic store
    const settings = await SiteSettings.getSettings();
    settings.heroTitle = 'Discover Premium Products for Every Lifestyle';
    settings.heroSubtitle = 'Shop curated collections of electronics, fashion, home essentials, and more — all in one place';
    settings.heroCategories = CATEGORIES.map(c => c.name);
    settings.heroCategoryIcons = CATEGORIES.map(c => c.icon);
    settings.heroCategoryImages = CATEGORIES.map(c => c.image);
    settings.statsProducts = `${result.length}+`;
    settings.statsYears = '10+';
    settings.statsClients = '10,000+';
    settings.statsBrands = '100+';
    settings.testimonials = [
      { text: 'Amazing product quality and super fast delivery. This has become my go-to store for everything!', author: 'Sarah Johnson — Repeat Customer' },
      { text: 'The variety is incredible. I found exactly what I needed at a great price. Highly recommended!', author: 'Michael Chen — Verified Buyer' },
      { text: 'Outstanding customer service. They went above and beyond to help me choose the right product.', author: 'Priya Sharma — Interior Designer' },
    ];
    settings.aboutSubtitle = 'Your trusted destination for premium, curated products across lifestyle, tech, and home';
    settings.aboutStory = 'We started with a simple vision: bring together the best products from around the world into one beautifully curated store. What began as a small online shop has grown into a trusted marketplace serving thousands of happy customers.\n\nOur team personally tests and selects every product to ensure it meets our high standards of quality, design, and value. We believe shopping should be joyful — and every purchase you make should bring lasting satisfaction.';
    settings.aboutOfferings = 'Curated collection of premium products across 8+ categories\nExpert product recommendations and guides\nCompetitive pricing with regular deals and offers\nFast, reliable shipping with tracking\nHassle-free returns and exchanges\nDedicated customer support team';
    settings.aboutCategories = CATEGORIES.map(c => c.name);
    settings.aboutBrands = ['Premium Brand A', 'Brand B', 'EcoLine', 'TechPro', 'Artisan Co.', 'HomeStyle'];
    settings.aboutShowroom = 'Browse our complete catalog online, with detailed photos, specifications, and customer reviews for every product.';
    settings.aboutWhyChooseUs = 'Curated Quality — Every product is hand-selected for quality and value\nFast Shipping — Most orders ship within 24 hours\nEasy Returns — 30-day hassle-free return policy\nExpert Support — Our team is here to help you choose\nSecure Checkout — Your data is always protected\nSustainable — We prioritize eco-friendly products and packaging';
    settings.showSqftCalculator = false;
    settings.catalogFilterConfig = [
      { key: 'category', label: 'Categories', icon: '📂', enabled: true, displayOrder: 0 },
      { key: 'material', label: 'Material', icon: '🏷️', enabled: true, displayOrder: 1 },
      { key: 'finish', label: 'Finish', icon: '✨', enabled: true, displayOrder: 2 },
      { key: 'size', label: 'Size', icon: '📐', enabled: true, displayOrder: 3 },
      { key: 'color', label: 'Color', icon: '🎨', enabled: true, displayOrder: 4 },
      { key: 'price', label: 'Price Range', icon: '💰', enabled: true, displayOrder: 5 },
      { key: 'rating', label: 'Min. Rating', icon: '⭐', enabled: true, displayOrder: 6 }
    ];
    settings.inquiryFormFields = [
      { fieldName: 'name', label: 'Your Name', type: 'text', required: true, enabled: true, placeholder: 'Full name', options: [], displayOrder: 0 },
      { fieldName: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'your@email.com', options: [], displayOrder: 1 },
      { fieldName: 'phone', label: 'Phone Number', type: 'tel', required: true, enabled: true, placeholder: '+1 555 123 4567', options: [], displayOrder: 2 },
      { fieldName: 'quantity', label: 'Quantity Required', type: 'number', required: true, enabled: true, placeholder: 'e.g., 10', options: [], displayOrder: 3 },
      { fieldName: 'quantityUnit', label: 'Unit', type: 'select', required: false, enabled: true, placeholder: '', options: ['Units', 'Pieces', 'Sets', 'Kg', 'Boxes'], displayOrder: 4 },
      { fieldName: 'message', label: 'Additional Message / Requirements', type: 'textarea', required: false, enabled: true, placeholder: 'Tell us more about your needs...', options: [], displayOrder: 5 }
    ];
    settings.updatedBy = admin._id;
    await settings.save();
    console.log('✅ Updated SiteSettings');

    console.log('\n🎉 Seed complete! Summary:');
    console.log(`   Categories: ${categoryDocs.length}`);
    console.log(`   Products:   ${result.length}`);
    console.log(`   Banners:    ${bannerDocs.length}`);
    console.log(`   Users:      kept as-is`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

seed();
