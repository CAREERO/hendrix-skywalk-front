import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { CardElement } from '@stripe/react-stripe-js'; // Import CardElement from '@stripe/react-stripe-js'
import styles from '../PaymentCardForm/PaymentCardForm.module.scss';

// Define the interface for form data
export interface PaymentCardFormData {
  name: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  saveCard: boolean;
  email: string;
}

// Define the props interface for the PaymentCardForm component
interface PaymentCardFormProps {
  onSaveCard: (formData: PaymentCardFormData) => void;
  userEmail: string;
}

// Define the PaymentCardForm component
const PaymentCardForm: React.FC<PaymentCardFormProps> = ({ onSaveCard, userEmail }) => {
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [email, setEmail] = useState(userEmail); // Initialize email with userEmail

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct form data object
    const formData: PaymentCardFormData = {
      name: name, // Name on Card
      cardNumber: cardNumber, // Card Number
      expDate: expDate, // Expiration Date
      cvc: cvc, // CVC
      saveCard: saveCard, // Save card for future payments
      email: email, // User's email
    };

    // Call onSaveCard function with form data
    onSaveCard(formData);

    // Clear form fields after submission
    setName('');
    setNameTouched(false);
    setCardNumber('');
    setExpDate('');
    setCVC('');
    setSaveCard(false);
    setEmail(''); // Clear email field
  };

  // Handle input field blur for name field
  const handleNameBlur = () => {
    setNameTouched(true);
  };

  // Check if the name input is valid
  const isNameValid = () => {
    return name.trim() !== '';
  };

  // Render the PaymentCardForm component
  return (
    <div className={styles.paymentCardFormContainer}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        {/* Name input field */}
        <div className={styles.inputField}>
          <label className={styles.nameLabel}>
            Name on Card:
            {nameTouched && !isNameValid() && (
              <span className={styles.errorMsg}>Enter your name exactly as it’s written on your card</span>
            )}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            className={styles.cardInput}
          />
        </div>
        {/* Card element */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>
            Card Details:
            <div className={styles.iconInput}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <FaLock className={styles.icon} />
            </div>
          </label>
        </div>
        {/* Card number input field */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={styles.cardInput}
          />
        </div>
        {/* Expiration date input field */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Exp Date:</label>
          <input
            type="text"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            className={styles.cardInput}
            placeholder="MM/YY" // Add placeholder "MM/YY"
          />
        </div>
        {/* CVC input field */}
        <div className={styles.inputField}>
          <label className={styles.cvcLabel}>CVC:</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
            className={`${styles.cardInput} ${styles.small}`}
          />
        </div>
        {/* Email input field */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            className={styles.cardInput}
          />
        </div>
        {/* Checkbox to save card for future payments */}
        <div className={styles.inputField}>
          <label>
            <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
            Save my card for future payments
          </label>
        </div>
        {/* Submit button */}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

// Export the PaymentCardForm component
export default PaymentCardForm;
