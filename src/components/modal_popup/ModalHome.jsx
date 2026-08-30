import React, { useState } from 'react'
import "./style.css"
import Modal from './Modal';

const ModalHome = () => {
    const [showModalPopup, setShowModalPopup] = useState(false);
    const [modalBody, setModalBody] = useState("No saved message yet.");

    function openModal() {
        setShowModalPopup(true);
    }

    function saveModalBody(newBody) {
        setModalBody(newBody);
    }

    function closeModal() {
        setShowModalPopup(false);
    }

    return (
        <div className="modalHomeContainer">
            <div className="modalHomeTitle">
                <h1>Modal Home</h1>
            </div>
            <div className="modalSavedPreview">
                <strong>{modalBody}</strong>
            </div>
            <button
                className="modalPopupButton"
                onClick={openModal}>
                Open Modal Popup
            </button>
            {
                (showModalPopup)
                    ? <Modal
                        id={0}
                        body={modalBody}
                        onSaveChanges={setModalBody}
                        onClose={closeModal} />
                    : null
            }
        </div>
    )
}

export default ModalHome