import React, { useEffect, useState } from "react";
import './productsDetail.css'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentOutlined } from '@ant-design/icons';
// import { selectProducts, selectLoadingState } from "../../redux/slice/products/productsSlice.js";
import { selectProducts, selectLoadingState, fetchMockProduct } from "../../redux/slice/products/productMockSlice.js";
import ModalImage from "../../modal/modalImage.jsx";
import LoadingModal from "../../modal/loadingModal.jsx";

export default function productsDetail() {
    const [open, setOpen] = useState(false);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    //get product's ID
    const { productId } = useParams();
    const thisProduct = products.find(p => p.id === productId);
    //check product data if visible or not
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchMockProduct())
        };
    }, []);

    //comment state
    const [value, setValue] = useState('')
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

    //handle open modal
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    return <>
        {products.length === 0
            ? <LoadingModal />
            :
            <div>
                <ModalImage isOpen={open} onClose={handleClose} >
                    <img className="img-show" src={thisProduct.image} alt={thisProduct.name_product} />
                </ModalImage>
                <div className="productsDetail">
                    <div className="leftInfo">
                        <img onClick={handleOpen} className="imageDetail" src={thisProduct.image} alt={thisProduct.name_product} />
                    </div>
                    <div className="detailInfo">
                        <h3 className="productName">{thisProduct.name_product}</h3>
                        <p>Description:{thisProduct.introduce}</p>
                        <button className="btn-buy">Add to cart</button>
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
            </div>
        }
    </>
}