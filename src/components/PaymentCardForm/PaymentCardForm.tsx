import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { CardElement } from '@stripe/react-stripe-js';
import styles from '../PaymentCardForm/PaymentCardForm.module.scss';

export interface PaymentCardFormData {
  name: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  saveCard: boolean;
  email: string;
}

interface PaymentCardFormProps {
  onSaveCard: (formData: PaymentCardFormData) => void;
  userEmail: string;
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({ onSaveCard, userEmail }) => {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [email, setEmail] = useState(userEmail);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate expiration date format
    const [expMonth, expYear] = expDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const isValidFormat =
      /^\d{2}\/\d{2}$/.test(expDate) &&
      +expMonth >= 1 &&
      +expMonth <= 12 &&
      +expYear >= currentYear &&
      (+expYear !== currentYear || +expMonth >= currentMonth);

    if (!isValidFormat) {
      alert('Please enter a valid expiration date in MM/YY format.');
      return;
    }

    const formData: PaymentCardFormData = {
      name: name,
      cardNumber: cardNumber,
      expDate: expDate,
      cvc: cvc,
      saveCard: saveCard,
      email: email,
    };

    onSaveCard(formData);

    setName('');
    setNameTouched(false);
    setCardNumber('');
    setExpDate('');
    setCVC('');
    setSaveCard(false);
    setEmail('');
  };

  const handleNameBlur = () => {
    setNameTouched(true);
  };

  const isNameValid = () => {
    return name.trim() !== '';
  };

  return (
    <div className={styles.paymentCardFormContainer}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
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
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={styles.cardInput}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Exp Date:</label>
          <input
            type="text"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            className={styles.cardInput}
            placeholder="MM/YY"
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.cvcLabel}>CVC:</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
            className={`${styles.cardInput} ${styles.small}`}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.cardInput}
          />
        </div>
        <div className={styles.inputField}>
          <label>
            <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
            Save my card for future payments
          </label>
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentCardForm;
