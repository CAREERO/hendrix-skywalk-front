import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CartModal.module.scss';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
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
                const response = await axios.get('/api/cart/items/');
                setProducts(response.data);
                calculateSubtotal(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateSubtotal = (cartItems: Product[]) => {
        const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        setSubtotal(total);
    };

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className={`${classes.overlay} ${classes.open}`} onClick={closeModal}>
            <div className={`${classes.cartModal} ${classes.open}`} onClick={stopPropagation}>
                <div className={classes.cartModal__header}>
                    <h2>Your Shopping Cart</h2>
                    {/* Close icon */}
                    <div className={classes.cartModal__closeBtn} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" />
                        </svg>
                    </div>
                </div>
                <div className={classes.cartModal__content}>
                    {/* Product details */}
                    <div className={classes.cartModal__productList}>
                        {products.map(product => (
                            <div className={classes.cartModal__product} key={product.id}>
                                <img src="https://via.placeholder.com/50" alt="" className={classes.cartModal__productImage} />
                                <div className={classes.cartModal__productDetails}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <div className={classes.cartModal__quantity}>
                                        <button>-</button>
                                        <span>{product.quantity}</span>
                                        <button>+</button>
                                    </div>
                                    <button className={classes.cartModal__removeBtn}>Remove</button>
                                </div>
                                <div className={classes.cartModal__productPrice}>
                                    ${(product.price * product.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Notes input */}
                <textarea
                    className={classes.cartModal__notes}
                    placeholder="Add a note to your order"
                />
                {/* Total section */}
                <div className={classes.cartModal__total}>
                    <div className={classes.cartModal__subtotal}>
                        <p>Subtotal:</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className={classes.cartModal__checkout}>
                        <div className={classes.cartModal__shippingInfo}>
                            Shipping & taxes calculated at checkout
                        </div>
                        {/* Checkout button */}
                        <button className={classes.cartModal__checkoutBtn} onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
