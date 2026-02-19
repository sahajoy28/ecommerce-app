import { authApi, productsApi } from "./apiClient";

export const userAPI = {
  getAddresses: async () => {
    return await authApi.get<{ success: boolean; addresses: any[] }>("/user/addresses");
  },
  addAddress: async (address: any) => {
    return await authApi.post<{ success: boolean; message: string; addresses: any[] }>("/user/addresses", address);
  },
  updateAddress: async (id: string, data: any) => {
    return await authApi.put<{ success: boolean; message: string; addresses: any[] }>(`/user/addresses/${id}`, data);
  },
  deleteAddress: async (id: string) => {
    return await authApi.delete<{ success: boolean; message: string; addresses: any[] }>(`/user/addresses/${id}`);
  },
  getCart: async () => {
    return await authApi.get<{ success: boolean; cart: any[] }>("/user/cart");
  },
  addToCart: async (product: any) => {
    return await authApi.post<{ success: boolean; cart: any[] }>("/user/cart", product);
  },
  updateCartItem: async (id: string, quantity: number) => {
    return await authApi.put<{ success: boolean; cart: any[] }>(`/user/cart/${id}`, { quantity });
  },
  removeFromCart: async (id: string) => {
    return await authApi.delete<{ success: boolean; cart: any[] }>(`/user/cart/${id}`);
  },
  getWishlist: async () => {
    return await authApi.get<{ success: boolean; wishlist: any[] }>("/user/wishlist");
  },
  addToWishlist: async (product: any) => {
    return await authApi.post<{ success: boolean; wishlist: any[] }>("/user/wishlist", product);
  },
  removeFromWishlist: async (id: string) => {
    return await authApi.delete<{ success: boolean; wishlist: any[] }>(`/user/wishlist/${id}`);
  },
  getProfile: async () => {
    return await authApi.get<{ success: boolean; user: any }>("/user/profile");
  },
  updateProfile: async (data: any) => {
    return await authApi.put<{ success: boolean; message: string; user: any }>("/user/profile", data);
  },
  changePassword: async (data: any) => {
    return await authApi.post<{ success: boolean; message: string }>("/user/change-password", data);
  },
  // Admin product endpoints
  createAdminProduct: async (data: any) => {
    return await authApi.post<{ success: boolean; message: string; product: any }>("/products/admin/create", data);
  },
  getAdminProducts: async () => {
    const response = await authApi.get<{ success: boolean; products: any[] }>("/products/admin/all");
    return response.products || [];
  },
  updateAdminProduct: async (id: string, data: any) => {
    return await authApi.put<{ success: boolean; message: string; product: any }>(`/products/admin/${id}`, data);
  },
  deleteAdminProduct: async (id: string) => {
    return await authApi.delete<{ success: boolean; message: string }>(`/products/admin/${id}`);
  },
  publishAdminProduct: async (id: string) => {
    return await authApi.patch<{ success: boolean; message: string; product: any }>(`/products/admin/${id}/publish`, {});
  },
  unpublishAdminProduct: async (id: string) => {
    return await authApi.patch<{ success: boolean; message: string; product: any }>(`/products/admin/${id}/unpublish`, {});
  },
  bulkPublishProducts: async (ids: string[]) => {
    return await authApi.post<{ success: boolean; message: string; modifiedCount: number }>("/products/admin/bulk-publish", { ids });
  },
  bulkUnpublishProducts: async (ids: string[]) => {
    return await authApi.post<{ success: boolean; message: string; modifiedCount: number }>("/products/admin/bulk-unpublish", { ids });
  },
  bulkDeleteProducts: async (ids: string[]) => {
    return await authApi.post<{ success: boolean; message: string; deletedCount: number }>("/products/admin/bulk-delete", { ids });
  },
  // User management endpoints (admin only)
  getAllUsers: async () => {
    const response = await authApi.get<{ success: boolean; users: any[] }>("/auth/users");
    return response.users || [];
  },
  promotUserToAdmin: async (email: string) => {
    return await authApi.post<{ success: boolean; message: string; user: any }>("/auth/promote-to-admin", { email });
  },
  // Site settings endpoints (public read, admin write)
  getSiteSettings: async () => {
    const response = await productsApi.get<{ success: boolean; data: any }>("/settings");
    return response.data || {};
  },
  updateSiteSettings: async (data: any) => {
    return await authApi.put<{ success: boolean; data: any; message: string }>("/settings", data);
  },
  // Contact form (public)
  submitContactForm: async (data: { name: string; email: string; phone: string; subject: string; message: string }) => {
    return await productsApi.post<{ success: boolean; message: string }>("/inquiries/contact", data);
  }
};