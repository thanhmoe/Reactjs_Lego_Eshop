import React, { useState } from "react";
import './products.css'
import { Input, Space, Select } from 'antd';
import { FILTERPRODUCTS } from "../../constants";
const { Search } = Input;
const { Option } = Select;
import ProductComponent from "../../components/ProductComponent";

export default function products() {
    //filter state
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('')

    //handle input filter, search change
    const handleSearchChange = (e) => {
        const value = e.target.value
        setTimeout(() => {
            setSearchQuery(value)
        }, 1000);
    }

    const onSearch = (value) => [
        setSearchQuery(value)
    ]

    const handleSortChange = (value) => {
        setSortOption(value)
    }

    return <>
        <div className="container-product">
            <h2 className="products-label">PRODUCTS</h2>
            <div className="filter-product">
                <Space>
                    <Search className="searchbar"
                        placeholder="input search text"
                        onSearch={onSearch} onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue="" style={{ width: 200 }} onChange={handleSortChange}>
                            <Option value="">Sort</Option>
                            {FILTERPRODUCTS.map(filer => (
                                <Option key={filer.id} value={filer.type}>{filer.name}</Option>
                            ))}
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