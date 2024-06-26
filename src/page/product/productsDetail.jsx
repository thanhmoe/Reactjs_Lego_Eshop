import React, { useEffect, useState } from "react";
import './productsDetail.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts, fetchProduct, selectLoadingState } from "../../redux/slice/products/productsSlice.js";
import LoadingModal from "../../modal/loadingModal.jsx";
import CartIcon from '/src/assets/icons/cart.svg?react';
import { Image } from "antd";
const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductsDetail() {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [thisProduct, setThisProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Local loading state

    useEffect(() => {
        const fetchData = async () => {
            if (products.length === 0) {
                dispatch(fetchProduct());
            }
            const foundProduct = products.find(p => p.id === productId);
            setThisProduct(foundProduct);
            setLoading(false);
        };
        fetchData();
    }, [productId]);

    console.log(products, 'out hehehehe');
    console.log(thisProduct, 'this product after hhehehe');

    return (
        <>
            {loading || !thisProduct ? (
                <LoadingModal />
            ) : (
                <div className="product-detail-container">
                    <div className="detail-container">
                        <div className="productsDetail">
                            <div className="leftInfo">
                                <Image src={`${IMAGE_BASE_URL}${thisProduct.image_path}`} alt={thisProduct.name} />
                            </div>
                            <div className="detailInfo">
                                <h3 className="productName">{thisProduct.name}</h3>
                                <div className="product-detail-button">
                                    <button className="btn-buy">
                                        <CartIcon /> Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
