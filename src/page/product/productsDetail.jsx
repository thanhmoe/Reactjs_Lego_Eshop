import React, { useEffect, useState } from "react";
import './productsDetail.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail, selectProductDetail, selectProductDetailStatus, selectProductDetailError } from "../../redux/slice/products/productsSlice.js";
import LoadingModal from "../../modal/loadingModal.jsx";
import CartIcon from '/src/assets/icons/cart.svg?react';
import { Image, message, InputNumber, Breadcrumb } from "antd";

export default function ProductsDetail() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(selectProductDetail);
    const productDetailStatus = useSelector(selectProductDetailStatus);
    const productDetailError = useSelector(selectProductDetailError);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProductDetail(productId));
    }, []);
    // const imageUrl = `${IMAGE_BASE_URL}${product.image_path}`;
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity > product.quantity) {
            message.error(`Only ${product.quantity} available in stock.`);
            setQuantity(product.quantity);
        } else {
            setQuantity(newQuantity);
        }
    };
    const incrementQuantity = () => {
        handleQuantityChange(quantity + 1);
    };

    const decrementQuantity = () => {
        handleQuantityChange(quantity - 1);
    };

    return (
        <>
            {!product
                ? <LoadingModal />
                : <div className="product-detail-container">
                    <div className="detail-container">
                        <div className="productsDetail">
                            <div className="leftInfo">
                                <Image src={product.image_path} />
                            </div>
                            <div className="detailInfo">
                                <div className="category-detail">
                                    {product.categories.map((category, index) => (
                                        <span key={category.id} className="category">
                                            {index !== 0 && <span className="category-separator">|</span>}
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="productName">{product.name}</h3>
                                {/* <p className="description">Description: {product.introduce}</p> */}
                                <p className="price">${product.price}</p>
                                <div className="product-control">
                                    <div className="quantity-selector">
                                        <button onClick={decrementQuantity} className="quantity-button">-</button>
                                        <div className="quantity-input-div">
                                            <input className="quantity-input"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            />
                                        </div>
                                        <button onClick={incrementQuantity} className="quantity-button">+</button>
                                    </div>
                                    <button className="btn-buy"><CartIcon />Add to cart</button>
                                </div>
                                <p className="addinfor">This item will be shipped to your address.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}