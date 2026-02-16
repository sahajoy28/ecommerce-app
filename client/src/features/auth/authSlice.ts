import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  addresses: Address[];
  orders: Order[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<Omit<User, "addresses" | "orders" | "id">>) => {
      state.user = {
        ...action.payload,
        id: `user_${Date.now()}`,
        addresses: [],
        orders: []
      };
      state.isAuthenticated = true;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    addAddress: (state, action: PayloadAction<Omit<Address, "id">>) => {
      if (state.user) {
        const newAddress: Address = {
          ...action.payload,
          id: `addr_${Date.now()}`
        };
        state.user.addresses.push(newAddress);
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.filter(
          addr => addr.id !== action.payload
        );
      }
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === action.payload
        }));
      }
    },
    addOrder: (state, action: PayloadAction<Omit<Order, "id">>) => {
      if (state.user) {
        const newOrder: Order = {
          ...action.payload,
          id: `order_${Date.now()}`
        };
        state.user.orders.push(newOrder);
      }
    }
  }
});

export const { signup, login, logout, addAddress, removeAddress, setDefaultAddress, addOrder } = authSlice.actions;
export default authSlice.reducer;