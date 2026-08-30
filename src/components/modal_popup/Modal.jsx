import React, { useState } from 'react'
import "./style.css"


const Modal = ({ id, body, onSaveChanges, onClose }) => {
    const [bodyText, setBodyText] = useState('');

    return (
        <div
            id={id || "Modal"}
            className="modalContainer">
            <div className="modalHeader">
                Header
            </div>
            <div className="modalBody">
                <input
                    onChange={(e) => { setBodyText(e.target.value) }}
                    placeholder={body}
                >
                </input>
            </div>
            <div className="modalFooter">
                Footer
                <button
                    onClick={() => { onSaveChanges(bodyText) }}
                    className="modalSaveChangesButton">
                    Save Changes
                </button>
                <button
                    onClick={onClose}
                    className="modalCloseButton">
                    Close
                </button>
            </div>
        </div>
    )
}

export default Modal