// CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the Product type
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  total_price: number;
  image: string;
}

// Define the CartContextProps interface
interface CartContextProps {
  cart: Product[];
  addToCart: (productId: number, quantity: number) => Promise<void>; // Include addToCart function
  fetchCartItems: () => Promise<void>;
}

// Create the CartContext
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Create the CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [fetched, setFetched] = useState(false); // Flag to track whether data has been fetched or not

  // Function to add a product to the cart
  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await axios.post(`http://localhost:8000/cart/add/${productId}/`, {
        quantity: quantity
      });
      if (response.data.message === "Item added to cart") {
        // Update the local cart state with the added product
        const addedProduct: Product = {
          id: productId,
          name: response.data.name,
          quantity: quantity,
          price: response.data.price,
          total_price: response.data.price * quantity,
          image: response.data.image
        };
        setCart(prevCart => [...prevCart, addedProduct]);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cart/items/');
      const cartItems: Product[] = response.data.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        total_price: item.total_price,
        image: item.product.image
      }));
      setCart(cartItems);
      setFetched(true); // Set the flag to true after fetching data
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    if (!fetched) { // Fetch data only if it hasn't been fetched before
      fetchCartItems();
    }
  }, [fetched]); // Fetch data whenever the fetched flag changes

  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCartItems }}>
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
