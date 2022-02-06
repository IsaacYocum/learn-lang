import React, { useState } from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ wordObj, sentence, setWordToEdit }) => {
    console.log(wordObj)
    const [isHovering, setIsHovering] = useState(false)

    const handleWordClick = () => {
        console.log('Clicked on: ', wordObj)
        setWordToEdit(wordObj)
    }

    if (isHovering) {
        return (
            <span className='tooltip'>
                <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                    onClick={handleWordClick}>
                    {wordObj.word}
                </span>
                <WordDetails word={wordObj} sentence={sentence} />
            </span>
        )
    }

    return (
        <span className='tooltip'>
            <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleWordClick}>
                {wordObj.word}
            </span>
        </span>
    )
}

export default Word
