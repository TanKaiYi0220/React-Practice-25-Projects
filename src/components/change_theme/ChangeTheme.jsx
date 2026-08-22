import React from 'react'
import "./style.css"
import useLocalStorage from './useLocalStorage'

const ChangeTheme = () => {
    const [theme, setTheme] = useLocalStorage("theme", "dark");

    function handleToggleTheme() {
        setTheme(theme == "light" ? "dark" : "light");
    }

    console.log(theme);

    return (
        <div className="changeThemeContainer" data-theme={theme}>
            <div className="contextContainer">
                <p>Hello World!</p>
                <button className="changeThemeButton" onClick={() => { handleToggleTheme() }}>Change Theme</button>
            </div>
        </div>
    )
}

export default ChangeTheme