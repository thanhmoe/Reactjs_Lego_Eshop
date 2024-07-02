// /src/pages/Products.js
import { Input, Select, Space } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductComponent from "../../components/ProductComponent";
import { FILTER_PRODUCTS_OPTIONS } from "../../constants";
import './products.css';
import { fetchProductsRefactor } from '../../axios/api';
const { Search } = Input;
const { Option } = Select;

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState(0);
    const dispatch = useDispatch();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000); // 1 second debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const handleSortChange = (value) => {
        setSortOption(value)
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
                <ProductComponent searchQuery={debouncedQuery} sortOption={sortOption} />
            </div>
        </div>
    );
}
