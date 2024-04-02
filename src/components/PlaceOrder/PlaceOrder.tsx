import React from 'react';
import './PlaceOrder.scss';

interface PlaceOrderProps {
  orderDetails: {
    subtotal: number;
    taxes: number;
    selectedShippingOption: string;
    total: number;
    shippingInformation: string;
    customerName: string;
    orderNumber: string;
    paymentOption: string; // Add paymentOption property
    maskedCardNumber: string; // Add maskedCardNumber property
  };
  onClose: () => void;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ orderDetails, onClose }) => {
  const { subtotal, taxes, selectedShippingOption, total, shippingInformation, customerName, orderNumber, paymentOption, maskedCardNumber } = orderDetails;

  return (
    <div className="place-order-container">
      <h2>Order Details</h2>
      <div className="order-details">
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
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="taxes">
          <span>Taxes:</span>
          <span>${taxes.toFixed(2)}</span>
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
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="print-button" onClick={() => window.print()}>Print</button>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
}

export default PlaceOrder;
