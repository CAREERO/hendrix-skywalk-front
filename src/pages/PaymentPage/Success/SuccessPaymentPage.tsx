import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.scss';

const SuccessPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<string>('');
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false); // Update this line

  useEffect(() => {
    // Check user authentication status
    const userInfo = localStorage.getItem("userInfo");
    const accessToken = localStorage.getItem("accessToken");
    const userIsLoggedIn = userInfo !== null && accessToken !== null; // Update this line

    if (userIsLoggedIn) {
      try {
        const userInfoData = JSON.parse(userInfo!);
        setUserName(userInfoData.username ?? "");
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    }

    setLoggedIn(userIsLoggedIn);
  }, []);

  const createInvoiceAndRedirect = async () => {
    try {
      if (!loggedIn) {
        throw new Error('User is not authenticated');
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found in local storage');
      }

      // Attempt to create invoice
      await axios.post(
        `${process.env.REACT_APP_API_TARGET_LOCAL}/payments/create-invoice/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Redirect to orders page upon successful creation of invoice
      navigate('/orders');
    } catch (error) {
      console.error('Error creating invoice:', error);
      // Handle error here (e.g., display error message to user)
    }
  };

  return (
    <div className="success-payment-container">
      <h2 className='subtext-success-label'>Payment Successful!</h2>
      <p className="subtext-success">Thank you for your purchase, {userName}.</p>
      <button className="button btn-viewOrders" type='button' onClick={createInvoiceAndRedirect}>View Orders</button>
    </div>
  );
};

export default SuccessPaymentPage;
