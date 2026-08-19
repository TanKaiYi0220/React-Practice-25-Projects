import React from 'react'
import { useState } from 'react'
import "./style.css"
import StarRow from './StarRow'

const StarRating = ({ numberStars = 5 }) => {
    return (
        <div className="starContainer">
            <div className="ContextCard">
                <h1>Codex</h1>
                <StarRow numberStars={numberStars} />
            </div>

            <div className="ContextCard">
                <h1>Claude Code</h1>
                <StarRow numberStars={numberStars} />
            </div>
        </div>
    )
}

export default StarRating