import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsOnCart, updateProductQuantity } from "../../services/cart_serviced";
import { getProvinces, getDistricts, getWards } from "../../services/address_services";
import TopSellingProducts from "../../components/TopSellingProducts";
import { Breadcrumb, Alert, Button, Image } from "antd";
import { faCcApplePay, faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckoutModal from "./components/CheckoutModal";
import AddAddressModal from "./components/AddAddressModal";
import "./cart.css";

const CartComponent = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phonenumber: '',
        province: '',
        district: '',
        ward: '',
        detail: ''
    });

    const getProducts = async () => {
        try {
            const res = await getProductsOnCart();
            if (res.success) {
                setCartItems(res.cart);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const getAddresses = async () => {
        try {
            const res = await getCustomerAddresses();
            if (res.success) {
                setAddresses(res.addresses);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchProvinces = async () => {
        try {
            const res = await getProvinces();
            setProvinces(res.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const res = await getDistricts(provinceId);
            setDistricts(res.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const res = await getWards(districtId);
            setWards(res.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleQuantityChange = async (id, increase) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateProductQuantity({
                productId: id,
                increase: increase
            });
            if (res.success) {
                await getProducts();
            } else {
                setError(res.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityDecrease = (id) => {
        handleQuantityChange(id, 0);
    };

    const handleQuantityIncrease = (id) => {
        handleQuantityChange(id, 1);
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

    const handleAddNewAddress = async () => {
        try {
            const res = await addNewAddress(newAddress);
            if (res.success) {
                setIsAddAddressModalOpen(false);
                getAddresses();
            } else {
                setError(res.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleProvinceChange = (value) => {
        setNewAddress({ ...newAddress, province: value });
        fetchDistricts(value);
    };

    const handleDistrictChange = (value) => {
        setNewAddress({ ...newAddress, district: value });
        fetchWards(value);
    };

    const handleWardChange = (value) => {
        setNewAddress({ ...newAddress, ward: value });
    };

    const handleDetailChange = (e) => {
        setNewAddress({ ...newAddress, detail: e.target.value });
    };

    const handleNameChange = (e) => {
        setNewAddress({ ...newAddress, name: e.target.value });
    };

    const handlePhoneNumberChange = (e) => {
        setNewAddress({ ...newAddress, phonenumber: e.target.value });
    };

    useEffect(() => {
        getProducts();
        fetchProvinces();
        getAddresses();
    }, []);

    return (
        <>
            {cartItems.length === 0
                ? <div>
                    <div className="no-product-label">
                        <FontAwesomeIcon icon={faCartPlus} size="2x" color="black" />
                        <p>Your cart looks lonely. Why not add something fun?</p>
                    </div>
                    <TopSellingProducts />
                </div>
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
                                    <p className="product-name">{item.name}</p>
                                    <div className="cart-item-details">
                                        <div className="quantity-selector">
                                            <button className="quantity-button quantity-button-decrement"
                                                onClick={() => handleQuantityDecrease(item.id)} disabled={loading}>-</button>
                                            <div className="quantity-input-div">
                                                <input className="quantity-input" value={item.quantity} readOnly></input>
                                            </div>
                                            <button className="quantity-button quantity-button-increment"
                                                disabled={(item.quantity >= item.in_stock) || loading} onClick={() => handleQuantityIncrease(item.id)}>+</button>
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
                            <button onClick={() => setIsModalOpen(true)} className="checkout-button">Checkout</button>
                            <div className="payment-methods">
                                <FontAwesomeIcon icon={faCreditCard} size="2x" />
                                <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                                <FontAwesomeIcon icon={faCcApplePay} size="2x" />
                                <FontAwesomeIcon icon={faMoneyBill} size="2x" />
                            </div>
                        </div>
                    </div>

                    <CheckoutModal
                        isOpen={isModalOpen}
                        addresses={addresses}
                        selectedAddress={selectedAddress}
                        onAddressSelect={setSelectedAddress}
                        onClose={() => setIsModalOpen(false)}
                        onAddNewAddress={() => setIsAddAddressModalOpen(true)}
                    />

                    <AddAddressModal
                        isOpen={isAddAddressModalOpen}
                        provinces={provinces}
                        districts={districts}
                        wards={wards}
                        newAddress={newAddress}
                        onProvinceChange={handleProvinceChange}
                        onDistrictChange={handleDistrictChange}
                        onWardChange={handleWardChange}
                        onDetailChange={handleDetailChange}
                        onNameChange={handleNameChange}
                        onPhoneNumberChange={handlePhoneNumberChange}
                        onSave={handleAddNewAddress}
                        onClose={() => setIsAddAddressModalOpen(false)}
                    />
                </div>
            }
        </>
    );
};

export default CartComponent;