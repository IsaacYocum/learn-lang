import React, { useContext } from 'react'
import HeaderContext from '../contexts/HeaderContext'
import './Header.css'

const Header = () => {
    const { headerState } = useContext(HeaderContext)

    return (
        <div> 
            {headerState.title}
            {headerState.buttons 
                ? headerState.buttons.map(button => {
                    return button;
                })
                : null
            }
        </div>
    )
}

export default Header

