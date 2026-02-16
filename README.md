# 🛍️ E-Commerce Full-Stack Application

A modern, fully-separated **client** and **server** e-commerce application built with React, TypeScript, Redux, Node.js, and Express.

## 🚀 Quick Start (2 minutes)

### One Command to Run Everything

```bash
cd ecommerce-app
npm run dev
```

This starts:

- **Frontend**: http://localhost:5173 (React with Vite)
- **Backend**: http://localhost:5000 (Express API)

Both run automatically, concurrently, in the same terminal.

### Prerequisites

- **Node.js** v16+
- **npm** or **yarn**

### First Time Only

```bash
npm run install-all
```

## 📁 Folder Structure

```
ecommerce-app/
├── client/          ← React Frontend
├── server/          ← Node.js Backend
├── doc/             ← All Documentation
├── package.json     ← Root scripts
└── .env            ← Configuration
```

## ⚡ Commands

| Command               | Effect                      |
| --------------------- | --------------------------- |
| `npm run dev`         | ▶️ Start both (recommended) |
| `npm run client`      | ▶️ Frontend only            |
| `npm run server`      | ▶️ Backend only             |
| `npm run build`       | 🏗️ Build for production     |
| `npm run install-all` | 📦 Install dependencies     |

## ✨ Features

✅ Product listing with search & filters
✅ Wishlist with heart icon (❤️)
✅ Shopping cart (Redux)
✅ User authentication
✅ Responsive design
✅ Modern blue (#0066ff) + orange (#FF9900) theme
✅ Express API ready for MongoDB

## 🔌 API Endpoints

```
GET    /api/products              # All products
GET    /api/products/1            # Single product
GET    /api/products/search?q=x   # Search
GET    /api/products/category/x   # By category
POST   /api/auth/login            # Login
POST   /api/auth/register         # Register
```

## 📖 Documentation

All documentation is organized in `/doc/`:

- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Development setup & workflow
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Complete index of all docs
- **[/doc/QUICK_START.md](/doc/QUICK_START.md)** - 5-minute tutorial
- **[/doc/BACKEND_SETUP.md](/doc/BACKEND_SETUP.md)** - Backend details
- **[/doc/DESIGN_SYSTEM.md](/doc/DESIGN_SYSTEM.md)** - Colors, typography, spacing
- **[/doc/TROUBLESHOOTING.md](/doc/TROUBLESHOOTING.md)** - Common issues

## 🗂️ Code Locations

```
Frontend:     client/src/
Backend:      server/routes/
Config:       client/vite.config.ts + server/index.js
Environment:  .env (root) + server/.env
```

## 🎯 Tech Stack

| Layer    | Tech                                                 |
| -------- | ---------------------------------------------------- |
| Frontend | React 18, TypeScript, Redux, Styled Components, Vite |
| Backend  | Node.js, Express.js, Axios, CORS, Mongoose-ready     |
| Database | DummyJSON API (temp), MongoDB ready                  |

## 🛠️ Development

### Frontend Dev

```bash
npm run client              # Start frontend only
# Edit client/src/
# Changes auto-reload (HMR)
```

### Backend Dev

```bash
npm run server              # Start backend only
# Edit server/routes/
# Restart server for changes
```

### Full-Stack Dev

```bash
npm run dev                 # Start both
# Both running concurrently
# Edit both client/src/ and server/routes/
```

## 🏗️ Production Build

```bash
npm run build
# Output: client/dist/ (180KB gzip)
# Production-ready optimized bundle
```

## 🐛 Troubleshooting

### Port already in use

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend can't reach backend

- Check both servers are running
- Verify `VITE_API_URL=http://localhost:5000/api` in `.env`
- Check browser console for CORS errors

### Dependencies missing

```bash
npm run install-all
```

## 📚 Stack Details

**Frontend (client/)**

- React 18 + TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Styled Components for styling
- Vite for fast development/bundling
- Axios for API calls

**Backend (server/)**

- Express.js for HTTP API
- Axios for external API calls
- CORS for frontend connection
- Dotenv for configuration
- Mongoose prepared for MongoDB

## 🚀 Next Steps

1. Run `npm run dev`
2. Open http://localhost:5173
3. Browse products, add to cart/wishlist
4. See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for development workflow
5. See [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all docs

## ⚙️ Configuration

**.env** (root)

```
VITE_API_URL=http://localhost:5000/api
BACKEND_PORT=5000
FRONTEND_PORT=5173
```

**server/.env**

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:5173
```

## 📄 License

ISC

---

**Questions?** Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all resources, or see [TROUBLESHOOTING.md](/doc/TROUBLESHOOTING.md) for common issues.

**Ready to code?** Run `npm run dev` now! 🎉
