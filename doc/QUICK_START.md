# Quick Start: Using Optimizations

## 1. Error Boundaries

### Wrap Your Routes

```typescript
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

### Custom Error UI

```typescript
<ErrorBoundary
  fallback={(error, retry) => (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>⚠️ Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )}
  onError={(error, info) => {
    console.error("Component failed:", error);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

---

## 2. API Client Usage

### Making Requests

```typescript
import { productsApi } from "../services/apiClient";

// GET with automatic retries
try {
  const products = await productsApi.get<Product[]>("/products?limit=100");
} catch (error) {
  const apiError = error as ApiError;
  console.error(apiError.message);
}

// POST
const response = await productsApi.post("/orders", { items: [...] });

// PUT
const updated = await productsApi.put("/products/1", { title: "New Title" });

// DELETE
await productsApi.delete("/products/1");
```

### Error Types

```typescript
interface ApiError {
  message: string;
  code?: string; // e.g., "ECONNABORTED"
  status?: number; // e.g., 404, 500
  details?: any; // Response body
}
```

### Features

- ✅ Automatic 3 retries for failures
- ✅ 1 second delay between retries
- ✅ 10 second timeout
- ✅ Consistent error format

---

## 3. Redux Error States

### Using in Components

```typescript
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchProducts, clearError } from "../features/products/productsSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle error states
  if (error) {
    return (
      <div style={{ color: "red", padding: "2rem" }}>
        <p>{error}</p>
        <button onClick={() => {
          dispatch(clearError());
          dispatch(fetchProducts());
        }}>
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return <ProductLoader count={12} />;
  }

  return <ProductGrid products={items} />;
}
```

---

## 4. Loading States

### Skeleton Loading

```typescript
import { ProductLoader, Loader } from "../components/LoadingStates";

// Show 12 skeleton cards while loading
<ProductLoader count={12} />

// Show spinner
<Loader />

// With Suspense boundary
<SuspenseBoundary fallback={<ProductLoader />}>
  <ProductGrid />
</SuspenseBoundary>
```

---

## 5. DummyJSON API Endpoints

### Available Endpoints

```typescript
// All products (100+)
GET /products?limit=100

// Single product
GET /products/1

// Search products
GET /products/search?q=laptop

// Products by category
GET /products/category/electronics

// Products with pagination
GET /products?limit=20&skip=0

// Product categories
GET /products/categories
```

### Response Format

```typescript
{
  products: [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 99.99,
      category: "electronics",
      description: "...",
      image: "...",
      rating: 4.5,
      // ... more fields
    }
  ],
  total: 100,
  limit: 100,
  skip: 0
}
```

---

## 6. Best Practices

### ✅ DO

```typescript
// Use API client for all requests
const data = await productsApi.get("/endpoint");

// Wrap components with error boundaries
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Handle error states in Redux
if (error) {
  return <ErrorUI error={error} onRetry={handleRetry} />;
}

// Show loaders during data fetch
{loading && items.length === 0 && <ProductLoader />}
```

### ❌ DON'T

```typescript
// Don't use axios directly
const data = await axios.get(url); // ❌

// Don't ignore errors
try {
  // ...
} catch (e) {
  // Silently failing ❌
}

// Don't show spinners without context
{loading && <Spinner />} // User doesn't know what's loading ❌
```

---

## 7. Testing Error Scenarios

### Simulate Network Error

```typescript
// In browser DevTools
1. Open Network tab
2. Toggle "Offline" mode
3. Try to load products
4. You'll see error message and retry button
```

### Simulate Component Error

```typescript
// Temporarily add error in component
throw new Error("Test error");

// Should be caught by ErrorBoundary
// Component shows error UI instead of crashing app
```

### Simulate Slow Network

```typescript
// In browser DevTools
1. Network tab > Throttle
2. Select "Slow 3G"
3. Load products
4. Should see skeleton loaders
```

---

## 8. Debugging

### Redux DevTools

```typescript
// Install Redux DevTools Extension in browser
// Then navigate to: DevTools > Redux tab
// See state transitions and action dispatches
```

### Console Logging

```typescript
// API errors are logged automatically
[API Error] connection refused
[API Error] Failed to fetch products

// Check console for details
```

### Error Boundaries

```typescript
// Add onError callback to see errors
<ErrorBoundary onError={(error, info) => {
  console.error("Error boundary caught:", error);
  // Send to logging service
}}>
  <App />
</ErrorBoundary>
```

---

## 9. Common Issues & Solutions

### Issue: Products not loading

**Checklist**:

- [ ] Check console for errors
- [ ] Verify DummyJSON API is accessible
- [ ] Check Redux DevTools for error state
- [ ] Try clicking Retry button
- [ ] Check network connection

### Issue: Error boundary not triggering

```typescript
// Error boundaries ONLY catch render errors
// Use try-catch for event handlers and async code

// ✅ Caught by ErrorBoundary
function Component() {
  throw new Error("Render error");
}

// ❌ NOT caught by ErrorBoundary
function Component() {
  return (
    <button onClick={() => {
      throw new Error("Event error"); // Won't be caught
    }}>
      Click me
    </button>
  );
}
```

### Issue: Duplicate API calls

```typescript
// Check your useEffect dependencies
useEffect(() => {
  dispatch(fetchProducts()); // Gets called twice in dev mode (React 18)
}, []); // ✅ Empty deps - runs once

useEffect(() => {
  dispatch(fetchProducts());
}, [items]); // ❌ Infinite loop if items changes
```

---

## 10. File Reference

| File                                     | Purpose                      |
| ---------------------------------------- | ---------------------------- |
| `src/services/apiClient.ts`              | HTTP client with retry logic |
| `src/components/ErrorBoundary.tsx`       | React error boundary wrapper |
| `src/components/LoadingStates.tsx`       | Skeleton loaders & spinners  |
| `src/features/products/productsAPI.ts`   | DummyJSON API calls          |
| `src/features/products/productsSlice.ts` | Redux state with errors      |
| `src/pages/Dashboard.tsx`                | Example implementation       |

---

**Last Updated**: February 15, 2026
**Status**: ✅ Ready for Production
