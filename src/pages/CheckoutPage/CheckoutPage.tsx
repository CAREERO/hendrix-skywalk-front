import React, { useEffect, useState } from 'react';
import './CheckoutPage.scss';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

interface Product {
    id: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        image: string;
        quantity: number;
    };
    quantity: number;
    total_price: number;
    created_at: string;
}

const CheckoutPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/cart/items');
                setCartItems(response.data);
                calculateSubtotal(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateSubtotal = (items: Product[]) => {
        const total = items.reduce((acc: number, curr: Product) => acc + curr.total_price, 0);
        setSubtotal(total);
    };

    return (
        <>
            <section className='checkout-page-main'>
                <div className="checkout-container">
                    <div className="left-section">
                        <h2>Shipping Address and Details</h2>
                        <hr />
                        <div className="contact-info">
                            <p>Contact:</p>
                            <button>Login</button>
                        </div>
                        <form className="checkout-form">
                            <div className="email-checkbox">
                                <input type="email" placeholder="Email" required />
                                <label className='subscribed'><input className='subscribed-checkbox' type="checkbox" /><p className='subscribed-text'>Email me with news and offers</p></label>
                            </div>
                            <div className="shipping-address">
                                <select>
                                    <option>Country/Region</option>
                                    {/* Add country options here */}
                                </select>
                                <input type="text" placeholder="First Name" required />
                                <input type="text" placeholder="Last Name" required />
                                <input type="text" placeholder="Company (optional)" />
                                <input type="text" placeholder="Address" required />
                                <input type="text" placeholder="Apartment, suite, etc. (optional)" />
                                <div className="city-state-zip">
                                    <input type="text" placeholder="City" required />
                                    <input type="text" placeholder="State" required />
                                    <input type="text" placeholder="ZIP Code" required />
                                </div>
                                <input type="tel" placeholder="Phone" required />
                            </div>
                            <div className="checkout-navigation">
                                <button><FaChevronLeft /> Return to Cart</button>
                                <button type="submit">Continue Shipping</button>
                            </div>
                        </form>
                        <div className="links-section">
                            <button>Refund Policy</button>
                            <button>Privacy Policy</button>
                            <button>Terms of Service</button>
                        </div>
                    </div>
                </div>
                <div className="checkout-container-2">
                    <div className="right-section">
                        <div className="scrollable-section">
                            <h2>Order Summary</h2>
                            <hr />
                            <div className="product-summary">
                                <div className="new-product-list">
                                    {cartItems.map((item: Product) => (
                                        <div key={item.id} className="product-item-summary">
                                            <img src={`http://54.146.118.222:8000${item.product.image}`} alt="" className="cartModal__productImage" />
                                            <span>{item.product.name}</span>
                                            <span>${item.product.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className="fixed-section">
                                <div className="subtotal">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="shipping-info">
                                    <span>Shipping:</span>
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="total">
                                    <span>Total:</span>
                                    <span>USD ${subtotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckoutPage;
