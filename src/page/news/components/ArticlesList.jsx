import React, { useEffect, useState } from "react";

import { Skeleton, Empty,Pagination } from "antd";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchArticle,selectArticles } from "../../../redux/slice/articles/articlesSlice";


const ArticlesList = () => {
    const navigate = useNavigate();
    const [itemsPerPage,setItemsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const totalItems = useSelector((state)=>state.articleList.totalItems);

    const linkToDetail = (id) => {
        navigate(`/news/${id}`);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setItemsPerPage(itemsPerPage);
    }
    useEffect(() => {
        dispatch(fetchArticle({
            page: currentPage,
            limit: itemsPerPage
        }));
    }, [currentPage,itemsPerPage]);

    const Article = ({ article }) => {
        return (
            <div className="articles" key={article.id} onClick={() => linkToDetail(article.id)}>
                <img className="news-image" src={article.image_thumb} alt={article.title} />
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
                <div className="news">
               {articles.map((article) => (
                    <Article key={article.id} article={article} />
                ))}
                </div>
            ) : (
                <Empty />
            )}
            <div className="pagination-product">
            <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ArticlesList;
