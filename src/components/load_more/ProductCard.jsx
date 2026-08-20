import React from 'react'

const ProductCard = ({ item }) => {
    return (
        <div className="productCard">
            <h1>{item.id}</h1>
            <h2>{item.title}</h2>
            <img src={item.thumbnail} alt={item.title} />
        </div>
    )
}

export default ProductCard