import React, { useState } from "react";
import { Skeleton, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const ArticlesList = ({ articles }) => {
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
            <div className="articles" key={article.id} onClick={() => linkToDetail(article.id)}>
                {!isLoadedImg && <Skeleton active />}
                <img className="news-image" src={article.image_thumb} onLoad={handleImageLoad} alt={article.title} />
                <h2 className="news-title">{article.title}</h2>
                <div className="author-and-date">
                    <p>{article.category}</p>
                    <p>{new Date(article.create_at).toLocaleDateString()}</p>
                </div>
                <p className="description-news">{article.descriptions}</p>
            </div>
        );
    };

    return (
        <>
            {articles.length !== 0 ? (
                articles.map((article) => (
                    <Article key={article.id} article={article} />
                ))
            ) : (
                <Empty />
            )}
        </>
    );
};

export default ArticlesList;
