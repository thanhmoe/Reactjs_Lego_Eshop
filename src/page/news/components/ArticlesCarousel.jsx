import React, { useEffect, useState } from "react";
import { Carousel, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticle, selectArticles } from "../../../redux/slice/articles/articlesSlice";
import './style.css';

const ArticlesCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const [itemsPerPage,setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const linkToDetail = (id) => {
        navigate(`/news/${id}`);
    };

    useEffect(() => {
        dispatch(fetchArticle({
            page: currentPage,
            limit: itemsPerPage
        }));
    }, []);

    const Article = ({ article }) => {
        return (
            <div className="carousel-item">
                <img onClick={() => linkToDetail(article.id)} src={article.image_thumb} alt={article.title} />
                <h2 onClick={() => linkToDetail(article.id)}>{article.title}</h2>
                <div className="author-and-date">
                    <p>{article.category}</p>
                </div>
                <p className="description-news">{article.descriptions}</p>
            </div>
        );
    };

    return (
        <div className="articles-carousel">
            {articles.length > 0 ? (
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
