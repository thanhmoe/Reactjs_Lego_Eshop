import React from "react";
import '/src/page/products.css'
const productsData = [
    {
        id: '1',
        productName: 'Product 1',
        decsription: 'this is a product 1',
        price: 100,
        Chip: 'intel',
        Display:'1920x980',
        image: '/src/assets/data/productsImage/8039_asus.jpg'
    },
    {
        id: '2',
        productName: 'Product 2',
        decsription: 'this is a product 2',
        price: 100,
        Chip: 'intel',
        Display:'1920x980',
        image: '/src/assets/data/productsImage/legion_01.jpg'
    },
    {
        id: '3',
        productName: 'Product 3',
        decsription: 'this is a product 3',
        price: 100,
        Chip: 'intel',
        Display:'1920x980',
        image: '/src/assets/data/productsImage/rog_01.jpg'
    },
    {
        id: '4',
        productName: 'Product 4',
        decsription: 'this is a product 4',
        price: 100,
        Chip: 'intel',
        Display:'1920x980',
        image: '/src/assets/data/productsImage/dell_pricion_02.jpg'
    },
    {
        id: '5',
        productName: 'Product 3',
        decsription: 'this is a product 3',
        price: 100,
        Chip: 'intel',
        Display:'1920x980',
        image: '/src/assets/data/productsImage/tuf_01.jpg'
    },
]

const productList = () => {
    return <>
        <div className="productList">
            {productsData.map(products => (
                <div key={products.id} className="productInfo">
                    <img className="image" src={products.image} />
                    <h3>Name:{products.productName}</h3>
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