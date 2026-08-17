import React from 'react'
import { useState } from 'react'
import data from './data'
import AccordionItem from './AccordionItem'

const Accordion = () => {
  const [selected, setSelected] = useState(null)
  const [enabledMultiSelection, setEnabledMultiSelection] = useState(false);
  const [multiSelected, setMultiSelected] = useState([])

  function handleSelection(getCurrentId) {
    console.log(enabledMultiSelection);
    if (enabledMultiSelection) {
      console.log("Multi Selection");
      handleMultiSelection(getCurrentId);
    } else {
      console.log("Single Selection");
      handleSingleSelection(getCurrentId);
    }
  }

  function handleSingleSelection(getCurrentId) {
    console.log(`'clicked ${getCurrentId}'`);
    setSelected(selected == getCurrentId ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiSelected = [...multiSelected]
    const findIndexOfCurrentId = cpyMultiSelected.indexOf(getCurrentId);
    if (findIndexOfCurrentId == -1) cpyMultiSelected.push(getCurrentId)
    else cpyMultiSelected.splice(findIndexOfCurrentId, 1)

    setMultiSelected(cpyMultiSelected)
  }

  function handleActive(getCurrentId){
    if (enabledMultiSelection){
      return multiSelected.indexOf(getCurrentId) != -1
    }
    else{
      return selected == getCurrentId
    }
  }

  return (
    <div className="accordionWrapper">
      <div className="accordion">
        <h1>Accordion</h1>
        <button onClick={() => setEnabledMultiSelection(!enabledMultiSelection)}>Enable Multi Selection</button>

        <>
          {
            (data && data.length > 0) ?
              data.map((item) => (
                <AccordionItem key={item.id} item={item} handleSelection={handleSelection} handleActive={handleActive}/>
              )) :
              <p>No data available</p>
          }
        </>

      </div>
    </div>
  )
}

export default Accordion