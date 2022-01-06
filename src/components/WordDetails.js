import React from 'react'
import './WordDetails.css'

const WordDetails = ({ word }) => {
    return (
        <span className="tooltiptext">
            {word}
        </span>
    )
}

export default WordDetails