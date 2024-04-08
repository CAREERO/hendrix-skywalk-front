import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_TARGET_LOCAL}/cart/items`);
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
        const response = await axios.get(`${process.env.REACT_APP_API_TARGET_LOCAL}/account/stripe/cards/`);
        console.log("Fetched stripe cards:", response.data);
      } catch (error) {
        console.error("Error fetching stripe cards:", error);
      }
    };

    fetchStripeCards();
  }, []);


  useEffect(() => {
      console.log("Location state:", location.state);
      if (location.state && location.state.shippingPrice) {
          console.log("Shipping price:", location.state.shippingPrice);
          setShippingPrice(location.state.shippingPrice);
      }
  }, [location.state]);
  

  const calculateSubtotal = (items: Product[]) => {
    const total = items.reduce((acc: number, curr: Product) => acc + curr.total_price, 0);
    setSubtotal(total);
  };

  const handleSubmitPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.total_price, 0);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${process.env.REACT_APP_API_TARGET_LOCAL}/payments/create-checkout-session/`,
        {
          product_name: cartItems.map(item => item.product.name).join(', '),
          price: totalPrice,
          quantity: cartItems.length,
          subtotal: subtotal,
          shippingPrice: shippingPrice,
          total: totalPrice + shippingPrice,
          userEmail: localStorage.getItem('userEmail'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      window.location.href = response.data.url;
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
            <div className="product-summary">
              <div className="new-product-list">
                {cartItems.map((item: Product) => (
                  <div key={item.id} className="product-item-summary">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_PROD}${item.product.image}`}
                      alt=""
                      className="cartModal__productImage"
                    />
                    <span>{item.product.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Total Price: ${(item.total_price).toFixed(2)}</span>
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
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>USD ${(subtotal + shippingPrice).toFixed(2)}</span>
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
