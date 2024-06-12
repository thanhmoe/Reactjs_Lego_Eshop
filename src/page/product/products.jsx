import React, { useState } from "react";
import ProductList from "./productsList";
import './products.css'
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
import ProductComponent from "../../features/products/ProductComponent";

export default function products() {
    // const [searchQuery, setSearchQuery] = useState('')
    // const [sortOption, setSortOption] = useState('')

    // const handleSearchChange = (e) => {
    //     const value = e.target.value
    //     setTimeout(() => {
    //         setSearchQuery(value)
    //     }, 1500);
    // }

    // const onSearch = (value) => [
    //     setSearchQuery(value)
    // ]

    // const handleSortChange = (value) => {
    //     setSortOption(value)
    // }

    return <>


            <ProductComponent />
    
        {/* <div className="productsList">
            <h2>Products</h2>
            <div >
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
            <ProductList searchQuery={searchQuery} sortOption={sortOption} />
        </div> */}

    </>
}