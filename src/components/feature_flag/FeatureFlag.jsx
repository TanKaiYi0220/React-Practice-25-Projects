import React, { useContext } from 'react'
import "./style.css"
import ChangeTheme from '../change_theme/ChangeTheme'
import TicTacToe from '../tic_tac_toe/TicTacToe'
import RandomColorGenerator from '../random_color/RandomColor'
import Accordion from '../accordion/Accordion'
import TreeView from '../tree-view/TreeView'
import { FeatureFlagContext } from './context/ContextComponent'

const FeatureFlag = () => {
    const { loading, enabledFlags } = useContext(FeatureFlagContext);


    const componentsToRender = [
        {
            key: "showLightAndDarkMode",
            component: <ChangeTheme />
        },
        {
            key: "showTicTacToe",
            component: <TicTacToe />
        },
        {
            key: "showRandomColorGenerator",
            component: <RandomColorGenerator />
        },
        {
            key: "showAccordian",
            component: <Accordion />
        },
        {
            key: "showTreeView",
            component: <TreeView />
        }
    ]

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="featureFlagContainer">
            FeatureFlag
            {
                componentsToRender.map(({ key, component }) => {
                    if (enabledFlags[key]) {
                        return <div key={key}>{component}</div>
                    }
                })
            }
        </div>
    )
}

export default FeatureFlag