import React, { useState } from 'react'
import MenuList from './MenuList'
import { FaMinus, FaPlus } from 'react-icons/fa'

const MenuItem = ({ item }) => {
    const [currentChild, setCurrentChild] = useState({});

    const hasChildren = (item) => {
        return item.children && item.children.length > 0;
    }

    function handleToggleChildren(getCurrentLabel) {
        setCurrentChild({
            ...currentChild,
            [getCurrentLabel]: !currentChild[getCurrentLabel]
        })
    }

    console.log(currentChild);

    return (
        <li className="menuItemContainer">
            <div className="menuItem">
                <p>{item.label}</p>
                {
                    (hasChildren(item))
                        ? <span onClick={() => { handleToggleChildren(item.label) }}>
                            {
                                (currentChild[item.label]) 
                                    ? <FaMinus className="collapseButton"/> 
                                    : <FaPlus className="expandButton"/>
                            }
                        </span>
                        : null
                }
            </div>

            {
                (hasChildren(item) && currentChild[item.label])
                    ? <MenuList list={item.children} />
                    : null
            }

        </li>
    )
}

export default MenuItem