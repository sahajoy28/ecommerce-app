import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi, ApiError } from "../../services/apiClient";
import { Product } from "../../types/product";

interface ProductsState {
  items: Product[];
  filtered: Product[];
  loading: boolean;
  error: string | null;
  retrying: boolean;
}

const initialState: ProductsState = {
  items: [],
  filtered: [],
  loading: false,
  error: null,
  retrying: false
};

const generateSampleReviews = (productId: number) => {
  const reviewTexts = [
    { title: "Great product!", comment: "Really happy with this purchase. Excellent quality and arrived on time." },
    { title: "Good value for money", comment: "The price is reasonable and the product works as expected." },
    { title: "Highly recommend", comment: "Very satisfied with my purchase. Would buy again!" },
    { title: "Average quality", comment: "It's okay, does what it's supposed to do but nothing special." },
    { title: "Excellent!", comment: "Exceeded my expectations. Great durability and performance." },
  ];

  const reviewCount = Math.floor(Math.random() * 4) + 2; // 2-5 reviews
  const reviews = [];

  for (let i = 0; i < reviewCount; i++) {
    const reviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars mostly, with some 3-4
    reviews.push({
      id: `review_${productId}_${i}_${Date.now()}`,
      userId: `user_${i}`,
      userName: `User ${i + 1}`,
      rating,
      title: reviewText.title,
      comment: reviewText.comment,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      helpful: Math.floor(Math.random() * 10),
    });
  }

  return reviews;
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch from MongoDB via our API - returns published products only
      const res = await productsApi.get<any>("/products?limit=100");
      const products = res.products || res;

      // Transform products - handle both string IDs (MongoDB) and numeric IDs (legacy)
      return Array.isArray(products)
        ? products.map((product: any) => {
            const reviews = generateSampleReviews(product.id || product._id);
            const averageRating =
              reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : product.rating || 4;

            return {
              id: String(product.id || product._id),  // Ensure ID is a string
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
              rating: Number(averageRating.toFixed(1)),
              reviewCount: reviews.length,
              reviews: reviews,
            };
          })
        : [];
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Failed to fetch products");
    }
  }
);

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.filtered = state.items.filter(p => p.category === action.payload);
    },
    filterByPrice: (state, action) => {
      state.filtered = state.items.filter(p => p.price <= action.payload);
    },
    filterByRating: (state, action) => {
      state.filtered = state.items.filter(p => p.rating >= action.payload);
    },
    searchProducts: (state, action) => {
      state.filtered = state.items.filter(p =>
        p.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    resetFilters: (state) => {
      state.filtered = state.items;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRetrying: (state, action) => {
      state.retrying = action.payload;
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

export const { filterByCategory, filterByPrice, filterByRating, searchProducts, resetFilters, clearError, setRetrying } = slice.actions;
export default slice.reducer;