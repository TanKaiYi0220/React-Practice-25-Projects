import React, { useState } from 'react'
import "./style.css"
import Modal from './Modal';

const ModalHome = () => {
    const [showModalPopup, setShowModalPopup] = useState(false);
    const [modalBody, setModalBody] = useState("");

    function saveModalBody(newBody){
        setModalBody(newBody);
    }
    
    function closeModal(){
        setShowModalPopup(false);
    }

    return (
        <div className="modalHomeContainer">
            <div className="modalHomeTitle">
                <h1>Modal Home</h1>
            </div>
            <button
                className="modalPopupButton"
                onClick={() => { setShowModalPopup(!showModalPopup) }}>
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