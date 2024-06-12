import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectLoadingState, fetchProduct, selectErrorState } from "./productsSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../modal/loadingModal";

const ProductComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [visibleProducts, setVisibleProduct] = useState([])

    const linkToDetail = (id) => {
        console.log(id)
        navigate(`/products/${id}`)
    }
    const dispatch = useDispatch()
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector(selectProducts);

    useEffect(() => {
        if (productsStatus === 'ide') {
            dispatch(fetchProduct())
        }
        setVisibleProduct(products.slice(0, 10))
        setIsLoading(false)
    }, [productsStatus, dispatch]);

    const fetchMoreData = () => {
        if (visibleProducts.length >= products.length) {
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            const newVisibleProducts = products.slice(0, visibleProducts.length + 5);
            setVisibleProduct(newVisibleProducts);
            setIsLoading(false)
        }, 500);
    }

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchMoreData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMoreData]);


    console.log(visibleProducts)
    return <>
        {isLoading && <LoadingModal />}
        <div className="product-list">
            {visibleProducts.map(products => (
                <div key={products.id} className="product-info">
                    <img className="image-product" src={products.image} />
                    <h3>{products.name_product}</h3>
                    <p>Description:{products.introduce}</p>
                    <button className="btn-buy">Add to cart</button>
                </div>
            ))}
        </div>

    </>
}
export default ProductComponent;