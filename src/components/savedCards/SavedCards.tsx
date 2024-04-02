import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs'; // Import the edit icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './SavedCardsComponent.scss'; // Import SCSS file

// Define the CardType interface
interface CardType {
    id: number;
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvc: number;
    email: string;
}

// Define the props interface for SavedCards component
interface SavedCardProps {
    stripeCards: CardType[]; // Array of saved cards
    showCardDetails: (cardData: CardType) => void;
    payWithSavedCard: (cardData: CardType) => void;
    setCardDetails: React.Dispatch<React.SetStateAction<boolean>>;
    setCardDetailsId: React.Dispatch<React.SetStateAction<number>>;
    navigateToEditCard: () => void;
}

// SavedCards component
const SavedCards: React.FC<SavedCardProps> = ({
    stripeCards,
    showCardDetails,
    payWithSavedCard,
    setCardDetails,
    setCardDetailsId,
    navigateToEditCard,
}) => {
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleCardSelection = (cardId: number) => {
        setSelectedCardId(cardId);
    };

    // Function to determine card type
    const getCardType = (cardNumber: string): string => {
        // Card type detection logic based on card number prefix
        if (/^4/.test(cardNumber)) {
            return 'visa';
        } else if (/^5[1-5]/.test(cardNumber)) {
            return 'mastercard';
        } else if (/^3[47]/.test(cardNumber)) {
            return 'american-express';
        } else {
            return 'unknown';
        }
    };

    // Sample card data
    const sampleCards: CardType[] = [
        {
            id: 1,
            card_number: "1234 5678 9012 3456",
            exp_month: 12,
            exp_year: 2024,
            cvc: 123,
            email: "example@example.com",
        },
        {
            id: 2,
            card_number: "5105 1051 0510 5100",
            exp_month: 11,
            exp_year: 2023,
            cvc: 456,
            email: "sample@example.com",
        },
        {
            id: 3,
            card_number: "3714 496353 98431",
            exp_month: 10,
            exp_year: 2025,
            cvc: 789,
            email: "test@example.com",
        },
    ];

    const handlePayWithSavedCard = (cardData: CardType) => {
        // Call the payWithSavedCard function with the card data
        payWithSavedCard(cardData);
        // Navigate to the '/summary' page
        navigate('/summary');
    };

    return (
        <div className="saved-cards-container">
            <h5 className="saved-cards-heading">Saved card</h5>
            {stripeCards.length > 0 ? (
                stripeCards.map((cardData: CardType) => (
                    <div key={cardData.id} className={`saved-card-item ${getCardType(cardData.card_number)} ${selectedCardId === cardData.id ? 'selected' : ''}`}>
                        <div className="saved-card-details">
                            <p><b>Card Type:</b> {getCardType(cardData.card_number)}</p>
                            <p><b>Card Number:</b> {cardData.card_number.slice(0, 4)} XXXX XXXX {cardData.card_number.slice(12, 16)}</p>
                            <div className="card-buttons">
                                <button
                                    onClick={() => {
                                        setCardDetails(true);
                                        setCardDetailsId(cardData.id);
                                        handleCardSelection(cardData.id);
                                    }}
                                    className="card-button"
                                >
                                    Show Card Details
                                </button>
                                <button
                                    onClick={() => payWithSavedCard(cardData)}
                                    className={`card-button ${selectedCardId === cardData.id ? 'active' : ''}`}
                                    disabled={!selectedCardId}
                                >
                                    Pay with this Card
                                </button>
                                <span onClick={navigateToEditCard} className="edit-card-button">
                                    <BsPencil className="edit-card-icon" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    {/* Display sample cards when no saved cards available */}
                    {sampleCards.map((sampleCard: CardType) => (
                        <div key={sampleCard.id} className={`saved-card-item ${getCardType(sampleCard.card_number)}`}>
                            <div className="saved-card-details">
                                <p><b>Card Type:</b> {getCardType(sampleCard.card_number)}</p>
                                <p><b>Card Number:</b> {sampleCard.card_number.slice(0, 4)} XXXX XXXX {sampleCard.card_number.slice(12, 16)}</p>
                                <div className="card-buttons">
                                    <button className="card-button" onClick={() => showCardDetails(sampleCard)}>
                                        Show Card Details
                                    </button>
                                    <button className="card-button" onClick={() => handlePayWithSavedCard(sampleCard)} disabled={!sampleCard.id}>
                                        Pay with this Card
                                    </button>
                                    <span className="edit-card-button" onClick={navigateToEditCard}>
                                        <BsPencil className="edit-card-icon" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default SavedCards;
