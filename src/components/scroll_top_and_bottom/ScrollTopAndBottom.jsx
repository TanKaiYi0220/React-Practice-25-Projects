import React from 'react'
import "./style.css"
import UseFetch from "../use_fetch/UseFetch"

const LIMIT = 50;

const ScrollTopAndBottom = () => {
    const { data, error, pending } = UseFetch(
        `https://dummyjson.com/products?limit=${LIMIT}`,
        { method: "GET" }
    );

    function handleScrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    }

    function handleScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="scrollTopAndBottomContainer">
            <h1 className="scrollTitle">Scroll Top and Bottom</h1>
            <button className="scrollBottomButton" onClick={handleScrollToBottom}>
                Scroll to Bottom
            </button>
            <ul>
                {
                    data?.products?.map((item, index) => (
                        <li key={item.id} className="scrollItem">
                            <h2>{index + 1}. {item.title}</h2>
                        </li>
                    ))
                }
            </ul>
            <button className="scrollTopButton" onClick={handleScrollToTop}>
                Scroll to Top
            </button>
        </div>
    )
}

export default ScrollTopAndBottom