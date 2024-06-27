import React, { useEffect, useState } from "react";
import './productsDetail.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentOutlined } from '@ant-design/icons';
import { fetchMockProduct, selectProducts } from "../../redux/slice/products/productMockSlice";
import LoadingModal from "../../modal/loadingModal.jsx";
import CartIcon from '/src/assets/icons/cart.svg?react';
import { Image, InputNumber } from "antd";

export default function ProductsDetail() {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const { productId } = useParams();
    const thisProduct = products.find(p => p.id === productId);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchMockProduct());
        }
    }, []);

    const [value, setValue] = useState('');
    const [listComment, setListComment] = useState([
        { id: 1, text: 'first comment here' },
        { id: 2, text: 'im a second' },
        { id: 3, text: 'im a third guys here' },
    ]);

    const onSubmit = () => {
        if (value) {
            const nextComment = { id: crypto.randomUUID(), text: value };
            const nextComments = [...listComment, nextComment];
            setListComment(nextComments);
            setValue('');
        }
    }

    return (
        <>
            {products.length === 0
                ? <LoadingModal />
                : <div className="product-detail-container">
                    <div className="detail-container">
                        <div className="productsDetail">
                            <div className="leftInfo">
                                <Image src={thisProduct.image} />
                            </div>
                            <div className="detailInfo">
                                <h3 className="productName">{thisProduct.name_product}</h3>
                                <p className="description">Description: {thisProduct.introduce}</p>
                                <p className="price">${thisProduct.price}</p>
                                <div className="quantity-selector">
                                    <InputNumber min={1} defaultValue={1} />
                                    <button className="btn-buy"><CartIcon /> Add to cart</button>
                                </div>
                                <p className="addinfor">This item will be shipped to your address.</p>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <h3>Comment</h3>
                        <div>
                            {listComment.map(comment => (
                                <ul className="commented" key={comment.id}>
                                    <li><CommentOutlined />
                                        <p>{comment.text}</p>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className="comment-component">
                            <input
                                className='inputCmt'
                                placeholder="Write comment here"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button className="btn-cmt" onClick={onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}