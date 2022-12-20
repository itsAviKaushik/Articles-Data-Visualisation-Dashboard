import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function GeneralSettings() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <></>
    )
}

export default GeneralSettings