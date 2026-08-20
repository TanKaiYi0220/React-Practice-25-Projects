import React from 'react'
import MenuItem from './MenuItem'

const MenuList = ({ list = [] }) => {
    return (
        <ul className="menuListContainer">
            {
                (list)
                    ? (list).map((item, index) => (<MenuItem key={index} item={item} />))
                    : null
            }
        </ul>
    )
}

export default MenuList