import React, { useState, useEffect } from "react";
import './news.css';
import { useSelector, useDispatch } from "react-redux";
import { selectArticles,selectLoadingState,selectErrorState } from "../../redux/slice/articles/articlesSlice";
import { useParams } from "react-router-dom";
import LoadingModal from "../../modal/loadingModal";


export default function newsDetail() {
    const { articleId } = useParams();
    const articles = useSelector(selectArticles);
    const dispatch = useDispatch();

    const thisArticle = articles.find(a => a.id === articleId)

    //check article data if visible or not
    useEffect(() => {
        if (articles.length === 0) {
            dispatch(fetchArticle())
        };
    }, []);

    return <>
        {articles.length === 0
            ? <LoadingModal />
            :
            <div className="news-detail">
                <h1>{thisArticle.title}</h1>
                <img src={thisArticle.image} alt={thisArticle.title} />
                <p className="view">View: {thisArticle.view}</p>
                <p>{thisArticle.description}</p>
                <p>{thisArticle.content}</p>
            </div>
        }
    </>

}