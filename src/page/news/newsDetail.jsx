import React, { useState, useEffect } from "react";
import './news.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsDetail, selectNewDetail } from "../../redux/slice/articles/articlesSlice";
import { useParams } from "react-router-dom";
import LoadingModal from "../../modal/loadingModal";

export default function NewsDetail() {
    const { articleId } = useParams();
    const articles = useSelector(selectNewDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsDetail(articleId));
    }, [dispatch, articleId]);

    return (
        <>
            {!articles ? (
                <LoadingModal />
            ) : (
                <div className="news-detail">
                    <h1 className="news-detail-title">{articles.title}</h1>
                    <div className="news-meta">
                        <span className="news-author">By {articles.author}</span>
                        <span className="news-date">{new Date(articles.create_at).toLocaleDateString()}</span>
                    </div>
                    <img className="news-image-thumb" src={articles.image_thumb} alt={articles.title} />
                    <p className="news-description">{articles.descriptions}</p>
                    <img className="news-image-content" src={articles.image_content} alt={articles.title} />
                    <div className="news-content" dangerouslySetInnerHTML={{ __html: articles.content.replace(/\r\n/g, '<br />') }} />
                </div>
            )}
        </>
    );
}
