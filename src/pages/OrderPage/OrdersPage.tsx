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
    fetchInvoices('YOUR_ACCESS_TOKEN');
  }, []);

  const fetchInvoices = async (token: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_PROD}/payments/retrieve-invoices/`,
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
