import React from 'react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'


const StarRow = ({ numberStars }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const starSize = 40;

    const isActive = ({ index }) => {
        return index <= (hover || rating) ? "active" : "inactive";
    }

    function handleStarClick(getCurrentIndex) {
        setRating(getCurrentIndex);
    }

    function handleStarMouseEnter(getCurrentIndex) {
        setHover(getCurrentIndex);
    }

    function handleStarMouseLeave() {
        setHover(rating);
    }

    return (
        <div className="starRow">
            {
                [...Array(numberStars)].map((_, index) => {
                    const rateIndex = index + 1;
                    return <FaStar
                        key={index}
                        className={rateIndex <= (hover || rating) ? "active" : "inactive"}
                        onClick={() => { handleStarClick(rateIndex) }}
                        onMouseMove={() => { handleStarMouseEnter(rateIndex) }}
                        onMouseLeave={() => { handleStarMouseLeave() }}
                        size={starSize}
                    />
                })
            }
        </div>
    )
}

export default StarRow