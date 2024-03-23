// CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from "../../services/api";

// Define the Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  total_price?: number; // Add total_price property
}

// Define the CartContextProps interface
interface CartContextProps {
  cart: Product[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (product: Product) => void;
}

// Create the CartContext
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Create the CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Function to add a product to the cart
  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await api.post(`http://localhost:8000/cart/add/${productId}/`, {
        quantity: quantity
      });
      if (response.data.message === "Item added to cart") {
        // Update the local cart state with the added product
        const addedProduct: Product = {
          id: productId,
          name: response.data.name, // Include the name property
          quantity: quantity,
          price: response.data.price, // Assuming the price is returned in the response
          total_price: response.data.price * quantity // Calculate the total price
        };
        setCart(prevCart => [...prevCart, addedProduct]);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (product: Product) => {
    // Filter out the product from the cart
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Provide the cart data and functions to children components
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
