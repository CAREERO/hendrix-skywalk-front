import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CartModal.module.scss';
import axios from 'axios';

interface Product {
    id: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        image: string;
        quantity: number;
    };
    quantity: number;
    total_price: number;
    created_at: string;
}

interface CartModalProps {
    closeModal: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ closeModal }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/cart/items/');
                console.log('Response data:', response.data); // Log response data
                // Check if products array is empty
                if (response.data.length === 0) {
                    console.log('No items in cart');
                }
                setProducts(response.data);

                // Calculate subtotal based on fetched product data
                const total = response.data.reduce((acc: number, curr: Product) => {
                    return acc + curr.total_price * curr.quantity;
                }, 0);
                setSubtotal(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);


    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    // Function to handle checkout
    const handleCheckout = () => {
        navigate('/checkout');
    };

    // Function to handle quantity change
    const handleQuantityChange = async (productId: number, newQuantity: number) => {
        try {
            // Ensure new quantity is non-negative
            if (newQuantity < 0) {
                return;
            }

            // Update local state immediately
            const updatedProducts = products.map(product =>
                product.id === productId ? { ...product, quantity: newQuantity } : product
            );
            setProducts(updatedProducts);

            // Send PUT request to update quantity on the server
            await axios.put(`http://localhost:8000/cart/items/update/${productId}/`, { quantity: newQuantity });
            // Rest of the code...
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    // Function to handle removing item from cart
    const handleRemoveItem = async (productId: number) => {
        try {
            await axios.delete(`http://localhost:8000/cart/item/remove/${productId}/`);
            const removedProduct = products.find(product => product.id === productId);
            if (removedProduct) {
                const updatedProducts = products.filter(product => product.id !== productId);
                setProducts(updatedProducts);
                setSubtotal(prevSubtotal => prevSubtotal - removedProduct.quantity * removedProduct.total_price);
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    return (
        <div className={`${classes.overlay} ${classes.open}`} onClick={closeModal}>
            <div className={`${classes.cartModal} ${classes.open}`} onClick={stopPropagation}>
                <div className={classes.cartModal__header}>
                    <h2>Your Shopping Cart</h2>
                    <div className={classes.cartModal__closeBtn} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" />
                        </svg>
                    </div>
                </div>
                <div className={classes.cartModal__content}>
                    {products.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <div className={classes.cartModal__productList}>
                        {products.map(item => (
                            <div className={classes.cartModal__product} key={item.id}>
                                <img src={`${item.product.image}`} alt="" className={classes.cartModal__productImage} />
                                <div className={classes.cartModal__productDetails}>
                                    {/* Display the product name */}
                                    <h3 className={classes.productName}>{item.product.name}</h3>
                                    <div className={classes.cartModal__quantity}>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className={classes.cartModal__removeBtn} onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                                <div className={classes.cartModal__productPrice}>
                                    {/* Display the total price */}
                                    ${(item.total_price).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    )}
                </div>
                <textarea
                    className={classes.cartModal__notes}
                    placeholder="Add a note to your order"
                />
                <div className={classes.cartModal__total}>
                    <div className={classes.cartModal__subtotal}>
                        <p>Subtotal:</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className={classes.cartModal__checkout}>
                        <div className={classes.cartModal__shippingInfo}>
                            Shipping & taxes calculated at checkout
                        </div>
                        <button className={classes.cartModal__checkoutBtn} onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
