import React, { useEffect, useState } from 'react'
import "./style.css"

const Modal = ({ id, body, onSaveChanges, onClose }) => {
    const [bodyText, setBodyText] = useState(body || "");

    function handleSaveChanges() {
        onSaveChanges(bodyText);
    }

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div
                id={id || "Modal"}
                className="modalContainer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => { e.stopPropagation() }}>
                <div className="modalHeader">
                    <div>
                        <p className="modalEyebrow">Quick Edit</p>
                        <h2 id="modal-title">Update Modal Body</h2>
                    </div>
                </div>

                <div className="modalBody">
                    <label className="modalInputLabel" htmlFor="modal-message">
                        Message
                    </label>

                    <input
                        id="modal-message"
                        className="modalTextarea"
                        onChange={(e) => { setBodyText(e.target.value) }}
                        placeholder="Write a short message...">
                    </input>

                    <p className="modalHelperText">
                        Click outside the modal to close.
                    </p>
                </div>

                <div className="modalFooter">
                    <button
                        type="button"
                        onClick={onClose}
                        className="modalCloseButton">
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="modalSaveChangesButton">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
