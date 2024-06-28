import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectLoadingState, fetchProduct, searchProduct, selectTotalItems } from "../redux/slice/products/productsSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/loadingModal";
import { Spin, Skeleton, Pagination, Checkbox } from "antd";

const ProductComponent = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector(selectProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = useSelector(selectTotalItems);
    const itemsPerPage = 10; // Define the number of items per page

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchProduct({ page: currentPage, limit: itemsPerPage, sortBy: 'name', sortOrder: sortOption, search_keywords: searchQuery }));
        } else {
            dispatch(fetchProduct({ page: currentPage, limit: itemsPerPage, sortBy: 'name', sortOrder: sortOption }));
        }
    }, [currentPage, searchQuery, sortOption]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
        if (searchQuery) {
            dispatch(searchProduct({ page, limit: itemsPerPage, sortBy: 'name', sortOrder: sortOption, search_keywords: searchQuery }));
        } else {
            dispatch(fetchProduct({ page, limit: itemsPerPage, sortBy: 'name', sortOrder: sortOption }));
        }
    };

    const Product = ({ product }) => {
        const [isLoadedImg, setIsLoadedImg] = useState(false);
        const handleImageLoad = () => {
            setIsLoadedImg(true);
        };
        return (
            <div key={product.id} className="product-info" onClick={() => linkToDetail(product.id)}>
                {!isLoadedImg && <Skeleton active />}

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
            <div className="content-product">
                <div className="aside-product">
                    <div className="select-category">
                        <h3>Categories</h3>
                        <Checkbox>Category1</Checkbox>
                        <Checkbox>Category1</Checkbox>
                        <Checkbox>Category1</Checkbox>
                        <Checkbox>Category1</Checkbox>
                    </div>
                </div>
                <div className="products-list">
                    {products && products.map(product => <Product key={product.id} product={product} />)}
                </div>
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
