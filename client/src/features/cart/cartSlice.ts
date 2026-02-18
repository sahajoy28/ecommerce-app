import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { userAPI } from "../../services/userAPI";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

// Async thunk to load cart from MongoDB
export const loadCartAPI = createAsyncThunk(
  "cart/loadCartAPI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getCart();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to load cart");
    }
  }
);

// Async thunk to add to cart in MongoDB
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await userAPI.addToCart({
        productId: product.id,
        productName: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

// Async thunk to remove from cart in MongoDB
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.removeFromCart(cartItemId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

// Async thunk to update cart item quantity
export const updateCartAPI = createAsyncThunk(
  "cart/updateCartAPI",
  async ({ itemId, quantity }: { itemId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateCartItem(itemId, quantity);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local state management (for optimistic UI updates)
    addToCartLocal: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => String(i.id) === String(action.payload.id));
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCartLocal: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(i => String(i.id) !== String(action.payload));
    },
    updateCartQuantityLocal: (state, action: PayloadAction<{ id: number | string; quantity: number }>) => {
      const item = state.items.find(i => String(i.id) === String(action.payload.id));
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Load cart
    builder
      .addCase(loadCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart || [];
      })
      .addCase(loadCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add to cart
    builder
      .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart || state.items;
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove from cart
    builder
      .addCase(removeFromCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart || state.items;
      })
      .addCase(removeFromCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update cart
    builder
      .addCase(updateCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart || state.items;
      })
      .addCase(updateCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addToCartLocal, removeFromCartLocal, updateCartQuantityLocal, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;