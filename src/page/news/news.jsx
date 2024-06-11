import React, { useState } from "react";
import './news.css'
import InfiniteScroll from "react-infinite-scroll-component";
import ArticlesList from "../../components/articlesList";
import LoadingModal from "../../modal/loadingModal";

export default function news() {

    return <>
        <div className="news" >
            <ArticlesList/>
        </div>
        {/* <LoadingModal></LoadingModal> */}
    </>
}