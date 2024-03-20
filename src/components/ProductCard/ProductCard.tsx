import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  addToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the Link from handling the click event
    addToCart(product.id); // Pass the product ID to addToCart function
  };

  return (
    <div
      className={`product-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/api/product/${product.id}`}>
        <img className="product-image" src={`${process.env.REACT_APP_API_TARGET}${product.image}`} alt={`Product ${product.id}`} />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p>${product.price}</p>
        </div>
      </Link>
      {isHovered && (
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
