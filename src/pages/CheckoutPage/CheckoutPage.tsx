import React, { useEffect, useState } from 'react';
import './CheckoutPage.scss';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const [countries, setCountries] = useState<string[]>([]);
    const [showShippingForm, setShowShippingForm] = useState<boolean>(true);
    const [shippingOption, setShippingOption] = useState<string>('');
    const [shippingPrice, setShippingPrice] = useState<number>(0);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countryNames = data.map((country: any) => country.name.common);
                setCountries(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const calculateSubtotal = (items: Product[]) => {
        const total = items.reduce((acc: number, curr: Product) => acc + curr.total_price, 0);
        setSubtotal(total);
    };

    const handleContinueShipping = () => {
        setShowShippingForm(false);
    };

    const handleContinuePayment = () => {
        navigate('/payment', { state: { selectedShippingOption: shippingOption } }); // Pass selectedShippingOption as state
    };

    const handleReturnInfo = () => {
        setShowShippingForm(true); // Show the hidden information form
        setShippingOption(''); // Clear the selected shipping option
    };

    const handleReturnCart = () => {
        navigate("/cart");
    };


    const handleShippingOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setShippingOption(selectedOption);
        // Set shipping price based on the selected option
        if (selectedOption === 'standard') {
            setShippingPrice(5);
        } else if (selectedOption === 'express') {
            setShippingPrice(15);
        }
    };
    return (
        <>
            <section className='checkout-page-main'>
                <div className="checkout-container">
                    <div className="left-section">
                        {showShippingForm && (
                            <>
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
                                        <input type="text" placeholder="First Name" required />
                                        <input type="text" placeholder="Last Name" required />
                                        <input type="text" placeholder="Company (optional)" />
                                        <input type="text" placeholder="Address" required />
                                        <input type="text" placeholder="Apartment, suite, etc. (optional)" />
                                        <select>
                                            <option>Country/Region</option>
                                            {countries.sort().map((country, index) => (
                                                <option key={index}>{country}</option>
                                            ))}
                                        </select>
                                        <div className="city-state-zip">
                                            <input type="text" placeholder="City" required />
                                            <input type="text" placeholder="State" required />
                                            <input type="text" placeholder="ZIP Code" required />
                                        </div>
                                        <input type="tel" placeholder="Phone" required />
                                    </div>
                                    <div className="checkout-navigation">
                                        <button className='return-btn' type="button" onClick={handleReturnCart}><FaChevronLeft /> Return to Cart</button>
                                        <button type="button" onClick={handleContinueShipping}>Continue Shipping</button>
                                    </div>
                                </form>
                            </>
                        )}
                        {!showShippingForm && (
                            <div className="shipping-options">
                                <h2 className='shipping-header'>Shipping Options</h2>
                                <hr />
                                <div className="options">
                                    <h2 className='delivery-label'>Delivery:</h2>
                                    <select className='shipping-dropdown' onChange={handleShippingOptionChange} value={shippingOption}>
                                        <option value="">Select Shipping Option</option>
                                        <option value="standard">Standard Delivery - $5.00</option>
                                        <option value="express">Express Delivery - $15.00</option>
                                    </select>
                                    <div className="shipping-navigation">
                                        <button className='return-btn' type="button" onClick={handleReturnInfo}><FaChevronLeft /> Return to Information</button>
                                        <button className='continue-btn' type="button" onClick={handleContinuePayment}>Continue Payment</button>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                            <img src={`http://localhost:8000${item.product.image}`} alt="" className="cartModal__productImage" />
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
                                    <span>${(subtotal + shippingPrice).toFixed(2)}</span>
                                </div>
                                <div className="shipping-info">
                                    <span>Shipping:</span>
                                    <span>{shippingPrice ? `$${(shippingPrice).toFixed(2)}` : 'Shipping & taxes calculated at payment'}</span>
                                </div>
                                <div className="total">
                                    <span>Total:</span>
                                    <span>USD ${(subtotal + shippingPrice).toFixed(2)}</span>
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
