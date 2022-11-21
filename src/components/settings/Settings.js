import React, { useContext, useEffect } from 'react'
import HeaderContext from '../../contexts/HeaderContext'

export const Settings = () => {
    const { setHeaderState } = useContext(HeaderContext);

    useEffect(() => {
        setHeaderState({
            title: 'Settings'
        })
    }, [setHeaderState])

    return (
        <div>Settings</div>
    )
}
