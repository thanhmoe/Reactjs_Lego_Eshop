import React, { useEffect, useState } from "react";

import { Checkbox, Pagination, Skeleton, Empty, Spin, Button } from "antd";
import { CloseCircleFilled } from '@ant-design/icons';
import LoadingModal from "../modal/loadingModal";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { saveSession, loadSession, clearSession } from "../utils/session_util";
import { FILTER_PRODUCTS_OPTIONS } from "../utils/constants";

import { useDispatch, useSelector } from "react-redux";
import {
    fetchProduct,
    fetCategories,
    selectLoadingState,
    selectTotalItems,
} from "../redux/slice/products/productsSlice";

const ProductComponent = ({ searchQuery, sortOption, currentPage, setCurrentPage }) => {
    const { t } = useTranslation(['product'])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const productsStatus = useSelector(selectLoadingState);
    const products = useSelector((state) => state.productsSlice.items);
    const categories = useSelector((state) => state.productsSlice.categories) || [];
    const totalItems = useSelector(selectTotalItems);

    const [itemsPerPage, setItemsPerPage] = useState(20);

    const getListProduct = async () => {
        dispatch(
            fetchProduct({
                page: currentPage,
                limit: itemsPerPage,
                textQuery: searchQuery,
                sortBy: FILTER_PRODUCTS_OPTIONS[sortOption].sortBy,
                sortOrder: FILTER_PRODUCTS_OPTIONS[sortOption].sortOrder,
                category: selectedCategories // Send the array of selected categories
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
    };

    const linkToDetail = (id) => {
        // Save current state before navigating
        saveSession('selectedCategories', selectedCategories);
        saveSession('currentPage', currentPage);
        navigate(`/products/${id}`);
        window.scrollTo(0, 0);
    };

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

    const handleUncheck = () => {
        setSelectedCategories([]);
        setCurrentPage(1)
        clearSession('selectedCategories');
        clearSession('currentPage');
    }

    // Load saved state from sessionStorage
    useEffect(() => {
        const savedCategories = loadSession('selectedCategories') || [];
        const savedPage = loadSession('currentPage') || 1;
        setSelectedCategories(savedCategories);
        setCurrentPage(savedPage);
    }, []);

    useEffect(() => {
        getListCategories();
    }, []);

    useEffect(() => {
        getListProduct();
    }, [searchQuery, sortOption, currentPage, itemsPerPage, selectedCategories]);

    return (
        <>
            {productsStatus === "loading" && <LoadingModal />}
            <div className="content-product">
                <div className="aside-product">
                    <div className="aside-product-clear-div">
                        <Button className="aside-product-clear-btn" type="text"
                            onClick={handleUncheck}
                        ><CloseCircleFilled />{t('Products_Clear_All_Btn')}</Button>
                    </div>
                    <div className="select-category">
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
