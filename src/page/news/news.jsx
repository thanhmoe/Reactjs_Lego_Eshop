import React, { useState } from "react";
import './news.css'
import ArticleComponent from "../../components/ArticleComponent";
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { FILTERNEWS } from "../../constants";
export default function news() {

    // handle input filter and search
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
        <div className="container-news">
            <h2 className="news-label">BROWSER NEWSLETTER</h2>
            <div className="filter-news">
                <Space>
                    <Search className="searchbar"
                        placeholder="input search text"
                        onSearch={onSearch} onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue="" style={{ width: 200 }} onChange={handleSortChange}>
                            <Option value="">Sort</Option>
                            {FILTERNEWS.map(news => (
                                <Option key={news.id} value={news.type}>{news.name}</Option>
                            ))}
                        </Select>
                    </div>
                </Space>
            </div>
            <div className="news" >
                <ArticleComponent searchQuery={searchQuery} sortOption={sortOption} />
            </div>
        </div>
    </>
}