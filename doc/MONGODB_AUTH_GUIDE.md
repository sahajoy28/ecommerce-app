# MongoDB & Authentication Setup Guide

Complete guide to implement MongoDB database with JWT authentication.

---

## Table of Contents

1. [Setup MongoDB](#setup-mongodb)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Integration](#frontend-integration)
4. [Testing & Verification](#testing--verification)

---

## Setup MongoDB

### Option 1: MongoDB Atlas (Cloud - Recommended for Deployment)

**Easiest for production, free tier available**

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Sign In" or "Create an account"

2. **Create Free Cluster**
   - Click "Create a Deployment"
   - Select "Free" tier ($0)
   - Choose region close to you
   - Click "Create Deployment"

3. **Get Connection String**
   - Go to "Database" → "Drivers"
   - Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `ecommerce`

4. **Add `.env` Variables**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

### Option 2: MongoDB Local (For Development)

**Install locally for faster development**

1. **Download MongoDB Community Edition**
   - Windows: https://www.mongodb.com/try/download/community
   - macOS: Use Homebrew: `brew install mongodb-community`
   - Linux: https://docs.mongodb.com/manual/installation/

2. **Start MongoDB**

   ```powershell
   # Windows - in new terminal
   mongod

   # macOS/Linux
   brew services start mongodb-community
   ```

3. **Add `.env` Variables**
   ```env
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

---

## Backend Implementation

### Step 1: Install Required Packages

```powershell
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
npm install jsonwebtoken bcryptjs
```

### Step 2: Create User Model

**File:** `server/models/User.js`

```javascript
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
```

### Step 3: Create Auth Middleware

**File:** `server/middleware/auth.js`

```javascript
import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
```

### Step 4: Update Auth Routes

**File:** `server/routes/auth.js` (REPLACE ENTIRE FILE)

```javascript
import express from "express";
import User from "../models/User.js";
import { verify, generateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    console.log(`✅ User registered: ${email}`);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    next({
      status: 500,
      message: error.message || "Registration failed",
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user (include password field)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log(`🔐 Login successful: ${email}`);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    next({
      status: 500,
      message: "Authentication failed",
    });
  }
});

/**
 * GET /api/auth/me
 * Get current logged-in user (protected route)
 */
router.get("/me", verify, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next({
      status: 500,
      message: "Failed to fetch user",
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (frontend should delete token)
 */
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
```

### Step 5: Update Server Configuration

**File:** `server/index.js` (UPDATE)

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔗 Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    status: err.status || 500,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 E-commerce API running on http://localhost:${PORT}`);
});
```

### Step 6: Update Server .env

**File:** `server/.env` (UPDATE)

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/ecommerce
# OR for Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

## Frontend Integration

### Step 1: Update Frontend .env

**File:** `.env` (in root, or frontend can read it)

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 2: Create API Client

**File:** `client/src/services/authAPI.ts`

```typescript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  getMe: async (token: string) => {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  },
};
```

### Step 3: Update Auth Redux Slice

**File:** `client/src/features/auth/authSlice.ts` (UPDATE)

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.signup(name, email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## Testing & Verification

### Test Login/Signup Flow

1. **Start Backend**

   ```powershell
   npm run server
   ```

2. **Start Frontend**

   ```powershell
   npm run client
   ```

3. **Test Signup**
   - Go to http://localhost:5173
   - Click Login
   - Switch to "Sign Up"
   - Enter: Name, Email, Password
   - Click Submit
   - Should see success message

4. **Check MongoDB** (if local)

   ```powershell
   # In MongoDB shell
   use ecommerce
   db.users.find()
   ```

5. **Test Login**
   - Log out
   - Try login with same credentials
   - Should succeed

### API Testing with Curl

```powershell
# Signup
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"john@example.com","password":"password123"}'

# Get current user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me `
  -H "Authorization: Bearer TOKEN"
```

---

## Common Issues

### Issue: MONGO_URI not found

**Solution:**

```powershell
# Check .env exists in server folder
cat server/.env

# Should show MONGO_URI=...
```

### Issue: MongoDB connection timeout

**Solution:**

- Check MongoDB is running: `mongod` (local) or check Atlas connection
- Verify connection string has correct password
- Check firewall/network settings

### Issue: "Email already registered" even for new email

**Solution:**

- Clear MongoDB database: `db.users.deleteMany({})`
- Or create new MongoDB Atlas cluster

### Issue: Token not persisting

**Solution:**

```typescript
// Check localStorage in browser DevTools
// Application → Local Storage
// Should have 'token' and 'user' keys
```

---

## Next Steps

1. ✅ Install packages
2. ✅ Create User model
3. ✅ Implement auth routes
4. ✅ Update frontend
5. 🔲 Test login/signup
6. 🔲 Add more user fields (address, phone, etc.)
7. 🔲 Implement profile update endpoint
8. 🔲 Add email verification (optional)
9. 🔲 Add forgot password (optional)

---

**Your authentication system is now ready!** 🚀
