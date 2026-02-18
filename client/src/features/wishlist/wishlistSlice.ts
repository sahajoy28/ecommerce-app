import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { userAPI } from "../../services/userAPI";

interface WishlistState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null
};

// Async thunk to load wishlist from MongoDB
export const loadWishlistAPI = createAsyncThunk(
  "wishlist/loadWishlistAPI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getWishlist();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to load wishlist");
    }
  }
);

// Async thunk to add to wishlist in MongoDB
export const addToWishlistAPI = createAsyncThunk(
  "wishlist/addToWishlistAPI",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await userAPI.addToWishlist({
        productId: product.id,
        productName: product.title,
        price: product.price,
        image: product.image
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
    }
  }
);

// Async thunk to remove from wishlist in MongoDB
export const removeFromWishlistAPI = createAsyncThunk(
  "wishlist/removeFromWishlistAPI",
  async (wishlistItemId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.removeFromWishlist(wishlistItemId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Local state management (for optimistic UI updates)
    addToWishlistLocal: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => String(item.id) === String(action.payload.id));
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlistLocal: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => String(item.id) !== String(action.payload));
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Load wishlist
    builder
      .addCase(loadWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWishlistAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.wishlist || [];
      })
      .addCase(loadWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add to wishlist
    builder
      .addCase(addToWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.wishlist || state.items;
      })
      .addCase(addToWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove from wishlist
    builder
      .addCase(removeFromWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.wishlist || state.items;
      })
      .addCase(removeFromWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addToWishlistLocal, removeFromWishlistLocal, clearWishlist, setWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectIsInWishlist = (state: { wishlist: WishlistState }, productId: number | string) =>
  state.wishlist.items.some(item => String(item.id) === String(productId));

export default wishlistSlice.reducer;
