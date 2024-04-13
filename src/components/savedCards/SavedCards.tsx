import React from 'react';
import { BsPencil } from 'react-icons/bs'; // Import the edit icon from react-icons
import './SavedCardsComponent.scss'; // Import SCSS file

interface CardType {
    id: number;
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvc: number;
    email: string;
}

interface SavedCardProps {
    stripeCards: CardType[];
    showCardDetails: (cardData: CardType) => void;
    payWithSavedCard: (cardData: CardType) => void;
    setCardDetails: React.Dispatch<React.SetStateAction<boolean>>;
    setCardDetailsId: React.Dispatch<React.SetStateAction<number>>;
    navigateToEditCard: () => void;
}

const SavedCards: React.FC<SavedCardProps> = ({
    stripeCards,
    showCardDetails,
    payWithSavedCard,
    setCardDetails,
    setCardDetailsId,
    navigateToEditCard,
}) => {

    return (
        <div className="saved-cards-container">
            <h5 className="saved-cards-heading">Saved card</h5>
            {stripeCards.length > 0 ? (
                stripeCards.map((cardData: CardType) => (
                    <div key={cardData.id} className="saved-card-item">
                        <div className="saved-card-details">
                            <p><b>Card Number:</b> XXXX XXXX XXXX {cardData.card_number.slice(12, 18)}</p>
                            <div className="card-buttons">
                                <button
                                    onClick={() => {
                                        setCardDetails(true);
                                        setCardDetailsId(cardData.id);
                                    }}
                                    className="card-button"
                                >
                                    Show Card Details
                                </button>
                                <button
                                    onClick={() => payWithSavedCard(cardData)}
                                    className="card-button"
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
                <p>No saved card.</p>
            )}
        </div>
    );
};

export default SavedCards;
