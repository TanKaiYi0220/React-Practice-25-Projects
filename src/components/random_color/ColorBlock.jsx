import React from 'react'

const ColorBlock = ({ color }) => {
    const backgroundStyle = { background: color };

    return (
        <div
            className="colorBlock"
            style={backgroundStyle}
        >
            <h1>{color}</h1>
        </div>
    )
}

export default ColorBlock