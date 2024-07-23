import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProductsOnCart, updateProductQuantity, removeItemsFromCart } from "../../services/cart_serviced";
import { getProvinces, getDistricts, getWards } from "../../services/address_services";
import { createAddress, getCustomerAddress } from "../../services/customer_services";
import { createOrders } from "../../services/orders";

import TopSellingProducts from "../../components/TopSellingProducts";

import { getTotalProductInCart } from "../../redux/slice/carts/cartsSlice";
import { useSelector, useDispatch } from "react-redux";

import { notify } from "../../main";

import { Breadcrumb, Alert, Button, Image, FloatButton, Popconfirm, Result } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';

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
    const dispatch = useDispatch();
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone_number: '',
        province: '',
        district: '',
        ward: '',
        detail: ''
    });
    const [note, setNote] = useState(''); // Add note state

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
            const res = await getCustomerAddress();
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
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityDecrease = async (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item.quantity === 1) {
            await handleRemoveItem(id);
        } else {
            handleQuantityChange(id, 0);
        }
    };

    const handleQuantityIncrease = (id) => {
        handleQuantityChange(id, 1);
    };

    const handleRemoveItem = async (id) => {
        const res = await removeItemsFromCart(id)
        if (res.success) {
            getProducts()
            dispatch(getTotalProductInCart());
        }
    };

    const calculateItemTotal = (item) => {
        return (item.price * item.quantity).toFixed(2);
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleAddNewAddress = async () => {
        try {
            const res = await createAddress(newAddress);
            if (res.success) {
                setIsAddAddressModalOpen(false);
                getAddresses();
                notify('success', 'New Address Added!')
            } else {
                setError(res.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (name, value) => {
        setNewAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));

        if (name === 'province') {
            const selectedProvince = provinces.find(province => province.id === value);
            setNewAddress(prevAddress => ({ ...prevAddress, province: selectedProvince.name }));
            fetchDistricts(value);
        } else if (name === 'district') {
            const selectedDistrict = districts.find(district => district.id === value);
            setNewAddress(prevAddress => ({ ...prevAddress, district: selectedDistrict.name }));
            fetchWards(value);
        } else if (name === 'ward') {
            const selectedWard = wards.find(ward => ward.id === value);
            setNewAddress(prevAddress => ({ ...prevAddress, ward: selectedWard.name }));
        }
    };

    const onCheckout = async () => {
        const orderData = {
            address: selectedAddress,
            cart_items: cartItems.map(item => item.id),
            note: note
        };

        try {
            const res = await createOrders(orderData);
            if (res.success) {
                notify('success', 'Order placed successfully!');
                setCartItems([]);
                setIsModalOpen(false);
                dispatch(getTotalProductInCart());
                getProducts();
                navigate('/orders')
            } else {
                notify('error', res.message)
            }
        } catch (error) {
            notify(error.message);
        }
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
                    <Result
                        icon={<ShoppingCartOutlined style={{ color: '#484848' }} />}
                        title="Your cart look lonely, Why not add something fun?"
                        extra={<Button onClick={() => navigate('/products')} type="primary">Go Shopping</Button>}
                    />
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
                                    <p className="cart-product-name">{item.name}</p>
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
                                        <Popconfirm
                                            title="Remove the products"
                                            description="Are you sure to remove this products from cart?"
                                            onConfirm={() => handleRemoveItem(item.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                        {/* <Button onClick={() => handleRemoveItem(item.id)} danger>Remove</Button> */}
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
                            <p className="decs">Payment methods</p>
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
                        note={note}
                        onNoteChange={(e) => setNote(e.target.value)}
                        onSave={onCheckout}
                        onClose={() => setIsModalOpen(false)}
                        onCheckout={onCheckout}
                        onAddNewAddress={() => setIsAddAddressModalOpen(true)}
                    />

                    <AddAddressModal
                        isOpen={isAddAddressModalOpen}
                        provinces={provinces}
                        districts={districts}
                        wards={wards}
                        newAddress={newAddress}
                        onInputChange={handleInputChange}
                        onSave={handleAddNewAddress}
                        onClose={() => setIsAddAddressModalOpen(false)}
                    />
                    <FloatButton.BackTop />
                </div>
            }
        </>
    );
};

export default CartComponent;
