import React from 'react'
import "./style.css"
import useWindowResize from './useWindowResize'

const UseWindowResizeHome = () => {

    const windowSize = useWindowResize();
    const { width, height } = windowSize;

    return (
        <div className="useWindowResizeHomeContainer">
            UseWindowResizeHome
            <div>
                <p>Window Width: {width}</p>
                <p>Window Height: {height}</p>
            </div>
        </div>
    )
}

export default UseWindowResizeHome