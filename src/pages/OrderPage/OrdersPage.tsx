import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header/Header'; // Assuming you have a Header component
import Footer from '../../components/common/Footer/Footer';
import styles from './OrdersPage.module.scss';

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_PROD}/payments/stripe-webhook`, config);
      setOrders(response.data.paid_invoices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching paid invoices:', error);
      setIsLoading(false);
    }
  };

  const reprintInvoice = (orderId: number) => {
    // Logic to reprint the invoice for the given orderId
    console.log(`Reprinting invoice for order with ID ${orderId}`);
  };

  return (
    <div className={styles.ordersPage}>
      <Header />
      <h1>Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <div className={styles.orderDetails}>
                <p>Order ID: {order.id}</p>
                <p>Customer Name: {order.customerName}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Status: {order.status}</p>
              </div>
              <button
                className={styles.reprintButton}
                onClick={() => reprintInvoice(order.id)}
              >
                Reprint Invoice
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrdersPage;
