import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import styles from "../PaymentCardForm/PaymentCardForm.module.scss";

interface PaymentCardFormProps {
  onSaveCard: (formData: FormData) => void;
  showCardDetails?: () => void;
  payWithSavedCard: () => void;
  setCardDetails: () => void;
  setCardDetailsId: () => void;
  navigateToEditCard: () => void;
  stripeCards?: any[];
}

interface FormData {
  name: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  saveCard: boolean;
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
  onSaveCard,
  showCardDetails,
  payWithSavedCard,
  setCardDetails,
  setCardDetailsId,
  navigateToEditCard,
}) => {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCVC] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic form validation
    if (name.trim() === "") {
      setNameTouched(true);
      return;
    }

    if (cardNumber.trim() === "" || !/\b\d{16}\b/.test(cardNumber.trim())) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    if (expMonth.trim() === "" || !/^(0?[1-9]|1[012])$/.test(expMonth.trim())) {
      alert("Please enter a valid expiration month (MM).");
      return;
    }

    if (expYear.trim() === "" || !/^\d{2}$/.test(expYear.trim())) {
      alert("Please enter a valid expiration year (YY).");
      return;
    }

    if (cvc.trim() === "" || !/^\d{3}$/.test(cvc.trim())) {
      alert("Please enter a valid 3-digit CVC.");
      return;
    }

    const formData: FormData = {
      name,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      saveCard,
    };

    onSaveCard(formData);

    setName("");
    setNameTouched(false);
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setCVC("");
    setSaveCard(false);
  };

  const handleNameBlur = () => {
    setNameTouched(true);
  };

  const isNameValid = () => {
    return name.trim() !== "";
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
            Card Number:
            <div className={styles.iconInput}>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={styles.cardInput}
              />
              <FaLock className={styles.icon} />
            </div>
          </label>
        </div>
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Exp Month:</label>
          <input
            type="text"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            className={styles.cardInput}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.cardLabel}>Exp Year:</label>
          <input
            type="text"
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
            className={styles.cardInput}
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
