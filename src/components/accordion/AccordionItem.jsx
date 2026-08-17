import React from 'react'



const AccordionItem = ({ item, handleSelection, handleActive }) => {
    return (
        <div onClick={() => handleSelection(item.id)} className="accordionItem">
            <h3>{item.question}</h3>
            <span>+</span>
            <h3>
                {
                    (handleActive(item.id)) ? <p>{ item.answer }</p> : <p>Hidden</p>
                }
            </h3>
        </div>
    )
}

export default AccordionItem