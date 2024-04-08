// SuccessPaymentPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPaymentPage.scss';

const SuccessPaymentPage: React.FC = () => {
  const navigate = useNavigate();

  // Function to redirect to the orders page
  const redirectToOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="success-payment-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <button onClick={redirectToOrders}>View Orders</button>
    </div>
  );
};

export default SuccessPaymentPage;
