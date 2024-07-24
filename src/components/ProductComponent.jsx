import { Checkbox, Pagination, Skeleton, Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FILTER_PRODUCTS_OPTIONS } from "../utils/constants";
import LoadingModal from "../modal/loadingModal";
import {
    fetchProduct,
    fetCategories,
    selectLoadingState,
    selectTotalItems,
} from "../redux/slice/products/productsSlice";

const ProductComponent = ({ searchQuery, sortOption }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector((state) => state.productsSlice.items);
    const categories = useSelector((state) => state.productsSlice.categories) || [];
    const totalItems = useSelector(selectTotalItems);

    const [itemsPerPage, setItemsPerPage] = useState(12);

    const getListProduct = async () => {
        dispatch(
            fetchProduct({
                page: currentPage,
                limit: itemsPerPage,
                textQuery: searchQuery,
                sortBy: FILTER_PRODUCTS_OPTIONS[sortOption].sortBy,
                sortOrder: FILTER_PRODUCTS_OPTIONS[sortOption].sortOrder,
                categories: selectedCategories // Send the array of selected categories
            })
        );
    };

    const getListCategories = async () => {
        dispatch(fetCategories());
    }

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter(id => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
        setCurrentPage(1);
        console.log(selectedCategories);
    };

    const linkToDetail = (id) => {
        navigate(`/products/${id}`);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getListCategories();
    }, []);

    useEffect(() => {
        getListProduct();
    }, [searchQuery, sortOption, currentPage, itemsPerPage, selectedCategories]);

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
                <img
                    className="image-product"
                    src={product.image_path}
                    onLoad={handleImageLoad}
                    alt={product.name}
                />
                <h3 className="product-name">{product.name}</h3>
                {product.quantity === 0 ? <p className="sold-out-label">Sold out</p> : null}
                <p className="product-price">${product.price}</p>
            </div>
        );
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setItemsPerPage(pageSize);
    }

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
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={handleCategoryChange}
                                >
                                    {category.name} {`(${category.total_products})`}
                                </Checkbox>
                            ))
                        }
                    </div>
                </div>
                {products.length !== 0 ?
                    <div className="products-list">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                    :
                    <div className="no-result-found">
                        <Empty />
                    </div>}
            </div>
            <div className="pagination-product">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    showSizeChanger
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ProductComponent;
