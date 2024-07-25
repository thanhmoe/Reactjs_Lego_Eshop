// /src/pages/Products.js
import { FloatButton, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import ProductComponent from "../../components/ProductComponent";
import { FILTER_PRODUCTS_OPTIONS } from "../../utils/constants";
import './products.css';
import { debounce } from 'lodash';
const { Search } = Input;
const { Option } = Select;

export default function Products() {
    const { t } = useTranslation(['product']);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState(0);
    const dispatch = useDispatch();
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

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search query changes
    }, [searchQuery]);

    return (
        <div className="container-product">
            <h2 className="products-label">{t('Product_page_label')}</h2>
            <div className="filter-product">
                <Space>
                    <Search
                        className="searchbar"
                        placeholder={t("input_search_text")}
                        onSearch={(value) => onSearch(value)}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <Select defaultValue={t(FILTER_PRODUCTS_OPTIONS[0].name)} style={{ width: 200 }} onChange={handleSortChange}>
                            {FILTER_PRODUCTS_OPTIONS.map(option => (
                                <Option key={option.id} value={option.id}>{t(option.name)}</Option>
                            ))}
                        </Select>
                    </div>
                </Space>
            </div>
            <div>
                <ProductComponent searchQuery={searchQuery} sortOption={sortOption} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <FloatButton.BackTop />
        </div>
    );
}
