import React from "react";
import ProductList from "../assets/data/productsData.jsx";
import './products.css'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;


const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function products() {
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
                /></Space>
        </div>
        
        
        <div className="productsList">
            <ProductList />
        </div>

    </>
}