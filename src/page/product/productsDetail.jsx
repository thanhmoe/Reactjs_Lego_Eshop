import React from "react";
import './productsDetail.css'
import { useParams } from "react-router-dom";
import productsData from "../../assets/data/productsData.js";


export default function productsDetail() {
    const { productId } = useParams();
    const thisProduct = productsData.find(p => p.id === productId)
    return <>
        <div className="productsDetail">
            <div className="leftInfo">
                <img className="imageDetail" src={thisProduct.image} alt={thisProduct.name} />
            </div>
            <div className="detailInfo">
                <h3>name goes here: {thisProduct.productName}</h3>
                <p>Description:{thisProduct.decsription}</p>
                <p>Chip:{thisProduct.Chip}</p>
                <p>Display:{thisProduct.Display}</p>
                <h3>Price:{thisProduct.price}</h3>
                <div className="information">
                    <p> more infor goes heremore infor goes heremore infor goes heremore infor goes here</p>
                </div>
            </div>
        </div>




    </>
}