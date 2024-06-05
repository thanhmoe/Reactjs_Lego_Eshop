import React, { useState } from "react";
import ProductList from "./productsList";
import './products.css'
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;


export default function products() {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('')

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




        <div className="productsList">
            <h2>Products</h2>
            <div className="searchbar">
                <Space>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch} onChange={handleSearchChange}
                        style={{
                            width: 200,
                        }}

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
            <ProductList searchQuery={searchQuery} sortOption={sortOption} />
        </div>

    </>
}