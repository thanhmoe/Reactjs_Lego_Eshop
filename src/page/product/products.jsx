import React, { useState } from "react";
import ProductList from "./productsList";
import './products.css'
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function products() {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('')

    const onSearch = (value) => [
        setSearchQuery(value)
    ]

    const handleSortChange = (value) => {
        setSortOption(value)
    }

    return <>
        <h2>Products</h2>
        <div className="searchbar">
            <Space direction="vertical">
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{
                        width: 200,
                    }}

                />
                <Select defaultValue="" style={{ width: 200 }} onChange={handleSortChange}>
                    <Option value="">Sorting</Option>
                    <Option value="nameAsc">Name A-Z</Option>
                    <Option value="nameDesc">Name Z-A</Option>
                    <Option value="priceAsc">Price Low-High</Option>
                    <Option value="priceDesc">Price High-Low</Option>
                </Select>
            </Space>
        </div>


        <div className="productsList">
            <ProductList searchQuery={searchQuery} sortOption={sortOption} />
        </div>

    </>
}