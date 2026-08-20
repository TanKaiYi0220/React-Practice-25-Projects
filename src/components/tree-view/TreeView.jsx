import React, { useState } from 'react'
import "./style.css"
import MenuList from './MenuList'
import menus from "./data.js"

const TreeView = () => {
    const [expandedItems, setExpandedItems] = useState({});

    function handleToggle(itemLabel) {
        setExpandedItems((currentExpandedItems) => ({
            ...currentExpandedItems,
            [itemLabel]: !currentExpandedItems[itemLabel],
        }))
    }

    console.log(expandedItems);

    return (
        <div className="treeViewContainer">
            <MenuList
                list={menus}
                expandedItems={expandedItems}
                handleToggle={handleToggle} />
        </div>
    )
}

export default TreeView