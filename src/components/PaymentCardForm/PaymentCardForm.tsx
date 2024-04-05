import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './PaymentCardForm.module.scss';
import creditCardType from 'credit-card-type';

// Define the interface for form data including the 'token' property
export interface PaymentCardFormData {
  name: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  saveCard: boolean;
  email: string;
  token: string; // Add the 'token' property
}

// Define the props interface for the PaymentCardForm component
interface PaymentCardFormProps {
  onSaveCard: (formData: PaymentCardFormData) => void;
  userEmail: string;
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({ onSaveCard, userEmail }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCVC] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [email, setEmail] = useState(userEmail); // Initialize with userEmail

  const [cardType, setCardType] = useState<string>('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or Elements is not initialized.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('Card element not found.');
      return;
    }

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error:', error.message);
      return;
    }

    const formData: PaymentCardFormData = {
      name,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      saveCard,
      email, // Use the updated email value
      token: token?.id || '',
    };

    onSaveCard(formData);

    clearFormFields();
  };

  const clearFormFields = () => {
    setName('');
    setCardNumber('');
    setExpMonth('');
    setExpYear('');
    setCVC('');
    setSaveCard(false);
    setEmail(userEmail); // Reset email to the initial value
  };

  const handleCardNumberChange = (event: any) => { // Adjust the type of the event
    const value = event.target.value;
    setCardNumber(value);

    const cardTypeResult = creditCardType(value);
    if (cardTypeResult && cardTypeResult.length > 0) {
      setCardType(cardTypeResult[0].niceType);
    } else {
      setCardType('');
    }
  };

  return (
    <div className={styles.paymentCardFormContainer}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        {/* Name input field */}
        <div className={styles.inputField}>
          <label className={styles.nameLabel}>
            Name on Card:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.cardInput}
            />
          </label>
        </div>
        {/* Card number input field */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e)}
              className={styles.cardInput}
            />
          </label>
        </div>
        {/* Email input field */}
        <div className={styles.inputField}>
          <label className={styles.emailLabel}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.cardInput}
            />
          </label>
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
                onChange={(e) => handleCardNumberChange(e)}
              />
              <FaLock className={styles.icon} />
            </div>
          </label>
        </div>
        {/* Display card type */}
        {cardType && (
          <div className={styles.inputField}>
            <span>Card Type: {cardType}</span>
          </div>
        )}
        {/* Expiration month and year input field */}
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Exp Date:</label>
          <input
            type="text"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            className={`${styles.cardInput} ${styles.small}`}
            placeholder="MM/YY"
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
        {/* Checkbox to save card for future payments */}
        <div className={styles.inputField}>
          <label>
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
            Save my card for future payments
          </label>
        </div>
        {/* Submit button */}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentCardForm;
