import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectArticles, selectLoadingState, fetchArticle } from "../redux/slice/articles/articlesSlice";

import { useNavigate } from "react-router-dom";

import LoadingModal from "../modal/loadingModal";
import { Empty, Skeleton, Spin } from "antd";

const ArticleComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const articlesStatus = useSelector(selectLoadingState);
    const articles = useSelector(selectArticles);
    const navigate = useNavigate();

    const linkToDetail = (id) => {
        navigate(`/news/${id}`)
    }

    //fetch data
    useEffect(() => {
        if (articlesStatus === 'ide') {
            dispatch(fetchArticle())
        }
        setIsLoading(false)
    }, []);

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
        )
    }
    return (
        <>
            {isLoading && <LoadingModal />}
            {articles.length != 0 ?
                articles.map((article) => (
                    <Article key={article.id} article={article} />
                ))
                :
                <Empty />
            }
        </>
    );
};
export default ArticleComponent;
