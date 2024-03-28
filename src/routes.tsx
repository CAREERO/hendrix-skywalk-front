import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Reviews from './pages/Reviews/Reviews';
import ShoppingCart from './pages/Cart/ShoppingCart';
import LoginPage from './pages/Auth/LoginPage';
import Profile from './pages/Profile/UserProfile';
import ProductCreatePage from './pages/Product/ProductCreatePage';
import { CartProvider } from '../src/components/Shop/CartContext';
import ProductDetailsPage from '../src/pages/Product/ProductDetailsPage';
import Rewards from './pages/Rewards/Rewards';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import PaymentPage from './pages/PaymentPage/PaymentPage'; // Import PaymentPage component

const AppRoutes: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    setLoggedIn(true);
  };

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" state={{ from: '/profile' }} replace />}
        />
        <Route
          path="/productCreate"
          element={
            isLoggedIn ? (
              <ProductCreatePage />
            ) : (
              <Navigate to="/login" state={{ from: '/productCreate' }} replace />
            )
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
