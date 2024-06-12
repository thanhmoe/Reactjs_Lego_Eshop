import React, { useState } from "react";
import './news.css'
import ArticlesList from "../../components/articlesList";

export default function news() {

    return <>
        <div className="news" >
            <ArticlesList/>
        </div>
        
    </>
}