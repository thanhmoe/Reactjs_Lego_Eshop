import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchArticle, selectLoadingState, selectArticles } from "../../../redux/slice/articles/articlesSlice";

import ArticlesList from "./ArticlesList";
import ArticlesCarousel from "./ArticlesCarousel";
import LoadingModal from "../../../modal/loadingModal";

const ArticleComponent = ({ viewType }) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);

    useEffect(() => {
        dispatch(fetchArticle());
        setIsLoading(false);
    }, [dispatch]);

    return (
        <>
            {isLoading && <LoadingModal />}
            {viewType === "carousel" ? (
                <ArticlesCarousel articles={articles} />
            ) : (
                <ArticlesList articles={articles} />
            )}
        </>
    );
};

export default ArticleComponent;