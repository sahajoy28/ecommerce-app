import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi, ApiError } from "../../services/apiClient";
import { Product } from "../../types/product";

interface ProductsState {
  items: Product[];
  filtered: Product[];
  loading: boolean;
  error: string | null;
  retrying: boolean;
  filters: {
    category: string | null;
    maxPrice: number | null;
    minRating: number;
    search: string;
    material: string | null;
    finish: string | null;
    size: string | null;
    color: string | null;
  };
}

const initialState: ProductsState = {
  items: [],
  filtered: [],
  loading: false,
  error: null,
  retrying: false,
  filters: {
    category: null,
    maxPrice: null,
    minRating: 0,
    search: '',
    material: null,
    finish: null,
    size: null,
    color: null,
  }
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch from MongoDB via our API - returns published products only
      const res = await productsApi.get<any>("/products?limit=100");
      const products = res.products || res;

      // Transform products - use real reviews from database
      return Array.isArray(products)
        ? products.map((product: any) => ({
              id: String(product.id || product._id),
              _id: String(product._id || product.id),
              title: product.title,
              price: product.price,
              category: product.category,
              description: product.description,
              image: product.image || product.thumbnail || product.images?.[0],
              images: product.images,
              mrp: product.mrp,
              retailPrice: product.retailPrice,
              discount: product.discount,
              showPriceInListing: product.showPriceInListing,
              rating: product.rating || 0,
              reviewCount: product.reviewCount || 0,
              reviews: product.reviews || [],
              material: product.material || '',
              finish: product.finish || '',
              sizes: product.sizes || [],
              color: product.color || '',
              specifications: product.specifications || {},
              stock: product.stock,
              quantity: product.quantity,
            }))
        : [];
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Failed to fetch products");
    }
  }
);

const applyFilters = (state: ProductsState) => {
  let result = [...state.items];
  const f = state.filters;
  if (f.category) result = result.filter(p => p.category === f.category);
  if (f.maxPrice !== null) result = result.filter(p => p.price <= f.maxPrice!);
  if (f.minRating > 0) result = result.filter(p => p.rating >= f.minRating);
  if (f.search) {
    const q = f.search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (f.material) result = result.filter(p => p.material === f.material);
  if (f.finish) result = result.filter(p => p.finish === f.finish);
  if (f.size) result = result.filter(p => p.sizes?.includes(f.size!));
  if (f.color) result = result.filter(p => p.color?.toLowerCase() === f.color!.toLowerCase());
  state.filtered = result;
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.filters.category = action.payload || null;
      applyFilters(state);
    },
    filterByPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
      applyFilters(state);
    },
    filterByRating: (state, action) => {
      state.filters.minRating = action.payload;
      applyFilters(state);
    },
    searchProducts: (state, action) => {
      state.filters.search = action.payload;
      applyFilters(state);
    },
    filterByMaterial: (state, action) => {
      state.filters.material = action.payload || null;
      applyFilters(state);
    },
    filterByFinish: (state, action) => {
      state.filters.finish = action.payload || null;
      applyFilters(state);
    },
    filterBySize: (state, action) => {
      state.filters.size = action.payload || null;
      applyFilters(state);
    },
    filterByColor: (state, action) => {
      state.filters.color = action.payload || null;
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
      state.filtered = state.items;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRetrying: (state, action) => {
      state.retrying = action.payload;
    },
    updateProductReviews: (state, action) => {
      const { productId, reviews, rating, reviewCount } = action.payload;
      const updateItem = (item: Product) => {
        if (String(item.id) === String(productId)) {
          item.reviews = reviews;
          item.rating = rating;
          item.reviewCount = reviewCount;
        }
      };
      state.items.forEach(updateItem);
      state.filtered.forEach(updateItem);
    }
  },
  extraReducers: builder => {
    // Pending state
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });

    // Fulfilled state
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.filtered = action.payload;
      state.error = null;
    });

    // Rejected state - error handling
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Failed to fetch products";
      state.retrying = false;
    });
  }
});

export const { filterByCategory, filterByPrice, filterByRating, searchProducts, filterByMaterial, filterByFinish, filterBySize, filterByColor, resetFilters, clearError, setRetrying, updateProductReviews } = slice.actions;
export default slice.reducer;