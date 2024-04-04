import React, { useEffect, useState } from 'react';
import './CheckoutPage.scss';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
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

interface Address {
    id: number;
    firstname: string;
    lastname: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    company?: string; // Optional property for company
    house_no?: string; // Optional property for house number
    apartment?: string; // Optional property for apartment
    landmark?: string; // Optional property for landmark
    phone_number?: string; // Optional property for phone number
}


const CheckoutPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [countries, setCountries] = useState<string[]>([]);
    const [showShippingForm, setShowShippingForm] = useState<boolean>(true);
    const [shippingOption, setShippingOption] = useState<string>('');
    const [shippingPrice, setShippingPrice] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [houseNo, setHouseNo] = useState<string>('');
    const [landmark, setLandmark] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [streetAddress, setStreetAddress] = useState<string>('');
    const [apartment, setApartment] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/cart/items/`);
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                try {
                    const userInfoData = JSON.parse(userInfo);
                    setUsername(userInfoData.username ?? "");
                    setIsLoggedIn(true);
                    setEmail(userInfoData.email);
                } catch (error) {
                    console.error("Error parsing userInfo:", error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchSavedAddresses = async () => {
            const userInfo = localStorage.getItem("userInfo");
            const accessToken = localStorage.getItem("accessToken");
            const userIsLoggedIn = userInfo !== null && accessToken;

            try {
                let config = {};
                if (userIsLoggedIn) {
                    config = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    };
                }

                const response = await axios.get(`${process.env.REACT_APP_API_TARGET_LOCAL}/account/addresses`, config);
                const addresses = response.data;
                setSavedAddresses(addresses);
            } catch (error) {
                console.error('Error fetching saved addresses:', error);
            }
        };

        fetchSavedAddresses();
    }, []);

    const calculateSubtotal = (items: Product[]) => {
        const total = items.reduce((acc: number, curr: Product) => acc + curr.total_price, 0);
        setSubtotal(total);
    };

    const handleContinueShipping = () => {
        setShowShippingForm(false);
    };

    const handleContinuePayment = () => {
        navigate('/payment', { state: { selectedShippingOption: shippingOption } });
    };

    const handleReturnInfo = () => {
        setShowShippingForm(true);
        setShippingOption('');
    };

    const handleReturnCart = () => {
        navigate("/cart");
    };

    const handleShippingOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setShippingOption(selectedOption);
        if (selectedOption === 'standard') {
            setShippingPrice(5);
        } else if (selectedOption === 'express') {
            setShippingPrice(15);
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_PROD}/account/login/`, {
                username,
                password
            });
            const userData = response.data;
            setUsername(userData.username);
            setIsLoggedIn(true);
            setShowLoginForm(false);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setFirstName("");
        setLastName("");
        setCompany("");
        setStreetAddress("");
        setApartment("");
        setCountry("");
        setCity("");
        setState("");
        setZipCode("");
        setPhone("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const shippingInfo = {
            firstname: firstName,
            lastname: lastName,
            phone_number: phone,
            zip_code: zipCode,
            house_no: houseNo,
            apartment,
            street_address: streetAddress,
            landmark,
            city,
            state,
            country,
            email,
            company,
        };

        const userInfo = localStorage.getItem("userInfo");
        const accessToken = localStorage.getItem("accessToken");
        const userIsLoggedIn = userInfo !== null && accessToken;

        if (userIsLoggedIn) {
            try {
                const billingInfoResponse = await axios.get(`${process.env.REACT_APP_API_TARGET_LOCAL}/account/addresses/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const existingAddresses = billingInfoResponse.data;

                if (existingAddresses.length > 0) {
                    const addressId = existingAddresses[0].id;
                    const updateResponse = await axios.put(`${process.env.REACT_APP_API_TARGET_LOCAL}/account/addresses/update/${addressId}/`, shippingInfo, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log("Backend database updated with shipping information:", updateResponse.data);
                } else {
                    const createResponse = await axios.post(`${process.env.REACT_APP_API_TARGET_LOCAL}/account/addresses/create/`, shippingInfo, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log("Backend database created with shipping information:", createResponse.data);
                }

                handleContinueShipping();
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error("User is not authorized to access the resource. Redirecting to login page...");
                } else {
                    console.error("Error updating or creating shipping information:", error);
                }
            }
        } else {
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
        }

        console.log("Shipping information saved:", shippingInfo);
    };

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
    };

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSavedAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        if (selectedValue === "new") {
            // Handle adding a new address
            setSelectedValue('');
        } else {
            // Handle selecting a saved address
            setSelectedValue(selectedValue);
            const selectedAddress = JSON.parse(selectedValue) as Address;
            setFirstName(selectedAddress?.firstname || '');
            setLastName(selectedAddress?.lastname || '');
            setCompany(selectedAddress?.company || '');
            setHouseNo(selectedAddress?.house_no || '');
            setApartment(selectedAddress?.apartment || '');
            setStreetAddress(selectedAddress?.street_address || '');
            setLandmark(selectedAddress?.landmark || '');
            setCountry(selectedAddress?.country || '');
            setCity(selectedAddress?.city || '');
            setState(selectedAddress?.state || '');
            setZipCode(selectedAddress?.zip_code || '');
            setPhone(selectedAddress?.phone_number || '');
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
                                    {isLoggedIn ? (
                                        <>
                                            <div>User: {username}</div>
                                            <button onClick={handleLogout} className='btn-logout-checkout'>Logout</button>
                                        </>
                                    ) : (
                                        <button onClick={handleLoginButtonClick} className='btn-login-checkout'>Login</button>
                                    )}
                                </div>
                                <form className="checkout-form" onSubmit={handleSubmit}>
                                    <div className="email-checkbox">
                                        {isLoggedIn ? (
                                            <div className="user-email">Email:{email}</div>
                                        ) : (
                                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        )}
                                        <label className='subscribed'>
                                            <input className='subscribed-checkbox' type="checkbox" />
                                            <p className='subscribed-text'>Email me with news and offers</p>
                                        </label>
                                    </div>
                                    <div className="shipping-address">
                                        <select onChange={handleSavedAddressChange} value={selectedValue}>
                                            <option value="" disabled hidden>Select Saved Address</option>
                                            {savedAddresses.map((address) => (
                                                <option key={address.id} value={JSON.stringify(address)}>
                                                    {`${address.firstname} ${address.lastname}, ${address.street_address}, ${address.city}, ${address.state}, ${address.zip_code}, ${address.country}`}
                                                </option>
                                            ))}
                                            <option value="new">Add New Address</option>
                                        </select>
                                        <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        <input type="text" placeholder="Company (optional)" value={company} onChange={(e) => setCompany(e.target.value)} />
                                        <div className="house-address">
                                            <input type="text" placeholder="House No." required value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
                                            <input type="text" placeholder="Apartment, suite, etc. (optional)" value={apartment} onChange={(e) => setApartment(e.target.value)} />
                                            <input type="text" placeholder="Landmark" required value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                                        </div>
                                        <input type="text" placeholder="Street Address" required value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />

                                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                            <option>Country/Region</option>
                                            {countries.sort().map((country, index) => (
                                                <option key={index}>{country}</option>
                                            ))}
                                        </select>
                                        <div className="city-state-zip">
                                            <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} />
                                            <input type="text" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)} />
                                            <input type="text" placeholder="ZIP Code" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                        </div>
                                        <input type="tel" placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="checkout-navigation">
                                        <button className='return-btn' type="button" onClick={handleReturnCart}><FaChevronLeft /> Return to Cart</button>
                                        <button type="submit">Continue Shipping</button>
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
                                    {isLoggedIn && (
                                        <div className="user-info">
                                            <p>User: {username}</p>
                                            <button className='checkout-logout-btn' onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                    <div className="shipping-address-info">
                                        <p>Ship to: {`${firstName} ${lastName}, ${streetAddress}, ${apartment}, ${city}, ${state}, ${zipCode}, ${country}`}</p>
                                        <button className='change-btn' onClick={() => setShowShippingForm(true)}>Change</button>
                                    </div>
                                    <div className="shipping-navigation">
                                        <button className='return-btn' type="button" onClick={handleReturnInfo}><FaChevronLeft /> Return to Information</button>
                                        <button className='continue-btn' type="button" onClick={handleContinuePayment}>Continue Payment</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showLoginForm && (
                            <div className='login-modal'>
                                <form className="login-modal-content" onSubmit={handleLogin}>
                                    <button className="close-btn-modal" onClick={() => setShowLoginForm(false)}>
                                        <FaTimes />
                                    </button>
                                    <input type="text" placeholder="Username" name="username" />
                                    <input type="password" placeholder="Password" name="password" />
                                    <button className='btn-login-checkout'>Login</button>
                                </form>
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
                                            <img src={`${process.env.REACT_APP_API_BASE_PROD}${item.product.image}`} alt="" className="cartModal__productImage" />
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
