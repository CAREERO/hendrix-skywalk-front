import React, { useState, useEffect } from 'react';
import './Shop.scss'; // Import the SCSS file
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { useCart } from '../../components/Shop/CartContext';
import Product from '../../services/Product';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { addToCart } = useCart(); // Use the addToCart function from the useCart hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_TARGET}/api/products/`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <Header />
      <div className='shop-continer'>
        <h2 className='shop-header-label'>Merch</h2>
        <div className="product-items">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)} // Pass the product to addToCart
            />
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
