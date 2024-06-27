import React, { useState } from "react";
import './products.css'
import { Input, Space, Select } from 'antd';
import { FILTERPRODUCTS } from "../../constants";
const { Search } = Input;
const { Option } = Select;
import ProductComponent from "../../components/ProductComponent";
import { useDispatch } from "react-redux";
import { searchProduct, fetchProduct } from "../../redux/slice/products/productsSlice";

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('asc');
    const dispatch = useDispatch();
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setTimeout(() => {
            setSearchQuery(value);

            if (value.trim() !== "") {
                dispatch(searchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: sortOption, search_keywords: value }));
            } else {
                dispatch(fetchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: sortOption }));
            }
        }, 1000);
    };

    const onSearch = (value) => {
        setSearchQuery(value);
        if (value.trim() !== "") {
            dispatch(searchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: sortOption, search_keywords: value }));
        } else {
            dispatch(fetchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: sortOption }));
        }
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        if (searchQuery.trim() !== "") {
            dispatch(searchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: value, search_keywords: searchQuery }));
        } else {
            dispatch(fetchProduct({ page: currentPage, limit: itemsPerPage, sortBy, sortOrder: value }));
        }
    };

    return (
        <div className="container-product">
            <h2 className="products-label">PRODUCTS</h2>
            <div className="filter-product">
                <Space>
                    <Search 
                        className="searchbar"
                        placeholder="input search text"
                        onSearch={onSearch}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue="asc" style={{ width: 200 }} onChange={handleSortChange}>
                            {FILTERPRODUCTS.map(filter => (
                                <Option key={filter.id} value={filter.type}>{filter.name}</Option>
                            ))}
                        </Select>
                    </div>
                </Space>
            </div>
            <div>
                <ProductComponent searchQuery={searchQuery} sortOption={sortOption} />
            </div>
        </div>
    );
}
