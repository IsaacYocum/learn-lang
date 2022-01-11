import React from 'react'
import './Word.css'

const WordDetails = ({ word, sentence }) => {
    return (
        <span className="tooltiptext">
            {word}
        </span>
    )
}

export default WordDetails