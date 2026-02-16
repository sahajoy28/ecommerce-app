# E-Commerce Project - Full Stack Setup

## Project Overview

This is a full-stack e-commerce application with a separated frontend (React + Vite) and backend (Node.js + Express).

### Architecture

```
ecommerce-app/
├── src/                    # Frontend React/TypeScript code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── features/          # Redux slices
│   ├── services/          # API client
│   └── styles/            # Design system
├── server/                # Backend Node.js/Express
│   ├── routes/            # API routes
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── package.json           # Frontend dependencies + scripts
└── vite.config.ts         # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Install root dependencies** (includes concurrently for running both)

   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   cd server && npm install
   cd ..
   ```

### Running the Project

#### Option 1: Run Both Together (Recommended)

```bash
npm run dev
```

This will start:

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

Both servers will run concurrently in your terminal.

#### Option 2: Run Separately

**Terminal 1 - Backend:**

```bash
npm run server
```

**Terminal 2 - Frontend:**

```bash
npm run client
```

### Building for Production

```bash
npm run build
```

This generates the production-ready files in the `dist/` directory.

## Backend API

The backend is a Node.js/Express server that currently proxies requests to the DummyJSON API.

### API Endpoints

#### Products

- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Get products by category

#### Authentication (Mock)

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Example Requests

```bash
# Get all products
curl http://localhost:5000/api/products?limit=10

# Get single product
curl http://localhost:5000/api/products/1

# Search products
curl "http://localhost:5000/api/products/search?q=phone"

# Get products by category
curl http://localhost:5000/api/products/category/electronics
```

## Frontend

The frontend is a modern React application built with:

- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Routing**: React Router

### Frontend Configuration

The frontend API client is configured in `src/services/apiClient.ts` and automatically calls the backend at `http://localhost:5000/api`.

## Features Implemented

### Design System

- Comprehensive design tokens (colors, spacing, typography)
- Responsive design system (mobile, tablet, desktop)
- Consistent styling across components

### User Interface

- Product listing with search and filtering
- Product details page
- Shopping cart with Redux state management
- Wishlist feature with heart icon
- User authentication pages
- Responsive header with search bar
- Collapsible filter sidebar (30% width)

### Wishlist Feature

- Add/remove products from wishlist
- Dedicated wishlist page
- Wishlist item count in header
- Heart icon toggle on product cards

### Shopping Features

- Add to cart functionality
- Cart badge showing item count
- Product search and filtering
- Category-based filtering

## Next Steps

### Backend Enhancements

1. **Connect to MongoDB**
   - Create models for Products, Users, Orders
   - Implement database queries instead of API proxying

2. **Authentication**
   - Implement JWT tokens
   - Add password hashing (bcrypt)
   - Session management

3. **Order Management**
   - Create orders collection
   - Order tracking
   - Payment processing

4. **Admin Panel**
   - Product management
   - Order management
   - User management

### Frontend Enhancements

1. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization

2. **Features**
   - User profile management
   - Order history
   - Payment integration
   - Reviews and ratings

3. **PWA**
   - Service workers
   - Offline support

## Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

## Troubleshooting

### Backend won't start

- Make sure port 5000 is not in use
- Check that Node.js version is v16+
- Run `cd server && npm install` to ensure dependencies are installed

### Frontend won't connect to backend

- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify API URL in `src/services/apiClient.ts`

### Build errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear vite cache: `rm -rf .vite`
- Try: `npm run build` again

## File Structure Summary

```
Frontend Code Status:
✅ Header - Merged unified design (search, filters, wishlist, cart)
✅ Dashboard - 30% sidebar filters, 70% product grid
✅ ProductCard - Wishlist integration with heart icon
✅ WishlistPage - Dedicated page with product grid
✅ Redux - Full state management (cart, wishlist, auth)
✅ Responsive Design - Mobile, tablet, desktop optimized

Backend Code Status:
✅ Express Server - Running on port 5000
✅ CORS - Configured for frontend
✅ Products API - Proxying DummyJSON API
✅ Auth Routes - Mock implementation (ready for MongoDB)
✅ Error Handling - Comprehensive error middleware
⏳ MongoDB - Ready to integrate (see Next Steps)
⏳ JWT Authentication - Ready to implement
```

## Development Tips

- Use Redux DevTools Extension for state debugging
- Use browser DevTools for component inspection
- Check backend logs for API request details
- Use Postman/curl to test API endpoints directly

## License

ISC
