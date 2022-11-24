import React, { useContext } from 'react'
import HeaderContext from '../contexts/HeaderContext'
import './Header.css'

const Header = () => {
    const { headerState } = useContext(HeaderContext)

    return (
        <div> 
            {headerState.title}
        </div>
    )
}

export default Header

