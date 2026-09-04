import React from 'react'

const SuggestionDropdown = ({ data, handleClicked }) => {
    return (
        <div className="suggestionDropdown">
            <ul className="suggestionList">
                {
                    (data && data.length > 0)
                        ? data.map((item, index) => (
                            <li className="suggestionItem" key={`${item}-${index}`}>
                                <button
                                    type="button"
                                    className="suggestionButton"
                                    onClick={() => { handleClicked(item) }}>
                                    {item}
                                </button>
                            </li>
                        ))
                        : <li className="suggestionEmpty">No matching users found</li>
                }
            </ul>
        </div>
    )
}

export default SuggestionDropdown