import React, { useState } from 'react'
import WordDetails from './WordDetails'

const Word = ({ word }) => {
    const [showWordDetails, setShowWordDetails] = useState(false)

    if (showWordDetails) {
        console.log(`mouse enter! ${word}`)
    }

    return (
        <div style={{ display: 'inline' }}>
            <WordDetails word={word} show={showWordDetails}/>
            <span
                onMouseEnter={() => setShowWordDetails(true)}
                onMouseLeave={() => setShowWordDetails(false)}>
                {word}&nbsp;
            </span>
        </div>
    )
}

export default Word
