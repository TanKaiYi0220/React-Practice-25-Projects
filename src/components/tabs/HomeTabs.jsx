import React from 'react'
import "./style.css"
import Tabs from './Tabs'

const HomeTabs = () => {
    const tabs = [
        {
            label: "Tab 1",
            content: randomComponent(0)
        },
        {
            label: "Tab 2",
            content: randomComponent(1)
        },
        {
            label: "Tab 3",
            content: randomComponent(2)
        }
    ]

    function randomComponent(getCurrentIndex){
        const random = Math.floor(Math.random() * (10)) + 1;
        return <h1>Random Number for Tab {getCurrentIndex} = {random}</h1>;
    };

    function handleChangeTabs(currentTabIndex) {
        tabs[currentTabIndex].content = randomComponent(currentTabIndex);
    }

    return (
        <div className="tabsContainer">
            <Tabs tabsContent={tabs} onChange={handleChangeTabs} />
        </div>
    )
}

export default HomeTabs