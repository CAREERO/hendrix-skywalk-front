import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from "../../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (product: Product) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await api.post(`${process.env.REACT_APP_API_TARGET}/cart/add/`, {
        product: { id: productId },
        quantity: quantity
      });
      if (response.data.message === "Item added to cart") {
        // Update the local cart state with the added product
        setCart(prevCart => [...prevCart, { id: productId, quantity }] as Product[]);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeFromCart = (product: Product) => {
    // Implement removing a product from the cart locally
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  // Other functions...

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
