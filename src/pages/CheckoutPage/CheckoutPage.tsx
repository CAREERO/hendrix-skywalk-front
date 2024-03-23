import React from 'react';
import './CheckoutPage.scss';
import { FaChevronLeft } from 'react-icons/fa';

const CheckoutPage: React.FC = () => {
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
                            {/* Add summary of products here */}
                            <div className="product-summary">
                                <div className="new-product-list">
                                    {/* Product items */}
                                    {[...Array(10)].map((_, index) => (
                                        <div key={index} className="product-item">
                                            <img src="https://via.placeholder.com/25" alt="" className="cartModal__productImage" />
                                            <span>Product Name</span>
                                            <span>$10.00</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className="fixed-section">
                                <div className="subtotal">
                                    <span>Subtotal:</span>
                                    <span>$100.00</span>
                                </div>
                                <div className="shipping-info">
                                    <span>Shipping:</span>
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="total">
                                    <span>Total:</span>
                                    <span>USD $100.00</span>
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
