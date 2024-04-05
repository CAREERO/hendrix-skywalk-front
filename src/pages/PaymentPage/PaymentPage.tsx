import React, { useState, useEffect } from "react";
import PaymentCardForm, { PaymentCardFormData } from "../../components/PaymentCardForm/PaymentCardForm";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SavedCardsComponent, { CardType } from "../../components/savedCards/SavedCardsComponent";
import { FaChevronLeft } from 'react-icons/fa';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [stripeCards, setStripeCards] = useState<CardType[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');
  const stripe = useStripe();
  const elements = useElements();

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
      setUserEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    const fetchStripeCards = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/account/stripe/cards/`);
        setStripeCards(response.data);
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
      setShippingPrice(10);
    }
  };

  // Function to save card details
  // Function to save card details
  const saveCard = async (formData: PaymentCardFormData) => {
    console.log("Card data to be saved:", formData);
    try {
      if (!stripe || !elements) {
        console.error("Stripe or Elements is not initialized.");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      console.log("Card Element:", cardElement);

      if (!cardElement) {
        console.error("Card Element is not available.");
        return;
      }

      // Create token from card element
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error("Error creating token:", error.message);
        return;
      }

      if (!token || !token.card) {
        console.error("Token or card information is undefined.");
        return;
      }

      const cardBrand = token.card.brand;

      if (!cardBrand || !isValidCardBrand(cardBrand)) {
        console.error("Invalid card brand.");
        return;
      }

      console.log("Token:", token);

      // Append token to form data
      const formDataWithEmail = { ...formData, email: userEmail };
      const formDataComplete = { ...formDataWithEmail, token: token.id };

      // Send form data to backend
      await axios.post(`${process.env.REACT_APP_API_BASE_PROD}/payments/create-card/`, formDataComplete);
      await axios.post(`${process.env.REACT_APP_API_BASE_PROD}/payments/process-payment/`, { token });

      // Fetch updated stripe cards
      const fetchCardsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/account/stripe/cards/`);
      setStripeCards(fetchCardsResponse.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Error saving card:", error.response.data);
      } else if (error.message) {
        console.error("Error saving card:", error.message);
      } else {
        console.error("Error saving card:", error);
      }
    }
  };


  const isValidCardBrand = (brand: string) => {
    const validBrands = [
      'visa',
      'visaDebit',
      'mastercard',
      'mastercardDebit',
      'mastercardPrepaid',
      'amex',
      'discover',
      'dinersClub',
      'jcb',
      'unionPay'
    ];
    return validBrands.includes(brand);
  };

  const showCardDetails = (cardData: CardType) => {
    // Your implementation here
  };

  const payWithSavedCard = (cardData: CardType) => {
    // Your implementation here
  };

  const setCardDetails = (value: boolean) => {
    // Your implementation here
  };

  const setCardDetailsId = (id: number) => {
    // Your implementation here
  };

  const navigateToEditCard = () => {
    // Your implementation here
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
            <button onClick={() => navigate("/checkout")}><FaChevronLeft /> Return to Shipping</button>
          </div>
        </div>
      </div>

      <div className="payment-container-2">
        <h2>Payment Details</h2>
        <PaymentCardForm onSaveCard={saveCard} userEmail={userEmail} />
      </div>

      <div className="payment-container-3">
        <h2>Saved Cards</h2>
        <SavedCardsComponent
          stripeCards={stripeCards}
          setStripeCards={setStripeCards}
          showCardDetails={showCardDetails}
          payWithSavedCard={payWithSavedCard}
          setCardDetails={setCardDetails}
          setCardDetailsId={setCardDetailsId}
          navigateToEditCard={navigateToEditCard}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
