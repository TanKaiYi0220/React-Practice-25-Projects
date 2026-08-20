import React, { useEffect } from 'react'
import { useState } from 'react'
import "./style.css"
import ProductCard from './ProductCard';

const LoadMore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    const productMaxLimit = 50;

    async function fetchProducts() {
        try {
            setLoading(true);
            const url = `https://dummyjson.com/products?limit=20&skip=${pageCount * 20}`
            const response = await fetch(url);
            const data = await response.json();

            setProducts(() => [...products, ...data.products].slice(0, productMaxLimit));
            console.log(data);
            // setProducts(data.products);
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [pageCount])

    useEffect(() => {
        if (products && products.length == productMaxLimit) {
            setDisableButton(true);
        }
    }, [products])

    return (
        <div className="loadMoreContainer">
            <div className="productContainer">
                {
                    (loading)
                        ? "Loading ..."
                        : products.map((item) => (<ProductCard key={item.id} item={item} />))
                }
            </div>

            <button
                disabled={disableButton}
                className="loadMoreButton"
                onClick={() => { setPageCount(pageCount + 1) }}>
                Load More
            </button>
        </div>
    )
}

export default LoadMore