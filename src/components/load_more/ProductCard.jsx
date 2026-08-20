import React from 'react'

const ProductCard = ({ item }) => {
    return (
        <div className="productCard">
            <h1>{item.title}</h1>
            <img src={item.thumbnail} alt={item.title} />
        </div>
    )
}

export default ProductCard