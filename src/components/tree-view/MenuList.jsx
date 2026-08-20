import React from 'react'
import MenuItem from './MenuItem'

const MenuList = ({ list = [], parentKey, expandedItems, handleToggle }) => {

    return (
        <ul className="menuListContainer">
            {
                (list)
                    ? (list).map(
                        (item, index) => {
                            const itemKey = (parentKey) ? `${parentKey}/${item.label}` : item.label;

                            return <MenuItem
                                key={index}
                                itemKey={itemKey}
                                item={item}
                                expandedItems={expandedItems}
                                handleToggle={handleToggle} />
                        })
                    : null
            }
        </ul>
    )
}

export default MenuList