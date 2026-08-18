import React, { useEffect } from 'react'
import { useState } from 'react'
import "./style.css"
import ColorBlock from './ColorBlock'

const RandomColor = () => {
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState([]);
    const [numBlocks, setNumBlocks] = useState(4);

    function randomIndex(length) {
        return Math.floor(Math.random() * length);
    }

    function generateRandomColor() {
        typeOfColor == "hex" ? generateRandomHexColor() : generateRandomRgbColor();
    }

    function generateRandomHexColor() {
        let blocks = [];
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

        for (let j = 0; j < numBlocks; j++) {
            let hexColor = "#";

            for (let i = 0; i < 6; i++) {
                hexColor += hex[randomIndex(hex.length)];
            }

            blocks.push(hexColor);
        }

        setColor(blocks);
    }

    function generateRandomRgbColor() {
        let blocks = [];

        for (let j = 0; j < numBlocks; j++) {

            const r = randomIndex(256);
            const g = randomIndex(256);
            const b = randomIndex(256);

            blocks.push(`rgb(${r},${g},${b})`);
        }

        setColor(blocks);
    }

    useEffect(() => {
        generateRandomColor();
    }, [typeOfColor])

    return (
        <div
            className="colorContainer"
        >
            <div className="colorButton"
            >
                <button onClick={() => { setTypeOfColor("hex") }}>Create HEX Color</button>
                <button onClick={() => { setTypeOfColor("rgb") }}>Create RGB Color</button>
                <button onClick={() => { generateRandomColor() }}>Generate Random Color</button>
            </div>
            <div className="colorSlider">
                <input
                    id="number-slider"
                    type="range"
                    min="1"        // Minimum allowed value
                    max="10"      // Maximum allowed value
                    step="1"       // Stepped increment size
                    value={numBlocks}  // Binds the slider position to React state
                    onChange={
                        (event) => {
                            setNumBlocks(Number(event.target.value))
                        }
                    }
                    style={{ width: '100%', cursor: 'pointer' }}
                />
                <p>{numBlocks}</p>
            </div>
            <div className="colorInfo">
                <h3>{typeOfColor == "hex" ? "Hex Color" : "RGB Color"}</h3>
                <>
                    {
                        color.map((c, index) => (
                            <ColorBlock key={index} color={c}></ColorBlock>
                        ))
                    }
                </>
            </div>
        </div>
    )
}

export default RandomColor