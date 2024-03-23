import React, { useState } from 'react';
import classes from './CartModal.module.scss';

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
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10.00, quantity: 1 },
        { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 15.00, quantity: 1 },
        { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 20.00, quantity: 1 },
        { id: 4, name: 'Product 4', description: 'Description of Product 4', price: 5.00, quantity: 1 },
        { id: 5, name: 'Product 5', description: 'Description of Product 5', price: 8.00, quantity: 1 },
        { id: 6, name: 'Product 6', description: 'Description of Product 6', price: 20.99, quantity: 1 },
    ]);

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const increaseQuantity = (productId: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const decreaseQuantity = (productId: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
            )
        );
    };

    // Calculate subtotal and total price
    const subtotal = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    return (
        <div className={`${classes.overlay} ${classes.open}`} onClick={closeModal}>
            <div className={`${classes.cartModal} ${classes.open}`} onClick={stopPropagation}>
                <div className={classes.cartModal__header}>
                    <h2>Your Shopping Cart</h2>
                    {/* Close icon */}
                    <div className={classes.cartModal__closeBtn} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/>
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
                                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => increaseQuantity(product.id)}>+</button>
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
                        <button className={classes.cartModal__checkoutBtn}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
