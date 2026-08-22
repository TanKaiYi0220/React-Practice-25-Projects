import React from 'react'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import "./style.css"

const QRCodeGenerator = () => {

    const [qrCode, setQrCode] = useState('');
    const [input, setInput] = useState('')

    function handleGenerateQRCode() {
        setQrCode(input)
    }

    return (
        <div className="qrCodeContainer">
            <h1>QR Code Generator</h1>
            <div className="qrCodeInfo">
                <input
                    className="qrCodeInput"
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    name="qr-code"
                    value={input}
                    placeholder="Enter your value here" />
                <button
                    className="qrCodeButton"
                    disabled={input && input.trim() != '' ? false : true}
                    onClick={() => handleGenerateQRCode()}>
                    Generate
                </button>
            </div>
            <div className="qrCode">
                <QRCode
                    id="qr-code'value"
                    value={qrCode}
                    size={400}
                    bgColor="#fff"
                />
            </div>
        </div>
    )
}

export default QRCodeGenerator