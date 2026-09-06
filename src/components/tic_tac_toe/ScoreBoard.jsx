import React from 'react'

const ScoreBoard = ({ scores }) => {
    return (
        <section className="scoreBoard">
            <div className="sidebarHeader">
                <p>Match</p>
                <h2>Score Board</h2>
            </div>

            <div className="scoreList">
                <div className="scoreCard xScoreCard">
                    <span>X Wins</span>
                    <strong>{scores.X}</strong>
                </div>
                <div className="scoreCard oScoreCard">
                    <span>O Wins</span>
                    <strong>{scores.O}</strong>
                </div>
                <div className="scoreCard drawScoreCard">
                    <span>Draws</span>
                    <strong>{scores.draws}</strong>
                </div>
            </div>
        </section>
    )
}

export default ScoreBoard
