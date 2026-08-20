import React from 'react'
import "./style.css"
import MenuList from './MenuList'
import menus from "./data.js"

const TreeView = () => {
    return (
        <div className="treeViewContainer">
            <MenuList list={menus} />
        </div>
    )
}

export default TreeView