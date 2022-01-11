import React from 'react'
import './Word.css'

const WordDetails = ({ word, sentence }) => {
    return (
        <span className="tooltiptext">
            <p>{word}</p>
        </span>
    )
}

export default WordDetails