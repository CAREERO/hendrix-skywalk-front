import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Link to={`/api/product/${product.id}`} className={`product-item ${isHovered ? 'hovered' : ''}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className="product-image" src={`${process.env.REACT_APP_API_TARGET}${product.image}`} alt={`Product ${product.id}`} />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p>${product.price}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
