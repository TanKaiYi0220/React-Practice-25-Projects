import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import "./style.css"
import ProductCard from './ProductCard';

const PRODUCT_PER_PAGE = 20
const PRODUCT_MAX_LIMIT = 100

const LoadMore = () => {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [disableLoading, setDisableLoading] = useState(false);
    const [enableInfiniteScroll, setEnableInfiniteScroll] = useState(false);

    const bottomRef = useRef(null)
    const loadingRef = useRef(false)
    const requestedPagesRef = useRef(new Set())

    async function fetchProducts() {
        if (loadingRef.current || disableLoading) return

        const currentPage = pageCount

        if (requestedPagesRef.current.has(currentPage)) return

        requestedPagesRef.current.add(currentPage)

        // State Loading and Ref Loading
        setLoading(true);
        loadingRef.current = true

        try {
            const url = `https://dummyjson.com/products?limit=${PRODUCT_PER_PAGE}&skip=${pageCount * PRODUCT_PER_PAGE}`
            const response = await fetch(url);
            const data = await response.json();

            const nextProducts = [...products, ...data.products].slice(0, PRODUCT_MAX_LIMIT);

            setProducts(nextProducts);
            // setProducts((currentProducts) => [...currentProducts, ...data.products].slice(0, PRODUCT_MAX_LIMIT))

            if (nextProducts.length >= PRODUCT_MAX_LIMIT) {
                setDisableLoading(true)
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [pageCount])

    useEffect(() => {
        const bottomElement = bottomRef.current

        if (!bottomElement || loading || disableLoading) return

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0]

            if (firstEntry.isIntersecting && !loadingRef.current) {
                setPageCount((currentPageCount) => currentPageCount + 1)
            }
        })

        observer.observe(bottomElement)

        return () => {
            observer.disconnect()
        }
    }, [loading, disableLoading, products.length])

    return (
        <div className="loadMoreContainer">
            <div className="productContainer">
                {
                    products.map((item) => (<ProductCard key={item.id} item={item} />))
                }
            </div>

            <button
                disabled={disableLoading}
                className="loadMoreButton"
                onClick={() => { setPageCount(pageCount + 1) }}>
                Load More
            </button>

            {loading && <p>Loading ...</p>}
            {disableLoading && <p>You have reached the product limit.</p>}

            <button
                disabled={enableInfiniteScroll}
                className="infiniteScrollButton"
                onClick={() => { setEnableInfiniteScroll(true) }}
            >
                Enable Infinite Scroll
            </button>

            <div ref={bottomRef} style={{display: (enableInfiniteScroll) ? "" : "none"}}></div>
        </div>
    )
}

export default LoadMore