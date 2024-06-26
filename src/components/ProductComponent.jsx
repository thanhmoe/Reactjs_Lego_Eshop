import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectLoadingState, fetchProduct } from "../redux/slice/products/productsSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/loadingModal";
import { Spin } from "antd";

const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const productsStatus = useSelector(selectLoadingState);
    const [isLoading, setIsLoading] = useState(true)

    const products = useSelector(selectProducts);
    const [visibleProducts, setVisibleProduct] = useState([])

    //navigate to detail
    const linkToDetail = (id) => {
        navigate(`/products/${id}`)
    }
    //fetch data
    useEffect(() => {
        if (productsStatus === 'ide') {
            dispatch(fetchProduct())
        }
        setIsLoading(false)
    }, [productsStatus, dispatch]);


    const Product = (prop) => {
        const { product } = prop
        const [isLoadedImg, setIsLoadedImg] = useState(false)
        const imageUrl = `${IMAGE_BASE_URL}${product.image_path}`;
        const handleImageLoad = () => {
            setIsLoadedImg(true)
        }
        return (
            <div key={product.id} className="product-info" onClick={() => linkToDetail(product.id)}>
                {!isLoadedImg && <Spin />}
                <img
                    className="image-product"
                    src={imageUrl}
                    onLoad={handleImageLoad}
                    alt={product.name}
                />
                <h3 className="product-name">{product.name}</h3>
                <button className="btn-buy">Add to cart</button>
            </div>
        )
    }

    return <>
        {isLoading && <LoadingModal />}
        {products.map(product => <Product key={product.id} product={product} />)}
    </>
}
export default ProductComponent;