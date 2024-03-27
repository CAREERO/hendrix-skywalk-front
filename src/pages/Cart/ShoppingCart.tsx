import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/Shop/CartContext'; // Import useCart hook
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classNames from 'classnames'; // Import classNames
import axios from 'axios'; // Import axios
import './ShoppingCart.scss'; // Import the SCSS file

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    total_price: number;
}

const ShoppingCart: React.FC = () => {
    const { cart, fetchCartItems } = useCart(); // Get cart data and fetch function from CartContext
    const [subtotal, setSubtotal] = useState(0); // State to hold subtotal
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        fetchCartItems(); // Fetch cart items when component mounts or when cart changes
    }, [fetchCartItems]);

    useEffect(() => {
        // Calculate subtotal based on fetched product data
        const total = cart.reduce((acc, curr) => acc + curr.total_price, 0);
        setSubtotal(total);
    }, [cart]);

    // Function to handle changing quantity of items
    const handleQuantityChange = async (productId: number, newQuantity: number) => {
        try {
            // Ensure new quantity is non-negative
            if (newQuantity < 0) {
                return;
            }

            // Send PUT request to update quantity on the server
            await axios.put(`${process.env.REACT_APP_API_BASE_PROD}/cart/items/update/${productId}/`, { quantity: newQuantity });
            // Refetch cart items to update the UI
            fetchCartItems();
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    // Function to handle removing item from cart
    const handleRemoveItem = async (productId: number) => {
        try {
            // Send DELETE request to remove item from the server
            await axios.delete(`${process.env.REACT_APP_API_BASE_PROD}/cart/item/remove/${productId}/`);
            // Refetch cart items to update the UI
            fetchCartItems();
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    // Function to handle checkout
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <>
            <Header />
            <div className="shopping-cart-container">
                <h2 className="cart-title">Shopping Cart</h2>
                <div className="cart-items">
                    {cart && cart.length > 0 ? (
                        cart.map((item: Product) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-info">
                                    <img src={`${process.env.REACT_APP_API_BASE_PROD}${item.image}`} alt={item.name} className="item-image" />
                                    <div className="item-details">
                                        <h3 className="item-name">{item.name}</h3>
                                    </div>
                                </div>
                                <div className={classNames('quantity-controls')}>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                    <button className={classNames('remove-button')} onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                                <div className={classNames('item-price')}>${(item.total_price).toFixed(2)}</div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">No items in the cart</p>
                    )}
                </div>
                <div className="checkout-section">
                    <textarea className="notes-input" placeholder="Add a note to your order"></textarea>
                    <div className="subtotal">
                        <p className='subtotal-cart-1'>Subtotal:</p>
                        <p className='subtotal-cart-2'>${subtotal.toFixed(2)}</p>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShoppingCart;
