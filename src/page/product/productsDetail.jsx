// File path: /src/pages/products/ProductsDetail.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingModal from "../../modal/loadingModal.jsx";
import TopSellingProducts from "../../components/TopSellingProducts.jsx";
import RelatedProducts from "./component/relatedToProduct.jsx";

import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail, selectProductDetail, selectProductDetailError, selectProductDetailStatus } from "../../redux/slice/products/productsSlice.js";
import { addProductToCart } from "../../services/cart_serviced.js";
import { getTotalProductInCart } from "../../redux/slice/carts/cartsSlice.js";

import './productsDetail.css';
import CartIcon from '/src/assets/icons/cart.svg?react';

import { Image, Skeleton, message, Breadcrumb, Drawer, Empty, FloatButton, Result, Button, Flex } from "antd";
import { notify } from "../../main.jsx";
import { getToken } from "../../utils/token_utils.js";

export default function ProductsDetail() {
    const { t } = useTranslation(['product', 'common']);

    const { productId } = useParams();
    const token = getToken();
    const [currentPage, setCurrentPage] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const itemsPerPage = 10; // Define the number of items per page
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const product = useSelector(selectProductDetail);
    const productDetailStatus = useSelector(selectProductDetailStatus);
    const productDetailError = useSelector(selectProductDetailError);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/cart');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity <= product.quantity) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!token) {
            navigate('/login');
            notify('info', t('Login_to_continues_shopping'));
        }
        if (!product || quantity < 1 || quantity > product.quantity) {
            message.error('Invalid quantity selected.');
            return;
        }
        try {
            const result = await addProductToCart({
                product: productId,
                quantity: quantity
            });
            if (result.success) {
                dispatch(getTotalProductInCart());
                showModal();
            }
        } catch (error) {
            message.error('An error occurred while adding product to cart');
        }
    };

    const incrementQuantity = () => {
        handleQuantityChange(quantity + 1);
    };

    const decrementQuantity = () => {
        handleQuantityChange(quantity - 1);
    };

    useEffect(() => {
        dispatch(fetchProductDetail(productId));
        window.scrollTo(0, 0);
    }, [productId, dispatch]);

    if (productDetailStatus === 'loading') {
        return <Skeleton active />;
    }

    if (productDetailStatus === 'failed') {
        return (
            <Flex gap="middle" vertical>
                <Result
                    status="404"
                    title="404"
                    subTitle={t('Products_Not_Exist')}
                    extra={<Button onClick={() => navigate('/products')} type="primary">{t('Back_Product')}</Button>}
                />
                <TopSellingProducts />
            </Flex>
        )
    }

    if (!product || productDetailStatus !== 'succeeded') {
        return <Empty />;
    }

    return (
        <>
            <div className="product-detail-container">
                <div className="detail-container">
                    <div className="productsDetail">
                        <div className="leftInfo">
                            <div className="breadcrumb-product">
                                <Breadcrumb>
                                    <Breadcrumb.Item onClick={() => navigate('/')}>{t('Home', { ns: 'common' })}</Breadcrumb.Item>
                                    <Breadcrumb.Item onClick={() => navigate('/products')}>{t('Products', { ns: 'common' })}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
                                <Image src={product.image_path} />
                            </div>
                        </div>
                        <div className="detailInfo">
                            <div className="category-detail">
                                {product.categories && product.categories.map((category, index) => (
                                    <span key={category.id} className="category">
                                        {index !== 0 && <span className="category-separator">|</span>}
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                            <h3 className="productName">{product.name}</h3>
                            <p className={`price ${(product.quantity === 0) ? `soldout` : ''}`}>${product.price}</p>
                            {product.quantity === 0
                                ?
                                <div>
                                    <button className="btn-soldout" disabled>{t('Sold_Out_Btn')}</button>
                                    <p className="addinfor">{t('Sold_Out_info')}</p>
                                </div>
                                :
                                <div>
                                    <div className="product-control">
                                        <div className="quantity-selector">
                                            <button onClick={decrementQuantity} disabled={quantity <= 1} className="quantity-button quantity-button-decrement">-</button>
                                            <div className="quantity-input-div">
                                                <input className="quantity-input"
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                                />
                                            </div>
                                            <button onClick={incrementQuantity} disabled={quantity >= product.quantity} className="quantity-button quantity-button-increment">+</button>
                                        </div>
                                        <button onClick={() => handleAddToCart(productId)} className="btn-buy"><CartIcon />{t("Add_To_Cart")}</button>
                                    </div>
                                    <p className="addinfor">{t('Shipping_Label')}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="product-detail-description">
                    <h2>{t("Product_Information")}</h2>
                    <h3 className="productName">{product.name}</h3>
                    <p>Brand: Lego</p>
                    {product.categories && product.categories.map((category) => (
                        <p key={category.id} className="category">
                            {category.name}
                        </p>
                    ))}
                    <p>{product.description}</p>
                </div>
                <RelatedProducts productId={productId} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                <div>
                    <TopSellingProducts />
                </div>
                <Drawer title={t("Added_To_Cart")} onClose={handleCancel} open={isModalOpen}>
                    <Image src={product.image_path} />
                    <p>{product.name}</p>
                    <p>qty:{quantity}</p>
                    <p>${product.price}</p>
                    <div className="product-control-cart">
                        <button onClick={() => handleOk()} className="btn-buy">{t("View_Cart_And_Checkout")}</button>
                        <button onClick={() => handleCancel()} className="btn-continue">{t("Continue_Shopping")}</button>
                    </div>
                </Drawer>
                <FloatButton.BackTop />
            </div>
        </>
    );
}
