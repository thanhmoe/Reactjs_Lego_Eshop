import React, { useEffect, useState } from "react";
import { getProductsOnCart } from "../../services/cart_serviced";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Alert, Button, Image } from "antd";
import "./cart.css";
import { faCartPlus, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcApplePay, faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import TopSellingProducts from "../../components/TopSellingProducts";

const CartComponent = () => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const getProducts = async () => {
        try {
            const res = await getProductsOnCart()
            if (res.success) {
                setCartItems(res.cart)
            }
        } catch (error) {
            return error
        }
    }
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

    const calculateItemTotal = (item) => {
        return (item.price * item.quantity).toFixed(2);
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };


    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            {cartItems.length === 0
                ? <div>
                    <div className="no-product-label">
                        <FontAwesomeIcon icon={faCartPlus} size="2x" color="black" />
                        <p>Your cart looks lonely. Why not add something fun?</p>
                    </div>
                    <TopSellingProducts />
                </div >
                :
                <div className="shopping-cart">
                    <div className="cart-header">
                        <h2>Shopping cart</h2>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => navigate('/products')}>Products</Breadcrumb.Item>
                            <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="cart-body">
                        <div className="cart-items">
                            <div className="free-shipping-message">
                                <Alert style={{ width: '100%', margin: '2rem 0 2rem 0', textAlign: 'center' }} message="Congratulations you've qualified for free shipping!" type="info" />
                            </div>
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <Image style={{ width: '150px' }} src={item.image_path} alt={item.name} className="cart-item-image" />
                                    <h3 className="product-name">{item.name}</h3>
                                    <div className="cart-item-details">
                                        <div className="quantity-selector">
                                            <button className="quantity-button quantity-button-decrement"
                                                onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                            <div className="quantity-input-div">
                                                <input className="quantity-input" value={item.quantity}></input>
                                            </div>
                                            <button className="quantity-button quantity-button-increment"
                                                onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="remove-and-price">
                                        <span className="cart-item-price">${calculateItemTotal(item)}</span>
                                        <Button onClick={() => handleRemoveItem(item.id)} danger>Remove</Button>
                                    </div>
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
                            <button className="checkout-button">Checkout</button>
                            <div className="payment-methods">
                                <FontAwesomeIcon icon={faCreditCard} size="2x" />
                                <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                                <FontAwesomeIcon icon={faCcApplePay} size="2x" />
                                <FontAwesomeIcon icon={faMoneyBill} size="2x" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CartComponent;