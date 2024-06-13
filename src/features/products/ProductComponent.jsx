import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectLoadingState, fetchProduct, selectErrorState } from "./productsSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../modal/loadingModal";

const ProductComponent = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [visibleProducts, setVisibleProduct] = useState([])
    const dispatch = useDispatch()
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector(selectProducts);

    //navigate to detail
    const linkToDetail = (id) => {
        navigate(`/products/${id}`)
    }
    //fetch data
    useEffect(() => {
        if (productsStatus === 'ide') {
            dispatch(fetchProduct())
        }
        setVisibleProduct(products.slice(0, 20))
        setIsLoading(false)
    }, [productsStatus, dispatch]);

    //load more data onscroll
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

    // search and filter options
    const filterAndSortproduct = (products, query, sort) => {
        let filteredProducts = products.filter(product =>
            product.name_product.toLowerCase().includes(query.toLowerCase())
        )
        switch (sort) {
            case 'nameAsc':
                filteredProducts.sort((a, b) => a.name_product.localeCompare(b.name_product));
                break;
            case 'nameDesc':
                filteredProducts.sort((a, b) => b.name_product.localeCompare(a.name_product));
                break;
            // case 'priceAsc':
            //     filteredProducts.sort((a, b) => a.price - (b.price));
            //     break;
            // case 'priceDesc':
            //     filteredProducts.sort((a, b) => b.price - (a.price));
            //     break;
            default:
                break;
        }
        return filteredProducts;
    }
    const filteredProducts = filterAndSortproduct(visibleProducts, searchQuery, sortOption)

    return <>
        {isLoading && <LoadingModal />}
        {filteredProducts.map(products => (
            <div key={products.id} className="product-info">
                <img onClick={() => linkToDetail(products.id)} className="image-product" src={products.image} />
                <h3>{products.name_product}</h3>
                <p>Description:{products.introduce}</p>
                <button className="btn-buy">Add to cart</button>
            </div>
        ))}
    </>
}
export default ProductComponent;