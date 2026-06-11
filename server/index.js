import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import inquiryRoutes from './routes/inquiries.js';
import bannerRoutes from './routes/banners.js';
import settingsRoutes from './routes/settings.js';
import categoryRoutes from './routes/categories.js';
import filterRoutes from './routes/filters.js';
import Category from './models/Category.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use MONGO_URI for both local and production
const getMongoURI = () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('⚠️ MONGO_URI not set - running in API-only mode');
    return null;
  }
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    console.log('🌐 Using MongoDB Atlas (Production)');
  } else {
    console.log('💻 Using MongoDB (Development)');
  }
  return uri;
};

// Connect to MongoDB
let dbConnected = false;

const connectDB = async () => {
  if (dbConnected || mongoose.connection.readyState >= 1) return;
  
  try {
    const mongoUri = getMongoURI();
    if (!mongoUri) {
      return;
    }
    
    // Standard connection with username/password in the URI
    await mongoose.connect(mongoUri);
    dbConnected = true;
    console.log('🔗 Connected to MongoDB');
    // Seed default categories on first connect
    await Category.seedDefaults();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Connect on first request (lazy connection)
let connectionAttempted = false;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'] : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Connect to DB on first request
app.use(async (req, res, next) => {
  if (!connectionAttempted) {
    connectionAttempted = true;
    await connectDB();
  }
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/filters', filterRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 E-commerce API running on http://localhost:${PORT}`);
  });
}

export default app;
