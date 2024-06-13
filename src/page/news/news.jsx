import React, { useState } from "react";
import './news.css'
import ArticlesList from "../../components/articlesList";
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
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
            <div className="filter">
                <h2 className="news-label">BROWSER NEWSLETTER</h2>
                <Space>
                    <Search className="searchbar"
                        placeholder="input search text"
                        onSearch={onSearch} onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue="" style={{ width: 200 }} onChange={handleSortChange}>
                            <Option value="">Sorting</Option>
                            <Option value="dateASC">Date A-Z</Option>
                            <Option value="dateDesc">Date Z-A</Option>
                        </Select>
                    </div>
                </Space>
            </div>
            <div className="news" >
                <ArticlesList searchQuery={searchQuery} sortOption={sortOption} />
            </div>
        </div>
    </>
}