import React from 'react'
import './Word.css'

const WordDetails = ({ word }) => {
    return (
        <span className="tooltiptext">
            {word}
        </span>
    )
}

export default WordDetails