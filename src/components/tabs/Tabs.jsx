import React, { useState } from 'react'
import "./style.css"

const Tabs = ({ tabsContent, onChange }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    function handleTabClicked(getCurrentIndex) {
        setCurrentTabIndex(getCurrentIndex);
        onChange(getCurrentIndex);
    }

    return (
        <div className="tabWrapper">
            <div className="tabHeading">

                {
                    tabsContent.map((tabItem, index) =>
                        <button
                            key={index}
                            className={currentTabIndex === index ? "tabItem active" : "tabItem"}
                            onClick={() => { handleTabClicked(index) }}>
                            <span className="tabLabel">{tabItem.label}</span>
                        </button>)
                }
            </div>
            <div className="tabContent">
                {
                    tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content
                }
            </div>
        </div>
    )
}

export default Tabs