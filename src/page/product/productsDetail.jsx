import React, { useEffect, useState } from "react";
import './productsDetail.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingModal from "../../modal/loadingModal.jsx";
import CartIcon from '/src/assets/icons/cart.svg?react';
import { Image } from "antd";
//mock api
import { selectProducts, selectLoadingState, fetchMockProduct } from "../../redux/slice/products/productMockSlice.js";

//for actual API
// import { selectProducts, selectLoadingState } from "../../redux/slice/products/productsSlice.js";
// const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductsDetail() {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [thisProduct, setThisProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Local loading state


    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchMockProduct())
        };
    }, []);
    return (
        <>
            {/* {loading || !thisProduct ? (
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
            )} */}
            {products.length === 0
                ? <LoadingModal />
                :
                <div className="product-detail-container">
                    <div className="detail-container">
                        <div className="productsDetail">
                            <div className="leftInfo">
                                <Image src={thisProduct.image} />
                            </div>
                            <div className="comment-component">
                                <input className='inputCmt' placeholder="write comment here"></input>
                                <button className="btn-cmt"> Submit</button>
                                <div className="detailInfo">
                                    <h3 className="productName">{thisProduct.name_product}</h3>
                                    <p>Description:{thisProduct.introduce}</p>
                                    <div className="product-detail-button">
                                        <button className="btn-buy"><CartIcon /> Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment">
                            <h3>
                                Comment
                            </h3>
                            <div  >
                                {listComment.map(comment => (
                                    <ul className="commented" key={comment.id}>
                                        <li><CommentOutlined />
                                            <p>{comment.text}</p>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                            <div className="comment-component">
                                <input className='inputCmt' placeholder="write comment here"></input>
                                <button className="btn-cmt"> Submit</button>
                            </div>
                        </div>
                    </div>
            }
                </>
    );
}
