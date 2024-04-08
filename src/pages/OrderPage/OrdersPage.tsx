import React from 'react';
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
  const orders: Order[] = [
    { id: 1, customerName: 'John Doe', totalAmount: 50, status: 'Processing' },
    { id: 2, customerName: 'Jane Smith', totalAmount: 75, status: 'Processing' },
    // Add more orders as needed
  ];

  const reprintInvoice = (orderId: number) => {
    // Logic to reprint the invoice for the given orderId
    console.log(`Reprinting invoice for order with ID ${orderId}`);
  };

  return (
    <div className={styles.ordersPage}>
      <Header />
      <h1>Orders</h1>
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.order}>
            <div className={styles.orderDetails}>
              <p>Order ID: {order.id}</p>
              <p>Customer Name: {order.customerName}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
            </div>
            <button className={styles.reprintButton} onClick={() => reprintInvoice(order.id)}>
              Reprint Invoice
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
