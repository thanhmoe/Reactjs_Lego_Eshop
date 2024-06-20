import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectArticles,selectLoadingState,fetchArticle } from "../redux/slice/articles/articlesSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/loadingModal";

const ArticleComponent = ({ searchQuery, sortOption }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [visibleArticles, setVisibleArticles] = useState([])
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
        setVisibleArticles(articles.slice(0, 20))
        setIsLoading(false)
    }, [articlesStatus, dispatch]);

    const fetchMoreData = () => {
        if (visibleArticles.length >= articles.length) {
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            const newVisibleArticles = articles.slice(0, visibleArticles.length + 5);
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
            case 'LeastViewed':
                filteredArticles.sort((a, b) => a.view - (b.view));
                break;
            case 'MostViewed':
                filteredArticles.sort((a, b) => b.view - (a.view));
                break;
            default:
                break;
        }
        return filteredArticles;
    }
    const filteredArticles = filterAndSortArticles(visibleArticles, searchQuery, sortOption)
    return <>
        {isLoading && <LoadingModal />}
        {filteredArticles.map(article => (
            <div className="articles" key={article.id} onClick={() => linkToDetail(article.id)}>
                <img src={article.image} alt={article.title} />
                <h2>{article.title}</h2>
                <p>View:{article.view}</p>
                <p>{article.description}</p>
            </div>
        ))}
    </>
}
export default ArticleComponent;
