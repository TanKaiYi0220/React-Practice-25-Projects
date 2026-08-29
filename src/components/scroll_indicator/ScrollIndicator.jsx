import React, { useEffect, useState } from 'react'
import "./style.css"
import ScrollDataCard from './ScrollDataCard';

const ScrollIndicator = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    async function fetchData(getUrl) {
        setLoading(true);

        try {
            const response = await fetch(getUrl);
            const data = await response.json();

            if (data && data.products) setData(data.products);
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }

    function handleScrollPercentage() {
        // window.scrollY: A modern, standard web API property
        // document.documentElement.scrollTop: An older fallback property
        const scrolled = window.scrollY || document.documentElement.scrollTop; // cross-browser compatibility

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercentage((scrolled / height) * 100);
    }

    useEffect(() => {
        fetchData(url);
    }, [url])

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage);

        return () => {
            window.removeEventListener('scroll', () => { })
        }
    }, [])

    return (
        <div>
            <div className="scrollIndicatorContainer">
                <h1 className="scrollIndicatorTitle">Custom Scroll Indicator</h1>
                <div className="scrollProgressBarContainer">
                    <div
                        className="scrollProgressBar"
                        style={{ width: `${scrollPercentage}%` }}>

                    </div>
                </div>
            </div>
            <div className="scrollDataContainer">
                {
                    (data && data.length) > 0
                        ? data.map((dataItem) => <ScrollDataCard key={dataItem.id} productName={dataItem.title}></ScrollDataCard>)
                        : null
                }
            </div>
        </div>
    )
}

export default ScrollIndicator