// /src/pages/Products.js
import { Input, Select, Space } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductComponent from "../../components/ProductComponent";
import { FILTER_PRODUCTS_OPTIONS } from "../../utils/constants";
import './products.css';
import { debounce } from 'lodash';
const { Search } = Input;
const { Option } = Select;

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState(0);
    const dispatch = useDispatch();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Debounce search input
    const debouncedSearch = debounce((value) => {
        setSearchQuery(value);
    }, 1000);

    const handleSortChange = (value) => {
        setSortOption(value)
    };

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const onSearch = (value) => {
        setSearchQuery(value)
    }

    return (
        <div className="container-product">
            <h2 className="products-label">PRODUCTS</h2>
            <div className="filter-product">
                <Space>
                    <Search
                        className="searchbar"
                        placeholder="input search text"
                        onSearch={(value) => onSearch(value)}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue={FILTER_PRODUCTS_OPTIONS[0].name} style={{ width: 200 }} onChange={handleSortChange}>
                            {FILTER_PRODUCTS_OPTIONS.map(option => (
                                <Option key={option.id} value={option.id}>{option.name}</Option>
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
