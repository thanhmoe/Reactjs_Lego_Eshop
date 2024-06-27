import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectLoadingState, fetchProduct, selectTotalItems } from "../redux/slice/products/productsSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/loadingModal";
import { Spin, Pagination } from "antd";

// const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductComponent = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector(selectProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = useSelector(selectTotalItems);
    const itemsPerPage = 5; // Define the number of items per page

    useEffect(() => {
        if (productsStatus === 'idle' || productsStatus === 'loading') {
            dispatch(fetchProduct({ page: currentPage, limit: itemsPerPage }));
        }
    }, [currentPage, searchQuery, sortOption]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
        dispatch(fetchProduct({ page, limit: itemsPerPage }))
    };

    const Product = ({ product }) => {
        const [isLoadedImg, setIsLoadedImg] = useState(false);
        // const imageUrl = `${IMAGE_BASE_URL}${product.image_path}`;
        const handleImageLoad = () => {
            setIsLoadedImg(true);
        };
        return (
            <div key={product.id} className="product-info" onClick={() => linkToDetail(product.id)}>
                {!isLoadedImg && <Spin />}
                <img
                    className="image-product"
                    src={product.image_path}
                    onLoad={handleImageLoad}
                    alt={product.name}
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
            </div>
        );
    };

    const linkToDetail = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <>
            {productsStatus === 'loading' && <LoadingModal />}
            <div className="products-list">
                {products.map(product => <Product key={product.id} product={product} />)}
            </div>
            <div className="pagination-product">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ProductComponent;
