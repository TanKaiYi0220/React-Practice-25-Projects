import React, { createContext, useState, useEffect } from 'react'
import featureFlagsDataServiceCall from '../data.js'

export const FeatureFlagContext = createContext()


function ContextComponent({ children }) {
    const [loading, setLoading] = useState(false);
    const [enabledFlags, setEnabledFlags] = useState({});

    async function fetchFeatureFlagsData() {
        setLoading(true);
        try {
            const response = await featureFlagsDataServiceCall();
            setEnabledFlags(response);
        } catch (error) {
            console.error('Error fetching feature flags:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchFeatureFlagsData();
    }, []);

    return (
        <FeatureFlagContext.Provider value={{ loading, enabledFlags }}>
            {children}
        </FeatureFlagContext.Provider>
    )
}

export default ContextComponent