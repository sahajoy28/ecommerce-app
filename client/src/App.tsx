import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, FilterContext } from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProviderWrapper } from "./components/ThemeWrapper";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/CartPage";
import { AuthPage } from "./pages/AuthPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AccountPage } from "./pages/AccountPage";
import { OrderPage } from "./pages/OrderPage";
import { WishlistPage } from "./pages/WishlistPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AddressForm } from "./components/AddressForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { authApi } from "./services/apiClient";
import { getUser } from "./features/auth/authSlice";
import { loadCartAPI } from "./features/cart/cartSlice";
import { loadWishlistAPI } from "./features/wishlist/wishlistSlice";
import { ThemeProvider } from "./app/themeContext";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  // Sidebar is toggled via button on all devices
  const [showFilters, setShowFilters] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      authApi.setAuthToken(token);
      dispatch(getUser());
      // Load user's cart and wishlist
      dispatch(loadCartAPI() as any).catch(() => {});
      dispatch(loadWishlistAPI() as any).catch(() => {});
    } else {
      authApi.clearAuthToken();
    }
  }, [token, dispatch]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <ThemeProvider>
      <ThemeProviderWrapper>
        <ErrorBoundary>
          <BrowserRouter>
            <AppWrapper>
              <FilterContext.Provider value={{ toggleFilters }}>
                <Header />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
                    <Route path="/catalog" element={<ErrorBoundary><CatalogPage /></ErrorBoundary>} />
                    <Route path="/product/:id" element={<ErrorBoundary><ProductDetails /></ErrorBoundary>} />
                    <Route path="/about" element={<ErrorBoundary><AboutPage /></ErrorBoundary>} />
                    <Route path="/contact" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
                    <Route path="/cart" element={<ErrorBoundary><CartPage /></ErrorBoundary>} />
                    <Route path="/wishlist" element={<ErrorBoundary><WishlistPage /></ErrorBoundary>} />
                    <Route path="/login" element={<ErrorBoundary><AuthPage /></ErrorBoundary>} />
                    <Route path="/account" element={<ErrorBoundary><AccountPage /></ErrorBoundary>} />
                    <Route path="/order" element={<ErrorBoundary><OrderPage /></ErrorBoundary>} />
                    <Route path="/settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
                    <Route path="/checkout" element={<ErrorBoundary><AddressForm /></ErrorBoundary>} />
                    <Route path="/admin" element={<ErrorBoundary><AdminPage /></ErrorBoundary>} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ErrorBoundary>
                          <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                          </ProtectedRoute>
                        </ErrorBoundary>
                      }
                    />
                  </Routes>
                </MainContent>
              </FilterContext.Provider>
            </AppWrapper>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProviderWrapper>
    </ThemeProvider>
  );
}

export default App;