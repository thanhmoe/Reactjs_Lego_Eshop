import React, { useState } from "react";
import './productsDetail.css'
import { useParams } from "react-router-dom";
import productsData from "../../assets/data/productsData.js";


export default function productsDetail() {
    const { productId } = useParams();
    const thisProduct = productsData.find(p => p.id === productId)
    let listComments = []
    const [listComment, setListComment] = useState([
        {
            id: 1,
            text: 'first comment here'
        },
        {
            id: 2,
            text: ' im a second'
        },
        {
            id: 3,
            text: ' im a third guys here'
        },

    ])
    const [value, setValue] = useState('')

    const onSubmit = () => {
        const addComment = value
        listComments.push(addComment)
        console.log(listComments)
    }
    const handleCommentChange = () => {
        let nextComment = listComment.push()
        setListComment(nextComment)
    }



    return <>

        <div className="productsDetail">
            <div className="leftInfo">
                <img className="imageDetail" src={thisProduct.image} alt={thisProduct.name} />
            </div>
            <div className="detailInfo">
                <h3 className="productName">{thisProduct.productName}</h3>
                <p>{thisProduct.decsription}</p>
                <p>Chip:{thisProduct.Chip}</p>
                <p>Display:{thisProduct.Display}</p>
                <h3>${thisProduct.price}</h3>
                <button className="btnBuy">Add to cart</button>
                <div className="information">
                    <p> more infor goes here</p>
                </div>
            </div>
            <div className="comment">
                <h3>
                    Comment
                </h3>
                <div  >

                    {listComment.map(comment => (
                        <ul className="commented" key={comment.id}>
                            <li>{comment.text}
                            </li>
                        </ul>
                    ))}
                </div>
                <div>
                    <input onChange={(e) => setValue(e.target.value)} placeholder="write comment here" className="inputText"></input>
                    <button onClick={onSubmit} className="btnCmt"> Submit</button>
                </div>
            </div>
        </div>
    </>
}