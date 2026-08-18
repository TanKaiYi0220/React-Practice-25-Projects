import React, { useEffect } from 'react'
import { useState } from 'react'
import "./style.css"

const RandomColor = () => {
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState("#222222");

    const backgroundStyle = { background: color };

    function randomIndex(length) {
        return Math.floor(Math.random() * length);
    }

    function generateRandomColor() {
        typeOfColor == "hex" ? generateRandomHexColor() : generateRandomRgbColor();
    }

    function generateRandomHexColor() {
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";

        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomIndex(hex.length)];
        }

        setColor(hexColor);
    }

    function generateRandomRgbColor() {
        const r = randomIndex(256);
        const g = randomIndex(256);
        const b = randomIndex(256);

        setColor(`rgb(${r},${g},${b})`);
    }

    useEffect(() => {
        generateRandomColor();
    }, [typeOfColor])

    return (
        <div
            className="colorContainer"
            style={backgroundStyle}
        >
            <button onClick={() => { setTypeOfColor("hex") }}>Create HEX Color</button>
            <button onClick={() => { setTypeOfColor("rgb") }}>Create RGB Color</button>
            <button onClick={() => { generateRandomColor() }}>Generate Random Color</button>
            <div className="colorInfo">

                <h3>{typeOfColor == "hex" ? "Hex Color" : "RGB Color"}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    )
}

export default RandomColor