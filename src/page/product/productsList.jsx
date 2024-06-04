import React from "react";
import '/src/page/product/products.css'
import productsData from "../../assets/data/productsData";
import { Link, useNavigate } from "react-router-dom";
import products from "./products";
// import { useHistory } from "react-router-dom";



const productList = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();


    const linkToDetail = (id) => {
        console.log(id)
        //   productsData.map(product)
        navigate(`/products/${id}`)
    }

    const filterAndSortproduct = (products, query, sort) => {
        let filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(query.toLowerCase())
        )
        switch (sort) {
            case 'nameAcs':
                filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'nameDesc':
                filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case 'priceAsc':
                filteredProducts.sort((a, b) => a.price - (b.price));
                break;
            case 'priceDesc':
                filteredProducts.sort((a, b) => b.price - (a.price));
                break;
            default:
                break;
        }
        return filteredProducts;
    }


    const filteredProducts = filterAndSortproduct(productsData,searchQuery, sortOption)
    return <>
        <div className="productList">
            {filteredProducts.map(products => (
                <div key={products.id} className="productInfo">
                    {/* <img onClick={() => navigate(`/products/${products.id}`)} className="imageProduct" src={products.image} /> */}
                    <img onClick={() => linkToDetail(products.id)} className="imageProduct" src={products.image} />
                    <h3><Link to={`/products/${products.id}`}>{products.productName}</Link></h3>
                    <p>Description:{products.decsription}</p>
                    <p>Chip:{products.Chip}</p>
                    <p>Display:{products.Display}</p>
                    <h3>Price:{products.price}$</h3>
                    <button className="btnBuy">Add to cart</button>
                </div>
            ))}

        </div>
    </>
}
export default productList;