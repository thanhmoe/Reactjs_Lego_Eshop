import React, { useState } from "react";
import { Skeleton, Carousel, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import './style.css';

const ArticlesCarousel = ({ articles }) => {
    const navigate = useNavigate();

    const linkToDetail = (id) => {
        navigate(`/news/${id}`);
    };

    const Article = ({ article }) => {
        const [isLoadedImg, setIsLoadedImg] = useState(false);
        const handleImageLoad = () => {
            setIsLoadedImg(true);
        };
        return (
            <div className="carousel-item" onClick={() => linkToDetail(article.id)}>
                {!isLoadedImg && <Skeleton active />}
                <img src={article.image_thumb} onLoad={handleImageLoad} alt={article.title} />
                <h2>{article.title}</h2>
                <p className="description-news">{article.descriptions}</p>
            </div>
        );
    };

    return (
        <div className="articles-carousel">
            {articles.length !== 0 ? (
                <Carousel arrows infinite={true} autoplay>
                    {articles.map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
                </Carousel>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default ArticlesCarousel;
