import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import HeaderContext from '../contexts/HeaderContext'

const Header = () => {
    const { headerState } = useContext(HeaderContext)
    console.log(headerState)
    const history = useHistory()

    const onHomeClick = () => {
        history.push(`/`)
    }

    const onViewTextsClick = () => {
        history.push(`/texts`)
    }

    const onEditClick = () => {
        history.push(`/texts/edittext/${headerState.text.textId}`)
    }

    if (headerState.text) {
        return (
            <div className="header">
                {headerState.title}
                <br></br>
                <button onClick={onHomeClick}>Home</button>
                &nbsp;
                <button onClick={onViewTextsClick}>View Texts</button>
                &nbsp;
                <button onClick={onEditClick}>Edit</button>
                <hr></hr>
            </div>
        )
    }

    return (
        <div className="header">
            {headerState.title}
            <br></br>
            <button onClick={onHomeClick}>Home</button>
            &nbsp;
            <button onClick={onViewTextsClick}>View Texts</button>
            <hr></hr>
        </div>
    )
}

export default Header
