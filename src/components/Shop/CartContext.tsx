// CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from "../../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity?: number; // Add quantity field
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void; // Add removeFromCart function
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.id === existingProduct.id) {
          return {
            ...item,
            quantity: (item.quantity || 0) + 1,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const addProductsToCart = (products: Product[]) => {
    setCart((prevCart) => [...prevCart, ...products.map((product) => ({ ...product, quantity: 1 }))]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_TARGET}/api/products`);
        const products: Product[] = response.data;
        addProductsToCart(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []); // Run only once on component mount

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
