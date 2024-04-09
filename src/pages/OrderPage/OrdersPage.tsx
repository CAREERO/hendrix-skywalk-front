import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import styles from './OrdersPage.module.scss';

interface Invoice {
  id: number;
  customer_id: string;
  amount_due: number;
  description: string;
}

const OrdersPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      // Retrieve access token from local storage
      const token = localStorage.getItem('access_token');

      if (!token) {
        throw new Error('Access token not found in local storage');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_TARGET_LOCAL}/payments/retrieve-invoices/`,
        config
      );
      setInvoices(response.data.invoices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.ordersPage}>
      <Header />
      <h1>Invoices</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.invoicesList}>
          {invoices.map((invoice) => (
            <div key={invoice.id} className={styles.invoice}>
              <div className={styles.invoiceDetails}>
                <p>Invoice ID: {invoice.id}</p>
                <p>Customer ID: {invoice.customer_id}</p>
                <p>Amount Due: ${invoice.amount_due}</p>
                <p>Description: {invoice.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrdersPage;