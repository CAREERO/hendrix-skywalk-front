import React, { useState, useEffect } from "react";
import PaymentCardForm from "../../components/PaymentCardForm/PaymentCardForm";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SavedCardsComponent from "../../components/savedCards/SavedCards";
import { FaChevronLeft } from 'react-icons/fa';
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

interface CardType {
  id: number;
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvc: number;
  email: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [stripeCards, setStripeCards] = useState<CardType[]>([]);

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
  }, []);

  useEffect(() => {
    const fetchStripeCards = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/stripe/cards`);
        setStripeCards(response.data);
        console.log("Fetched stripe cards:", response.data); // Add logging here
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
      setShippingPrice(10);
    }
  };

  const handlePayment = (formData: any) => {
    console.log("Payment form data:", formData);
    navigate("/thank-you");
  };

  const totalPrice = subtotal + shippingPrice;

  const handleChangeShipping = () => {
    navigate("/checkout");
  };

  return (
    <>
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
                <div className="shipping-navigation">
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
                  <span>{shippingPrice ? `$${shippingPrice.toFixed(2)}` : "Calculated at next step"}</span>
                </div>
                <div className="total">
                  <span>Total:</span>
                  <span>USD ${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleChangeShipping}><FaChevronLeft /> Return to Shipping</button>
            </div>
          </div>
        </div>

        <div className="payment-container-2">
          <h2>Payment Details</h2>
          <PaymentCardForm
            onSaveCard={handlePayment}
            payWithSavedCard={() => { }}
            setCardDetails={() => { }}
            setCardDetailsId={() => { }}
            navigateToEditCard={() => { }}
          />
        </div>

        <div className="payment-container-3">
          <h2>Saved Cards</h2>
          <SavedCardsComponent
            stripeCards={stripeCards}
            showCardDetails={() => { }}
            payWithSavedCard={() => { }}
            setCardDetails={() => { }}
            setCardDetailsId={() => { }}
            navigateToEditCard={() => { }}
          />
        </div>
      </section>
    </>
  );
};

export default PaymentPage;
