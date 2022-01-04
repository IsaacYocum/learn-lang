import React from 'react'
import './WordDetails.css'

const WordDetails = ({ word }) => {
    return (
        <div>
            <span className="tooltiptext">
                {word}
            </span>
        </div>
    )
}

export default WordDetails