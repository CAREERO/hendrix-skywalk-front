import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './productCard.scss';

interface Product {
  id: number;
  name: string;
  image: string;
  description?: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleProductClick = () => {
    navigate(`/api/product/${product.id}`); // Use navigate to navigate
  };

  return (
    <div
      className={`product-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick} // Call handleProductClick on click
    >
      <img className="product-image" src={`${process.env.REACT_APP_API_BASE_PROD}${product.image}`} alt={`Product ${product.id}`} />
      <div className="product-details">
        <h3>{product.name}</h3>{/*  */}
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
