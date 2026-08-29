import React, { useEffect, useState } from 'react'
import "./style.css"
import ScrollDataCard from './ScrollDataCard';

const ScrollIndicator = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const wallpaperMove = (scrollPercentage - 100) * 2.4;

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
        const scrolled = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (height === 0) {
            setScrollPercentage(0);
            return;
        }

        const nextPercentage = (scrolled / height) * 100;
        const safePercentage = Math.max(0, Math.min(nextPercentage, 100));

        setScrollPercentage(safePercentage);
    }


    useEffect(() => {
        fetchData(url);
    }, [url])

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage);

        return () => {
            window.removeEventListener('scroll', handleScrollPercentage)
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
                <div className="wallpaperWindow">
                    <img
                        className="wallpaperImage"
                        src="/wallpaper.png"
                        alt=""
                        style={{ transform: `translateX(${wallpaperMove}px)` }}
                    />
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