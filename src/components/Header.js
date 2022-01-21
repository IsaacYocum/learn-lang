import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = ({title, text}) => {
    const history = useHistory()

    const onHomeClick = () => {
        history.push(`/`)
    }

    const onViewTextsClick = () => {
        history.push(`/texts/viewtexts`)
    }

    const onEditClick = () => {
        history.push(`/texts/edittext/${text.textId}`)
    }

    if (text) {
        return (
            <div>
                {title}
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
        <div>
            {title}
            <br></br>
            <button onClick={onHomeClick}>Home</button>
            &nbsp;
            <button onClick={onViewTextsClick}>View Texts</button>
            <hr></hr>
        </div>
    )
}

export default Header
