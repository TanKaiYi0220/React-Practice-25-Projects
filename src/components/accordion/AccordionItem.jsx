import React from 'react'



const AccordionItem = ({ item, handleSelection, handleActive }) => {
    const isActive = handleActive(item.id);

    return (
        <div onClick={() => handleSelection(item.id)} className={`accordionItem ${isActive ? 'active' : ''}`}>
            <h3>{item.question}</h3>
            <span>{(isActive) ? '-' : '+'}</span>
            <h3>
                {
                    (isActive) ? <p>{item.answer}</p> : ''
                }
            </h3>
        </div>
    )
}

export default AccordionItem