import React, { useState, useRef } from 'react'
import "./style.css"
import useOutsideClick from './useOnClickOutside'

const UseOnClickOutsideHome = () => {
    const ref = useRef();
    useOutsideClick(ref, () => {
        setShowContext(false)
    });

    const [showContext, setShowContext] = useState(false)

    return (
        <div className="useOnClickOutsideHomeContainer">
            {
                (showContext) ? (
                    <div className="contextMenu" ref={ref}>
                        <p>Context Menu</p>
                        <h1>Random Context is writing here, close this by clicking outside</h1>
                    </div>
                ) : (
                    <button onClick={() => setShowContext(true)}>Open Context Menu</button>
                )
            }
        </div>
    )
}

export default UseOnClickOutsideHome