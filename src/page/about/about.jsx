import React from "react";
import { useLocation } from "react-router-dom";

export default function about() {
    const location = useLocation()
    if (location.pathname == '/about') {
        console.log('hehe');
    }
    return <>
        <div> 
            <h2>About Us

            </h2>
        </div>
    </>
}