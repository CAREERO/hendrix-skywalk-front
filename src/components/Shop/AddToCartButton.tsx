import React from 'react';

interface AddToCartButtonProps {
  itemId: number;
  quantity: number;
  addToCart: (itemId: number, quantity: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemId, quantity, addToCart }) => {
  const handleClick = () => {
    addToCart(itemId, quantity);
  };

  return (
    <button onClick={handleClick}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
