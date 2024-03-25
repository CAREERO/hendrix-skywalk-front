import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './ProductDetailsPage.scss';
import Footer from '../../components/common/Footer/Footer';
import Header from '../../components/common/Header/Header';
import Spinner from '../../components/common/Spinner/Spinner'; // Import the Spinner component

interface Product {
  id: number;
  name: string;
  image: string;
  description?: string;
  price: number;
  ratings: string;
  sizes: string[];
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to manage loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/product/${id}/`);
        setProduct(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      api
        .post('http://localhost:8000/cart/add/', {
          product_id: product.id,
          quantity: quantity
        })
        .then(response => {
          console.log('Product added to cart:', response.data);
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
    }
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  if (isLoading) {
    return <Spinner />; // Render Spinner component while loading
  }

  if (!product) {
    return <div>No product found.</div>; // Handle case where product is not found
  }

  return (
    <>
      <Header />
      <div className="product-details-container">
        <div className="product-images">
          <img src={`${product.image}`} alt={`Product ${product.id}`} className='productdetails-img' />
        </div>
        <div className="product-details">
          <h2 className="product-title">Title: {product.name}</h2>
          <p>Ratings: {product.ratings}</p>
          <p>Price: ${product.price}</p>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-buttons">
              <button onClick={decrementQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity}>+</button>
            </div>
          </div>
          <label htmlFor="size">Size:</label>
          <select id="size" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
            <option value="">Select Size</option>
            {product.sizes?.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <button onClick={handleAddToCart}>Add to Cart</button>
          <h3 className="product-description-title">Description:</h3>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
