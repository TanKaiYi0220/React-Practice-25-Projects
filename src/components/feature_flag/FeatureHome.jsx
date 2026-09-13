import React from 'react'
import ContextComponent from './context/ContextComponent'
import FeatureFlag from './FeatureFlag'

const FeatureHome = () => {
    return (
        <ContextComponent>
            <FeatureFlag />
        </ContextComponent>
    )
}

export default FeatureHome