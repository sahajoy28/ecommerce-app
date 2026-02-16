# Development Guide

Complete guide for development workflow, architecture, and setup.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Architecture](#project-architecture)
3. [Development Workflow](#development-workflow)
4. [Folder Organization](#folder-organization)
5. [Frontend Development](#frontend-development)
6. [Backend Development](#backend-development)
7. [Environment Configuration](#environment-configuration)
8. [Common Tasks](#common-tasks)

---

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher
- **Git** (optional)
- Text editor (VS Code recommended)

### Initial Setup

```bash
# 1. Navigate to project
cd ecommerce-app

# 2. Install all dependencies (root, client, server)
npm run install-all

# 3. Start development
npm run dev

# 4. Open in browser
# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## Project Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────┐
│         React Frontend (localhost:5173)          │
│  - Components, Pages, Redux, Styled Components   │
└────────────────────┬────────────────────────────┘
                     │ axios
                     ↓
┌─────────────────────────────────────────────────┐
│         Express Backend (localhost:5000)         │
│   - Routes, API Endpoints, Error Handling        │
└────────────────────┬────────────────────────────┘
                     │ axios
                     ↓
┌─────────────────────────────────────────────────┐
│         DummyJSON API (https://...)              │
│    (Temporary - will replace with MongoDB)       │
└─────────────────────────────────────────────────┘
```

### Technology Layers

```
┌─────────────────────────────────────────┐
│  Presentation Layer (Frontend)          │
│  - React Components                     │
│  - Redux State Management               │
│  - Styled Components                    │
│  - React Router                         │
└─────────────┬───────────────────────────┘
              │
┌─────────────┴───────────────────────────┐
│  API Layer (Backend)                    │
│  - Express Routes                       │
│  - CORS Middleware                      │
│  - Error Handling                       │
│  - Authentication (mock)                │
└─────────────┬───────────────────────────┘
              │
┌─────────────┴───────────────────────────┐
│  Data Layer                             │
│  - DummyJSON API (current)              │
│  - MongoDB (future)                     │
└─────────────────────────────────────────┘
```

---

## Development Workflow

### Full-Stack Development (Recommended)

```bash
npm run dev
```

This starts:

1. **Frontend** - Auto-reloads on file changes (HMR enabled)
2. **Backend** - Needs manual restart for changes
3. **Both** - Run concurrently in same terminal

**Output:**

```
> npm run dev
concurrently "npm run server" "npm run client"

🚀 E-commerce API running on http://localhost:5000
...
  VITE v5.4.21  ready in 234 ms

➜  Local:   http://localhost:5173/
```

### Frontend-Only Development

```bash
npm run client
```

Use when:

- Working on UI/components only
- Don't need backend
- Want faster startup time

**Features:**

- Auto-reload with HMR
- Instant feedback
- Smaller terminal output

### Backend-Only Development

```bash
npm run server
```

Use when:

- Working on API endpoints only
- Don't need frontend
- Testing with curl/Postman

**Testing Backend:**

```bash
# In another terminal
curl http://localhost:5000/api/products?limit=5
curl http://localhost:5000/api/products/1
```

---

## Folder Organization

### Complete Structure

```
ecommerce-app/
│
├── client/                      ← Frontend (React/TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.ts        ← Redux store
│   │   │   └── hooks.ts        ← Redux hooks
│   │   ├── components/         ← Reusable components
│   │   │   ├── Header.tsx      ← Unified header
│   │   │   ├── ProductCard.tsx ← Product display
│   │   │   └── ...
│   │   ├── features/           ← Redux slices
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── wishlist/
│   │   │   └── auth/
│   │   ├── pages/              ← Page components
│   │   │   ├── Dashboard.tsx   ← Main products page
│   │   │   ├── CartPage.tsx
│   │   │   └── WishlistPage.tsx
│   │   ├── services/
│   │   │   └── apiClient.ts    ← API configuration
│   │   ├── styles/
│   │   │   └── designTokens.ts ← Design system
│   │   ├── types/
│   │   │   └── product.ts      ← TypeScript types
│   │   ├── App.tsx             ← Main app component
│   │   ├── main.tsx            ← Entry point
│   │   └── index.css           ← Global styles (if any)
│   ├── public/                 ← Static assets
│   ├── index.html              ← HTML entry
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── node_modules/
│
├── server/                      ← Backend (Node.js/Express)
│   ├── routes/
│   │   ├── products.js         ← Product API
│   │   └── auth.js             ← Auth API (mock)
│   ├── index.js                ← Express server
│   ├── package.json
│   ├── .env                    ← Server config
│   └── node_modules/
│
├── doc/                         ← Documentation
│   ├── QUICK_START.md
│   ├── BACKEND_SETUP.md
│   ├── DESIGN_SYSTEM.md
│   ├── TROUBLESHOOTING.md
│   └── ...
│
├── package.json                ← Root orchestrator
├── .env                        ← Root config
├── README.md                   ← Quick start
├── DEVELOPMENT_GUIDE.md        ← This file
└── DOCUMENTATION_INDEX.md      ← Doc index
```

---

## Frontend Development

### Component Structure

```typescript
// client/src/components/YourComponent.tsx

import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const StyledContainer = styled.div`
  padding: 16px;
  background: #f5f5f5;
`;

export const YourComponent = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.yourSlice);

  return (
    <StyledContainer>
      {/* Component JSX */}
    </StyledContainer>
  );
};
```

### Adding a New Page

1. **Create component** in `client/src/pages/`
2. **Add route** in `client/src/App.tsx`
3. **Import component** in `App.tsx`

```typescript
// client/src/App.tsx
import { YourPage } from './pages/YourPage';

<Route path="/yourpage" element={<YourPage />} />
```

### Redux State Management

Add new feature:

```typescript
// client/src/features/yourfeature/yourSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  items: any[];
  loading: boolean;
}

const initialState: State = {
  items: [],
  loading: false,
};

export const yourSlice = createSlice({
  name: "yourfeature",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = yourSlice.actions;
export default yourSlice.reducer;
```

Register in store:

```typescript
// client/src/app/store.ts
import yourReducer from "../features/yourfeature/yourSlice";

export const store = configureStore({
  reducer: {
    // ...
    yourfeature: yourReducer,
  },
});
```

### Using Design Tokens

```typescript
import { colors, spacing, typography } from "../styles/designTokens";

const StyledButton = styled.button`
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.primary.main};
  color: ${colors.neutral[0]};
  font-size: ${typography.fontSize.md};
  border-radius: ${borderRadius.md};
`;
```

### API Calls

```typescript
// Use apiClient.ts for API calls
import { productsApi } from "../services/apiClient";

const response = await productsApi.get("/products?limit=100");
```

---

## Backend Development

### Adding a New Route

1. **Create new file** in `server/routes/`
2. **Add route handler**

```javascript
// server/routes/yourroute.js

import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("📦 Processing request");

    // Your logic here

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    next({
      status: 500,
      message: "Failed to process request",
    });
  }
});

export default router;
```

3. **Register in server**

```javascript
// server/index.js
import yourRoute from "./routes/yourroute.js";

app.use("/api/yourroute", yourRoute);
```

### Error Handling Pattern

```javascript
// Proper error handling
try {
  const response = await axios.get(url);
  res.json({ success: true, data: response.data });
} catch (error) {
  if (error.response?.status === 404) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  next({
    status: 500,
    message: "Server error",
    details: error.message,
  });
}
```

### Logging Pattern

```javascript
console.log("📦 Fetching products"); // Action start
console.log("✅ Success"); // Success
console.error("❌ Error:", message); // Error
console.log("🔍 Searching for:", query); // Search
console.log("🏷️ Processing category"); // Category
```

---

## Environment Configuration

### Root `.env`

```env
VITE_API_URL=http://localhost:5000/api
BACKEND_PORT=5000
FRONTEND_PORT=5173
```

Used by:

- Frontend (Vite reads `VITE_` prefixed vars)
- Build scripts

### `server/.env`

```env
PORT=5000
NODE_ENV=development

# Future MongoDB
MONGO_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your-secret-key-here

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# External APIs
EXTERNAL_API_URL=https://dummyjson.com
```

Used by:

- Express server only
- Backend configuration

### How to Use in Code

**Frontend:**

```typescript
const apiUrl = import.meta.env.VITE_API_URL; // 'http://localhost:5000/api'
```

**Backend:**

```javascript
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
```

---

## Common Tasks

### Add New Product Filter

1. **Update ProductCard** - `client/src/components/ProductCard.tsx`
2. **Update FilterSidebar** - `client/src/components/FilterSidebar.tsx`
3. **Update Redux** - Add new filter state in `features/products/`
4. **Add Backend** - New API endpoint if needed

### Change Colors

Edit `client/src/styles/designTokens.ts`:

```typescript
export const colors = {
  primary: {
    main: "#0066ff", // Change here
    lighter: "#E8F0FF",
  },
  secondary: {
    main: "#FF9900", // Or here
  },
  // ...
};
```

### Test API Endpoint

```bash
# Get all products
curl http://localhost:5000/api/products?limit=10

# Search products
curl "http://localhost:5000/api/products/search?q=phone"

# Get single product
curl http://localhost:5000/api/products/1
```

### Debug Frontend

1. Open browser DevTools (F12)
2. Check **Console** for errors
3. Check **Network** tab for API calls
4. Install Redux DevTools extension
5. Use `debugger;` in code

### Debug Backend

1. Check terminal output for logs
2. Add `console.log()` statements
3. Use curl to test endpoints
4. Check `.env` configuration
5. Restart server if config changed

### Hot Reload Not Working

```bash
# Frontend (client folder)
npm run client

# Should see:
# ➜  Local:   http://localhost:5173/

# If not, restart:
npm run dev
```

### Port Already in Use

**Windows:**

```powershell
# Find process
netstat -ano | findstr :5000

# Kill it
taskkill /PID 12345 /F
```

**Mac/Linux:**

```bash
lsof -i :5000
kill -9 <PID>
```

---

## File Modification Guidelines

### Adding to Frontend

- Component files → `client/src/components/`
- Page files → `client/src/pages/`
- Redux slices → `client/src/features/`
- Utilities → `client/src/utils/`
- Types → `client/src/types/`

### Adding to Backend

- Routes → `server/routes/`
- Middleware → `server/middleware/` (create if needed)
- Utilities → `server/utils/` (create if needed)

### Configuration Files

- Edit `.env` for environment variables
- Edit `client/vite.config.ts` for frontend build
- Edit `server/index.js` for backend settings

---

## Performance Tips

### Frontend

- Use React DevTools Profiler
- Lazy load components:
  ```typescript
  const YourPage = lazy(() => import("./pages/YourPage"));
  ```
- Memoize expensive computations:
  ```typescript
  const result = useMemo(() => expensiveCalc(), [dependency]);
  ```

### Backend

- Use logging to identify bottlenecks
- Implement caching for external API calls
- Validate input before processing

---

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Explore `client/src/` and `server/routes/`
3. ✅ Read [/doc/DESIGN_SYSTEM.md](/doc/DESIGN_SYSTEM.md) for styling
4. ✅ Read [/doc/BACKEND_SETUP.md](/doc/BACKEND_SETUP.md) for API details
5. ✅ Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for more

---

**Happy coding!** 🚀
