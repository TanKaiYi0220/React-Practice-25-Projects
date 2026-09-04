import React from 'react'

const SuggestionDropdown = ({ data, handleClicked }) => {
    return (
        <div className="suggestionDropdown">
            <ul>
                {
                    (data) 
                        ? data.map((item, index) => <li onClick={() => {handleClicked(item)}}key={index}>{item}</li>)
                        : null
                }
            </ul>
        </div>
    )
}

export default SuggestionDropdown