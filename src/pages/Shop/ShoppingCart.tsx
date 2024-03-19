// src/pages/Shop/ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import axios from 'axios';
import '../../styles/shopcart.scss'; // Import the styles

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_TARGET}/api/shopping-cart/`);
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart data from Django:', error);
                setError('Error fetching cart data. Please try again later.');
            }
        };

        fetchCartData();
    }, []);

    return (
        <div className="shopping-cart-container">
            <Header />
            <h2>Shopping Cart</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="cart-items">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item: any) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No items in the cart</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
