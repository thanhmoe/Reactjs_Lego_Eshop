import React, { useState } from "react";
import "./cart.css";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Lego Cole",
            price: 299.99,
            quantity: 1,
            image: "path_to_image.png"
        }
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };
    console.log(cartItems.length);
    return (
        <>
            {cartItems.length === 0
                ? <p>Your cart looks lonely. Why not add something fun?</p>
                :
                <div className="shopping-cart">
                    <div className="cart-header">
                        <h1>Shopping cart</h1>
                        <div className="breadcrumb">Home &gt;Shopping cart</div>
                    </div>
                    <div className="free-shipping-message">
                        <span>Congratulations you've qualified for free shipping!</span>
                    </div>
                    <div className="cart-body">
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h2>{item.name}</h2>
                                        <div className="quantity-control">
                                            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </div>
                                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                    </div>
                                    <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        <div className="order-summary">
                            <h2>Order summary</h2>
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Item(s) subtotal</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estimated tax</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="summary-total">
                                <span>Estimated total</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <button className="checkout-button">Log in to checkout</button>
                            <div className="payment-methods">
                                <img src="visa.png" alt="Visa" />
                                <img src="mastercard.png" alt="Mastercard" />
                                <img src="applepay.png" alt="Apple Pay" />
                                <img src="googlepay.png" alt="Google Pay" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CartComponent;