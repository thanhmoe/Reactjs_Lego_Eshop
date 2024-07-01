import { Checkbox, Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FILTER_PRODUCTS_OPTIONS } from "../constants";
import LoadingModal from "../modal/loadingModal";
import {
    fetchProduct,
    selectLoadingState,
    selectTotalItems,
} from "../redux/slice/products/productsSlice";

const ProductComponent = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector((state) => state.productsSlice.items);
    const categories = useSelector((state) => state.productsSlice.categories) || [];
    const totalItems = useSelector(selectTotalItems);

    const itemsPerPage = 12; // Define the number of items per page

    const getListProduct = async () => {
        dispatch(
            fetchProduct({
                page: currentPage,
                limit: itemsPerPage,
                textQuery: searchQuery,
                sortBy: FILTER_PRODUCTS_OPTIONS[sortOption].sortBy,
                sortOrder: FILTER_PRODUCTS_OPTIONS[sortOption].sortOrder,
                category: selectedCategory
            })
        );
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory((prevSelectedCategory) =>
            prevSelectedCategory === categoryId ? null : categoryId
        );
        setCurrentPage(1);
    };

    const linkToDetail = (id) => {
        navigate(`/products/${id}`);
    };

    useEffect(() => {
        getListProduct();
    }, [searchQuery, sortOption, currentPage, selectedCategory]);

    const Product = ({ product }) => {
        const [isLoadedImg, setIsLoadedImg] = useState(false);
        const handleImageLoad = () => {
            setIsLoadedImg(true);
        };
        return (
            <div
                key={product.id}
                className="product-info"
                onClick={() => linkToDetail(product.id)}
            >
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

    return (
        <>
            {productsStatus === "loading" && <LoadingModal />}
            <div className="content-product">
                <div className="aside-product">
                    <div className="select-category">
                        <h3>Categories</h3>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <Checkbox
                                    key={category.id}
                                    value={category.id}
                                    checked={selectedCategory === category.id}
                                    onChange={handleCategoryChange}
                                >
                                    {category.name} {`(${category.total_products})`}
                                </Checkbox>
                            ))
                        }
                    </div>
                </div>
                <div className="products-list">
                    {products.length > 0 &&
                        products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                </div>
            </div>
            <div className="pagination-product">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
};

export default ProductComponent;
