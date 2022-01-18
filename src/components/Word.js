import React, { useState } from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ wordObj, sentence }) => {
    const [isHovering, setIsHovering] = useState(false)

    if (isHovering) {
        return (
            <span className='tooltip'>
                <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}>
                    {wordObj.word}
                </span>
                <WordDetails word={wordObj.word} sentence={sentence} />
            </span>
        )
    }

    return (
        <span className='tooltip'>
            <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                {wordObj.word}
            </span>
        </span>
    )
}

export default Word
