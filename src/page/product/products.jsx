import React, { useState } from "react";
import './products.css'
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
import ProductComponent from "../../features/products/ProductComponent";

export default function products() {
    //filter state
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('')

    //handle input filter, search change
    const handleSearchChange = (e) => {
        const value = e.target.value
        setTimeout(() => {
            setSearchQuery(value)
        }, 1500);
    }

    const onSearch = (value) => [
        setSearchQuery(value)
    ]

    const handleSortChange = (value) => {
        setSortOption(value)
    }

    return <>
        <div className="container-product">
            <div className="filter">
                <h2 className="products-label">PRODUCTS</h2>
                <Space>
                    <Search className="searchbar"
                        placeholder="input search text"
                        onSearch={onSearch} onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue="" style={{ width: 200 }} onChange={handleSortChange}>
                            <Option value="">Sorting</Option>
                            <Option value="nameAsc">Name A-Z</Option>
                            <Option value="nameDesc">Name Z-A</Option>
                            <Option value="priceAsc">Price Low-High</Option>
                            <Option value="priceDesc">Price High-Low</Option>
                        </Select>
                    </div>
                </Space>
            </div>
            <div className="products-list">
                <ProductComponent searchQuery={searchQuery} sortOption={sortOption} />
            </div>
        </div>
    </>
}