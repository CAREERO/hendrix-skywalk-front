// routes.tsx
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import Reviews from './pages/Reviews/Reviews';
import ShoppingCart from './pages/Shop/ShoppingCart';
import LoginPage from './pages/Auth/LoginPage';
import Profile from './pages/Profile/UserProfile';
import ProductCreatePage from './pages/Product/ProductCreatePage'; // Import ProductCreatePage component
import { CartProvider } from '../src/components/Shop/CartContext';
import ProductDetailsPage from '../src/pages/Product/ProductDetailsPage';

const AppRoutes: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    setLoggedIn(true);
  };

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/api/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/api/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/api/login" state={{ from: '/profile' }} replace />}
        />
        {/* Add route for ProductCreatePage */}
        <Route path="/productCreate" element={isLoggedIn ? <ProductCreatePage /> : <Navigate to="/api/login" state={{ from: '/productCreate' }} replace />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
