import React, { useState } from 'react';
import './SummaryPage.scss';
import PlaceOrder from '../../components/PlaceOrder/PlaceOrder';

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

interface SummaryProps {
  subtotal: number;
  taxes: number;
  selectedShippingOption: string;
  total: number;
  shippingInformation: string;
  customerName: string;
  orderNumber: string;
  paymentOption: string;
  maskedCardNumber: string;
  cartItems: Product[];
  shippingPrice: number; 
}

const SummaryPage: React.FC<SummaryProps> = ({
  cartItems,
  subtotal,
  taxes,
  selectedShippingOption,
  total,
  shippingInformation,
  customerName,
  orderNumber,
  paymentOption,
  maskedCardNumber,
  shippingPrice,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to calculate total price of all items in cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="summary-container">
      <h2>Order Summary</h2>
      <div className="summary-details">
        {cartItems.map((item: Product) => (
          <div key={item.id} className="product-item-summary">
            <img src={`${process.env.REACT_APP_API_BASE_PROD}${item.product.image}`} alt="" className="cartModal__productImage" />
            <span>{item.product.name}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price: ${item.product.price}</span>
          </div>
        ))}
        <div className="order-number">
          <span>Order Number:</span>
          <span>{orderNumber}</span>
        </div>
        <div className="customer-name">
          <span>Customer Name:</span>
          <span>{customerName}</span>
        </div>
        <div className="shipping-information">
          <span>Shipping Information:</span>
          <span>{shippingInformation}</span>
        </div>
        <div className="subtotal">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <div className="taxes">
          <span>Taxes:</span>
          <span>${taxes}</span>
        </div>
        <div className="shipping">
          <span>Shipping:</span>
          <span>{selectedShippingOption}</span>
        </div>
        <div className="payment">
          <span>Payment Option:</span>
          <span>{paymentOption}</span>
        </div>
        <div className="card-number">
          <span>Card Number:</span>
          <span>{maskedCardNumber}</span>
        </div>
        <div className="total">
          <span>Total:</span>
          <span>${calculateTotalPrice()}</span>
        </div>
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <PlaceOrder
              key={orderNumber} // Adding key prop
              orderDetails={{
                subtotal,
                taxes,
                selectedShippingOption,
                total,
                shippingInformation,
                customerName,
                orderNumber,
                paymentOption,
                maskedCardNumber,
              }}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
