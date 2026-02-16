# 🚀 MongoDB Setup - NO Installation Required

You have **2 options** to connect to MongoDB. Option 1 (Atlas) is recommended—no installation needed!

---

## 📌 Option 1: MongoDB Atlas (Recommended - FREE & NO INSTALLATION)

### Step 1: Create Free Account

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** button
3. Sign up with email or Google
4. Verify email

### Step 2: Create Free Cluster

1. On dashboard, click **"Create"** button
2. Choose **"Free"** tier (M0)
3. Select region closest to you (e.g., `us-east-1`)
4. Click **"Create Cluster"**
5. Wait 2-3 minutes for cluster to deploy

### Step 3: Get Connection String

1. Once deployed, click **"Connect"** button
2. Choose **"Drivers"** tab
3. Select **"Node.js"** and version **"4.0 or later"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

### Step 4: Update Your App

**Edit file**: `server/.env`

```env
# Replace this line:
MONGO_URI=mongodb://localhost:27017/ecommerce

# With this (paste your connection string):
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Step 5: Run Your App

```powershell
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
npm run dev
```

**That's it!** Your app connects to MongoDB in the cloud. ✅

---

## 🔧 Option 2: Download & Install MongoDB Locally

### Step 1: Download MongoDB Community

1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - **Windows** (OS)
   - **MSI** (Package)
3. Click **"Download"**
4. Run installer and follow defaults

### Step 2: Verify Installation

Open PowerShell:

```powershell
mongod --version
# Should show: db version v7.0.0+ (or similar)
```

### Step 3: Start MongoDB Server

```powershell
mongod
# Should show: "Waiting for connections on port 27017"
```

**Keep this terminal open!**

### Step 4: In New Terminal, Run Your App

```powershell
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
npm run dev
```

---

## ✅ Verify Connection Works

After running `npm run dev`, check these in your terminal:

### Backend Logs (Server)

You should see:

```
Connected to MongoDB: ecommerce database
```

### Test in Browser

1. Open: http://localhost:5173
2. Go to **Login** → **Sign Up**
3. Create account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123456`
4. Click **Sign Up**
5. Should see ✅ **"Account created successfully!"**

### Verify Database (Optional)

If using MongoDB Atlas:

1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. Should see `ecommerce` database with `users` collection

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"

**If using Atlas:**

- Did you paste the full connection string in `server/.env`?
- Did you replace `<password>` with your actual password?
- Is whitelist enabled? (Check in Atlas → Network Access)
- Try: `mongodb+srv://` (includes `+srv`)

**If using Local:**

- Did you run `mongod` first?
- Is it still running? (Check terminal)
- Running on same port 27017?

### Connection String Issues

If you get error like:

```
MongoServerError: connect ECONNREFUSED
```

Fix:

1. Stop `npm run dev` (Ctrl+C)
2. Make sure MongoDB is running (mongod terminal)
3. Check `server/.env` has correct connection string
4. Run `npm run dev` again

---

## 📊 Comparison: Atlas vs Local

| Feature               | Atlas (Cloud)       | Local               |
| --------------------- | ------------------- | ------------------- |
| **Installation**      | None                | Download + Install  |
| **Setup Time**        | 5 minutes           | 10 minutes          |
| **Free Tier**         | Yes (512MB)         | Yes                 |
| **Accessible from**   | Anywhere            | Only your computer  |
| **No Port Conflicts** | Yes                 | Need port 27017     |
| **Deployment**        | Works in production | Need NodeJS hosting |
| **Backup**            | Automatic           | Manual              |

**Recommendation:** Use **Atlas** for easier setup! 🎯

---

## 🎬 Quick Start (Atlas)

```powershell
# 1. Create Atlas account & get connection string
# 2. Update server/.env with connection string
# 3. Run:
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
npm run dev

# 4. Open http://localhost:5173
# 5. Test signup/login
```

---

## 💡 Pro Tips

1. **Keep connection string secret!** Before pushing to GitHub, make sure `server/.env` is in `.gitignore` ✅

2. **For production:** Use strong JWT_SECRET

   ```powershell
   # Generate one with:
   $([System.Guid]::NewGuid().ToString().Replace('-',''))
   ```

3. **Atlas Free Tier includes:**
   - 512MB storage
   - Shared cluster
   - Basic monitoring
   - Email support
   - Upgrade anytime

4. **Multiple Databases:** Each project can have its own database on same cluster

---

## ❓ Still Stuck?

**Quick checklist:**

- [ ] MongoDB running (or Atlas connected)?
- [ ] `server/.env` has MONGO_URI?
- [ ] `npm run dev` starts without errors?
- [ ] Backend shows "Connected to MongoDB"?
- [ ] Frontend loads at http://localhost:5173?

If all ✅ try to **Sign Up** → should work!
