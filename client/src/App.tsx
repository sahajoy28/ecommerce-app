import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, FilterContext } from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Dashboard } from "./pages/Dashboard";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/CartPage";
import { AuthPage } from "./pages/AuthPage";
import { AccountPage } from "./pages/AccountPage";
import { OrderPage } from "./pages/OrderPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AddressForm } from "./components/AddressForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import { authApi } from "./services/apiClient";

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
  const [showFilters, setShowFilters] = useState(true);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      authApi.setAuthToken(token);
    } else {
      authApi.clearAuthToken();
    }
  }, [token]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppWrapper>
          <FilterContext.Provider value={{ toggleFilters }}>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={<ErrorBoundary><Dashboard showFilters={showFilters} setShowFilters={setShowFilters} /></ErrorBoundary>} />
                <Route path="/product/:id" element={<ErrorBoundary><ProductDetails /></ErrorBoundary>} />
                <Route path="/cart" element={<ErrorBoundary><CartPage /></ErrorBoundary>} />
                <Route path="/wishlist" element={<ErrorBoundary><WishlistPage /></ErrorBoundary>} />
                <Route path="/login" element={<ErrorBoundary><AuthPage /></ErrorBoundary>} />
                <Route path="/account" element={<ErrorBoundary><AccountPage /></ErrorBoundary>} />
                <Route path="/order" element={<ErrorBoundary><OrderPage /></ErrorBoundary>} />
                <Route path="/checkout" element={<ErrorBoundary><AddressForm /></ErrorBoundary>} />
              </Routes>
            </MainContent>
          </FilterContext.Provider>
        </AppWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;