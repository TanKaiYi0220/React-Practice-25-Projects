import React, { useState } from 'react'
import "./style.css"
import UseFetch from './UseFetch'

const LIMIT_MIN = 1;

const UseFetchHome = () => {
    const [limit, setLimit] = React.useState(10);

    const { data, error, pending } = UseFetch(
        `https://dummyjson.com/products?limit=${limit}`,
        { method: "GET" }
    );

    console.log(error, data, pending);

    return (
        <div className="useFetchContainer">
            <input
                type="text"
                placeholder="Product Limit"
                value={limit}
                onChange={(e) => setLimit(Math.max(LIMIT_MIN, parseInt(e.target.value) || 0))}
            />
            {
                pending && <p>Loading...</p>
            }
            {
                data && data.products.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                    </div>
                ))
            }
        </div>
    )
}

export default UseFetchHome