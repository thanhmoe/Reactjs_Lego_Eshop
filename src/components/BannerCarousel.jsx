import React, { useEffect, useState } from "react";
import { Button, Carousel, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { getBanner } from "../services/banner_services";
import { useTranslation } from "react-i18next";
import './styleBanner.css';

const BannerCarousel = () => {
    const navigate = useNavigate();
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [banners, setBanners] = useState([]);

    const { t } = useTranslation(['common']);

    const navigateToProducts = (id) => {
        navigate(`/products/${id}`);
    };

    const getDataBanner = async () => {
        try {
            const res = await getBanner({
                page: currentPage,
                limit: itemsPerPage
            });
            if (res.success) {
                setBanners(res.banners);
            }
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        getDataBanner();
    }, [currentPage, itemsPerPage]);

    const Banner = ({ banner }) => {
        return (
            <div className="banner-container">
                <img src={banner.image} alt={banner.title} className="banner-image" />
                <div className="banner-content">
                    <h2>{banner.title}</h2>
                    <p>{banner.descriptions}</p>
                    <Button onClick={() => navigateToProducts(banner.product_id)}>{t('Shop_Now')}</Button>
                </div>
            </div>
        );
    };

    return (
        <div>
            {banners.length > 0 ? (
                <Carousel arrows infinite draggable autoplay>
                    {banners.map((banner) => (
                        <Banner key={banner.id} banner={banner} />
                    ))}
                </Carousel>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default BannerCarousel;
