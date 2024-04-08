import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import "./PaymentPage.scss";

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

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);

  let totalPrice = subtotal + shippingPrice;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/cart/items`);
        setCartItems(response.data);
        calculateSubtotal(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // setUserEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    const fetchStripeCards = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/account/stripe/cards/`);
        console.log("Fetched stripe cards:", response.data);
      } catch (error) {
        console.error("Error fetching stripe cards:", error);
      }
    };

    fetchStripeCards();
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedShippingOption) {
      calculateShippingPrice(location.state.selectedShippingOption);
    }
  }, [location.state]);

  const calculateSubtotal = (items: Product[]) => {
    const total = items.reduce((acc: number, curr: Product) => acc + curr.total_price, 0);
    setSubtotal(total);
  };

  const calculateShippingPrice = (option: string) => {
    if (option === "standard") {
      setShippingPrice(5);
    } else if (option === "express") {
      setShippingPrice(15); // Adjusted the shipping price according to the specification
    }
  };

  const handleSubmitPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Calculate total price from cartItems
    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.total_price, 0);
  
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PROD}/payments/create-checkout-session/`,
        {
          product_name: cartItems.map(item => item.product.name).join(', '), // Concatenate product names
          price: totalPrice,
          quantity: cartItems.length, // Number of items in the cart
          subtotal: subtotal,
          shippingPrice: shippingPrice,
          total: totalPrice + shippingPrice, // Total price including shipping
          userEmail: localStorage.getItem('userEmail'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization header
            'Content-Type': 'application/json', // Specify content type
          },
        }
      );
      console.log(response.data);
      window.location.href = response.data.url; // Redirect to checkout session URL
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  
  return (
    <section className="payment-page-main">
      <div className="payment-container-1">
        <div className="right-section">
          <div className="scrollable-section">
            <h2>Order Summary</h2>
            <hr />
            <div className="payment-summary">
              <div className="new-product-list">
                {cartItems.map((item: Product) => (
                  <div key={item.id} className="payment-item-summary">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_PROD}${item.product.image}`}
                      alt=""
                      className="cartModal__paymentImage"
                    />
                    <span>{item.product.name}</span>
                    <span>${item.product.price}</span>
                  </div>
                ))}
              </div>
              <div className="shipping-navigation"></div>
            </div>
            <hr />
            <div className="fixed-section">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="shipping-info">
                <span>Shipping:</span>
                <span>{shippingPrice ? `$${shippingPrice.toFixed(2)}` : "Calculated at next step"}</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>USD ${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <form onSubmit={handleSubmitPayment}>
              <button type="submit"><FaChevronRight /> Proceed to Payment</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
