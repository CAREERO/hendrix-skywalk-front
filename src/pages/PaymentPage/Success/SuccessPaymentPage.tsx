import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.scss';

const SuccessPaymentPage: React.FC = () => {
  const navigate = useNavigate();

  // Function to create an invoice and redirect to the orders page
  const createInvoiceAndRedirect = async () => {
    try {
      // Check if the user is authenticated
      const isAuthenticated = localStorage.getItem('userIsLoggedIn');
      if (!isAuthenticated || isAuthenticated !== 'true') {
        throw new Error('User is not authenticated');
      }

      // Retrieve the access token from local storage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found in local storage');
      }

      // Make an API call to create an invoice with authorization token
      await axios.post(
        `${process.env.REACT_APP_API_TARGET_LOCAL}/payments/create-invoice/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to the orders page
      navigate('/orders');
    } catch (error) {
      console.error('Error creating invoice:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="success-payment-container">
      <h2 className='subtext-success-label'>Payment Successful!</h2>
      <p  className="subtext-success">Thank you for your purchase.</p>
      <button className="button btn-viewOrders" type='button' onClick={createInvoiceAndRedirect}>View Orders</button>
    </div>
  );
};

export default SuccessPaymentPage;
