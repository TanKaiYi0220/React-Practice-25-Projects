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
                        <div
                            key={index}
                            onClick={() => { handleTabClicked(index) }}>
                            <span className="tabLabel">{tabItem.label}</span>
                        </div>)
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