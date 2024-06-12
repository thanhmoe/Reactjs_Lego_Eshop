import React, { useState, useEffect } from "react";
import './news.css';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function newsDetail() {
    const { articleId } = useParams();
    const [items, setItems] = useState([])
    const [article, setArticle] = useState([])


    useEffect(() => {
        axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list")
            .then(response => {
                setItems(response.data);
                const foundArticle = response.data.find(item => item.id === articleId);
                setArticle(foundArticle);
            })
            .catch(error => console.log(error));
    }, [articleId])

    if (!article) {
        return <div>Loading</div>
    }

    return <>
        <div className="news-detail">
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} />
            <p className="view">View: {article.view}</p>
            <p>{article.description}</p>
            <p>{article.content}</p>
            
        </div>

    </>


}