import React, { useEffect, useState } from "react";
import './productsDetail.css'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentOutlined } from '@ant-design/icons';
import { selectProducts, selectLoadingState, fetchProduct } from "../../features/products/productsSlice.js";
import { use } from "i18next";


export default function productsDetail() {
    const { productId } = useParams();
    const products = useSelector(selectProducts);
       
    const thisProduct = products.find(p => p.id === productId)

console.log(thisProduct)

    const [value, setValue] = useState('')
    const [listComment, setListComment] = useState([
        // {
        //     id: 1,
        //     text: 'first comment here'
        // },
        // {
        //     id: 2,
        //     text: ' im a second'
        // },
        // {
        //     id: 3,
        //     text: ' im a third guys here'
        // },

    ])


    const onSubmit = () => {
        if (value) {
            let nextComment = {
                id: crypto.randomUUID(),
                text: value,
            }
            const nextComments = [...listComment, nextComment]
            setListComment(nextComments)
            setValue('')
        }

    }


    return <>



        <div className="productsDetail">
            <div className="leftInfo">
                <img className="imageDetail" src={thisProduct.image} />
            </div>
            <div className="detailInfo">
                <h3 className="productName">{thisProduct.name_product}</h3>
                <p>Description:{thisProduct.introduce}</p>
                <button className="btnBuy">Add to cart</button>
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
                    <input className='inputCmt' onChange={(e) => setValue(e.target.value)} placeholder="write comment here"></input>
                    <button onClick={onSubmit} className="btnCmt"> Submit</button>
                </div>
            </div>
        </div>
    </>
}