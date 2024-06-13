import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/loadingModal";


const articlesList = ({ searchQuery, sortOption }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState([])

    const navigate = useNavigate();
    const linkToDetail = (id) => {
        navigate(`/news/${id}`)
    }

    //fetch api
    useEffect(() => {
        axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list")
            .then(response => {
                setItems(response.data)
                setVisibleArticles(response.data.slice(0, 10))
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])

    const fetchMoreData = () => {
        if (visibleArticles.length >= items.length) {
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            const newVisibleArticles = items.slice(0, visibleArticles.length + 5);
            setVisibleArticles(newVisibleArticles);
            setIsLoading(false)
        }, 500);
    }

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchMoreData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMoreData]);
    // search and filter options
    const filterAndSortArticles = (articles, query, sort) => {
        let filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase())
        )
        switch (sort) {
            default:
                break;
        }
        return filteredArticles;
    }
    const filteredArticles = filterAndSortArticles(visibleArticles, searchQuery, sortOption)
    return <>
        {isLoading && <LoadingModal />}
            {filteredArticles.map(article => (
                <div className="articles" key={article.id}>
                    <img onClick={() => linkToDetail(article.id)} src={article.image} alt={article.title} />
                    <h2>{article.title}</h2>
                    <p>View:{article.view}</p>
                    <p>{article.description}</p>
                </div>
            ))}
    </>
}
export default articlesList;
