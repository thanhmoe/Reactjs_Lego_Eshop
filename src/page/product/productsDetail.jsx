import React, { useEffect, useState } from "react";
import './productsDetail.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail, selectProductDetail, selectProductDetailStatus, selectProductDetailError } from "../../redux/slice/products/productsSlice.js";
import LoadingModal from "../../modal/loadingModal.jsx";
import CartIcon from '/src/assets/icons/cart.svg?react';
import { Image,Skeleton, message, InputNumber, Breadcrumb } from "antd";

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
  
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity <= product.quantity) {
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
                ? <Skeleton active/>
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
                                    <button className="btn-buy"><CartIcon />Add to cart</button>
                                </div>
                                <p className="addinfor">This item will be shipped to your address.</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail-description">
                    <h2>More Product Information!</h2>
                        <h3>{product.name}</h3>
                        <p>Brand: Lego</p>
                        {product.categories.map((category) => (
                                        <p key={category.id} className="category">
                                          {category.name}
                                        </p>
                                    ))}
                        <p>{product.description}</p>
                    </div>
                </div>
            }
        </>
    );
}