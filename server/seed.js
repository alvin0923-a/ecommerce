/**
 * Seed script — creates the default admin + 9 carry bag products.
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const BAGS = [
  {
    name: 'Classic Jute Tote Bag',
    price: 299,
    description: 'A timeless, spacious jute tote bag perfect for daily shopping, groceries, or beach trips. 100% natural, biodegradable, and sturdy enough to hold up to 10 kg.',
    images: [],
    rating: 4.8,
    category: 'Tote Bag',
    stock: 50,
    specifications: new Map([
      ['Material', 'Natural Jute'],
      ['Dimensions', '40 × 35 × 12 cm'],
      ['Capacity', '15 Liters'],
      ['Strap Length', '60 cm (adjustable)'],
      ['Closure', 'Open Top'],
      ['Color', 'Natural Beige'],
      ['Weight', '250 g'],
      ['Max Load', '10 kg'],
    ]),
  },
  {
    name: 'Eco Canvas Shoulder Bag',
    price: 449,
    description: 'Lightweight and durable canvas shoulder bag with inner pocket and zip closure. Ideal for everyday carry, college, or casual outings. Machine washable.',
    images: [],
    rating: 4.6,
    category: 'Shoulder Bag',
    stock: 40,
    specifications: new Map([
      ['Material', 'Heavy Duty Canvas (400 GSM)'],
      ['Dimensions', '38 × 30 × 10 cm'],
      ['Capacity', '12 Liters'],
      ['Strap Length', '55 cm'],
      ['Closure', 'Zip'],
      ['Color', 'Olive Green'],
      ['Weight', '200 g'],
      ['Max Load', '8 kg'],
    ]),
  },
  {
    name: 'Premium Woven Shopping Bag',
    price: 199,
    description: 'Strong, reusable woven polypropylene shopping bag. Replaces 500+ single-use plastic bags. Foldable and pocket-sized when not in use.',
    images: [],
    rating: 4.5,
    category: 'Shopping Bag',
    stock: 100,
    specifications: new Map([
      ['Material', 'Woven Polypropylene'],
      ['Dimensions', '45 × 40 × 15 cm'],
      ['Capacity', '25 Liters'],
      ['Strap Length', '50 cm'],
      ['Closure', 'Open Top'],
      ['Color', 'Forest Green'],
      ['Weight', '120 g'],
      ['Max Load', '15 kg'],
    ]),
  },
  {
    name: 'Bamboo Fibre Handbag',
    price: 699,
    description: 'Elegant bamboo fibre handbag with a structured silhouette. Anti-bacterial, sweat-resistant, and entirely plant-based. A stylish eco-statement piece.',
    images: [],
    rating: 4.7,
    category: 'Handbag',
    stock: 25,
    specifications: new Map([
      ['Material', 'Bamboo Fibre Blend'],
      ['Dimensions', '32 × 25 × 10 cm'],
      ['Capacity', '8 Liters'],
      ['Strap Length', '40 cm (fixed)'],
      ['Closure', 'Magnetic Snap'],
      ['Color', 'Earth Brown'],
      ['Weight', '300 g'],
      ['Max Load', '5 kg'],
    ]),
  },
  {
    name: 'Organic Cotton Drawstring Bag',
    price: 149,
    description: "Simple, versatile organic cotton drawstring bag. Great as a gym bag, shoe bag, or kids' school bag. GOTS certified organic cotton.",
    images: [],
    rating: 4.4,
    category: 'Drawstring Bag',
    stock: 80,
    specifications: new Map([
      ['Material', 'GOTS Certified Organic Cotton'],
      ['Dimensions', '40 × 35 cm'],
      ['Capacity', '10 Liters'],
      ['Closure', 'Drawstring'],
      ['Color', 'Natural White'],
      ['Weight', '90 g'],
      ['Max Load', '5 kg'],
    ]),
  },
  {
    name: 'Jute & Leather Handle Bag',
    price: 549,
    description: 'Premium jute body with genuine leather handles and base reinforcement. Perfect for office or gifting. Elegant stitching, magnetic closure with inner lining.',
    images: [],
    rating: 4.9,
    category: 'Tote Bag',
    stock: 20,
    specifications: new Map([
      ['Material', 'Jute + Genuine Leather Handles'],
      ['Dimensions', '38 × 30 × 12 cm'],
      ['Capacity', '13 Liters'],
      ['Strap Length', '45 cm'],
      ['Closure', 'Magnetic Snap'],
      ['Color', 'Dark Tan'],
      ['Weight', '420 g'],
      ['Max Load', '8 kg'],
    ]),
  },
  {
    name: 'Foldable Ripstop Tote',
    price: 249,
    description: 'Ultra-lightweight ripstop nylon tote that folds into its own inner pocket. Water-resistant, ideal for travel, hiking, or spontaneous grocery runs.',
    images: [],
    rating: 4.5,
    category: 'Tote Bag',
    stock: 60,
    specifications: new Map([
      ['Material', 'Ripstop Nylon (recycled)'],
      ['Dimensions', '42 × 38 × 8 cm (unfolded)'],
      ['Capacity', '18 Liters'],
      ['Strap Length', '60 cm'],
      ['Closure', 'Open Top with pouch'],
      ['Color', 'Sage Green'],
      ['Weight', '75 g'],
      ['Max Load', '10 kg'],
    ]),
  },
  {
    name: 'Multi-Pocket Canvas Backpack Bag',
    price: 799,
    description: 'Spacious canvas backpack-style carry bag with 3 compartments and laptop sleeve. Perfect for college, travel, or work. Padded shoulder straps.',
    images: [],
    rating: 4.7,
    category: 'Backpack',
    stock: 30,
    specifications: new Map([
      ['Material', 'Heavy Canvas (500 GSM)'],
      ['Dimensions', '44 × 30 × 16 cm'],
      ['Capacity', '25 Liters'],
      ['Strap Type', 'Padded Adjustable Shoulder Straps'],
      ['Closure', 'YKK Zip'],
      ['Color', 'Charcoal Green'],
      ['Weight', '550 g'],
      ['Max Load', '12 kg'],
    ]),
  },
  {
    name: 'Cotton Mesh Market Bag',
    price: 179,
    description: 'Breathable open-weave cotton mesh bag, perfect for fresh produce, fruits, and vegetables. Expands to hold a full grocery shop and compresses to fit in your pocket.',
    images: [],
    rating: 4.3,
    category: 'Shopping Bag',
    stock: 120,
    specifications: new Map([
      ['Material', 'Organic Cotton Mesh'],
      ['Dimensions', '45 × 40 cm (expandable)'],
      ['Capacity', '20 Liters (expandable)'],
      ['Strap Length', '55 cm'],
      ['Closure', 'Open Top'],
      ['Color', 'Natural / Green stripe'],
      ['Weight', '60 g'],
      ['Max Load', '8 kg'],
    ]),
  },
];

const seed = async () => {
  await connectDB();

  // ── Admin ───────────────────────────────────────────────────
  const existingAdmin = await Admin.findOne({ username: 'admin' });
  if (existingAdmin) {
    console.log('✅ Admin already exists. Skipping admin creation.');
  } else {
    const admin = new Admin({ username: 'admin', password: 'admin123' });
    await admin.save();
    console.log('✅ Admin created  →  username: admin | password: admin123');
    console.log('⚠️  Change the password after first login!');
  }

  // ── Products ────────────────────────────────────────────────
  const existingCount = await Product.countDocuments();
  if (existingCount > 0) {
    console.log(`ℹ️  ${existingCount} products already exist. Skipping product seed.`);
    console.log('   To re-seed, drop the products collection in MongoDB Atlas first.');
  } else {
    await Product.insertMany(BAGS);
    console.log(`✅ Seeded ${BAGS.length} carry bag products successfully!`);
  }

  mongoose.connection.close();
  console.log('🔌 DB connection closed.');
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
