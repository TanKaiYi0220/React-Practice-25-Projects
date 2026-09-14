import React, { useState, useEffect } from 'react'

function UseFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    async function fetchData() {
        setPending(true);
        try {
            const response = await fetch(url, { ...options });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            setData(result);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);


    return { data, error, pending }
}

export default UseFetch