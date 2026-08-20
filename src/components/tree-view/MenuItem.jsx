import React, { useState } from 'react'
import MenuList from './MenuList'
import { FaMinus, FaPlus } from 'react-icons/fa'

const MenuItem = ({ item, itemKey, expandedItems, handleToggle }) => {
    const isExpanded = expandedItems[itemKey] === true;

    const hasChildren = (item) => {
        return item.children && item.children.length > 0;
    }

    return (
        <li className="menuItemContainer">
            <div className="menuItem">
                <p>{item.label}</p>
                {
                    (hasChildren(item))
                        ? <span onClick={() => { handleToggle(itemKey) }}>
                            {
                                (isExpanded)
                                    ? <FaMinus className="collapseButton" />
                                    : <FaPlus className="expandButton" />
                            }
                        </span>
                        : null
                }
            </div>

            {
                (hasChildren(item) && isExpanded)
                    ? <MenuList
                        list={item.children}
                        parentKey={itemKey}
                        expandedItems={expandedItems}
                        handleToggle={handleToggle}
                    />
                    : null
            }

        </li>
    )
}

export default MenuItem