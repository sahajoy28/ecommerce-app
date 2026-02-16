import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";

export interface User {
  id: string;
  name: string;
  email: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: Array<{ id: number; title: string; quantity: number; price: number }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  addresses: Address[];
  orders: Order[];
}

const initialState: AuthState = {
  user: localStorage.getItem("user") 
    ? { 
        ...JSON.parse(localStorage.getItem("user")!),
        addresses: [],
        orders: []
      }
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  addresses: [],
  orders: []
};

// Async Thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.signup(name, email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.addresses = [];
      state.orders = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    addAddress: (state, action: PayloadAction<Omit<Address, "id">>) => {
      const newAddress: Address = {
        ...action.payload,
        id: `addr_${Date.now()}`
      };
      state.addresses.push(newAddress);
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload
      }));
    },
    addOrder: (state, action: PayloadAction<Omit<Order, "id">>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `order_${Date.now()}`
      };
      state.orders.push(newOrder);
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
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
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError, addAddress, removeAddress, setDefaultAddress, addOrder } = authSlice.actions;
export default authSlice.reducer;
