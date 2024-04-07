import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './SavedCardsComponent.scss';

export interface CardType {
    id: number;
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvc: number;
    email: string;
}

interface SavedCardsProps {
    stripeCards: CardType[];
    setStripeCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    showCardDetails: (cardData: CardType) => void;
    payWithSavedCard: (cardData: CardType) => void;
    setCardDetails: (value: boolean) => void; 
    setCardDetailsId: (id: number) => void;
    navigateToEditCard: () => void;
}

const SavedCardsComponent: React.FC<SavedCardsProps> = ({
    stripeCards,
    showCardDetails,
    payWithSavedCard,
    setCardDetails,
    setCardDetailsId,
    navigateToEditCard,
    setStripeCards,
}) => {
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleCardSelection = (cardId: number) => {
        setSelectedCardId(cardId);
    };

    // Function to determine card type based on card number
    const getCardType = (cardNumber: string): string => {
        if (/^4/.test(cardNumber)) {
            return 'Visa';
        } else if (/^5[1-5]/.test(cardNumber)) {
            return 'Mastercard';
        } else if (/^3[47]/.test(cardNumber)) {
            return 'American Express';
        } else {
            return 'Unknown';
        }
    };

    // Handle payment with saved card and navigate to summary page
    const handlePayWithSavedCard = (cardData: CardType) => {
        payWithSavedCard(cardData);
        navigate('/summary');
    };

    return (
        <div className="saved-cards-container">
            <h5 className="saved-cards-heading">Saved Cards</h5>
            {stripeCards.length > 0 ? (
                stripeCards.map((cardData: CardType) => (
                    <div key={cardData.id} className={`saved-card-item ${selectedCardId === cardData.id ? 'selected' : ''}`}>
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
                                    onClick={() => handlePayWithSavedCard(cardData)}
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
                <p>No saved cards</p>
            )}
        </div>
    );
};

export default SavedCardsComponent;
