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
            <div className="carousel-item">
                {!isLoadedImg && <Skeleton active />}
                <img onClick={() => linkToDetail(article.id)} src={article.image_thumb} onLoad={handleImageLoad} alt={article.title} />
                <h2 onClick={() => linkToDetail(article.id)}>{article.title}</h2>
                <div className="author-and-date">
                    <p>{article.category}</p>
                    <p>{new Date(article.create_at).toLocaleDateString()}</p>
                </div>
                <p className="description-news">{article.descriptions}</p>
            </div>
        );
    };

    return (
        <div className="articles-carousel">
            {articles.length !== 0 ? (
                <Carousel arrows draggable autoplay slidesToShow={3} dots={false} responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]}>
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
