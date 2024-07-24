import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopProduct } from '../redux/slice/products/productsSlice';
import { useDispatch, useSelector } from "react-redux";
import '../page/product/products.css';
import { useTranslation } from "react-i18next";

const topSellingProducts = () => {
    const { t } = useTranslation(['product'])

    const navigate = useNavigate()
    const [limit, setLimit] = useState(4);
    const dispatch = useDispatch()
    const topProducts = useSelector((state) => state.productsSlice.topProducts);


    const getListProduct = async () => {
        dispatch(
            fetchTopProduct({
                limit: limit,
            })
        );
    };

    const linkToDetail = (id) => {
        navigate(`/products/${id}`);
    };
    useEffect(() => {
        getListProduct()
    }, [])
    return (
        <div className='top-product-container'>
            <h2>{t('Best_Seller')}</h2>
            <div className='top-product-list'>
                {topProducts
                    ? topProducts.map((product) => (
                        <div
                            key={product.id}
                            className="top-product-info"
                            onClick={() => linkToDetail(product.id)}
                        >
                            <img
                                className="image-product"
                                src={product.image_path}
                                alt={product.name}
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <p className='total-sold-label'>Total sold this moth: {product.total_units_sold}</p>
                        </div>
                    )) : null}
            </div>
        </div>
    );
}

export default topSellingProducts;