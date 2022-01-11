import React, { useState } from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ word, sentence }) => {
    const [isHovering, setIsHovering] = useState(false)
    console.log(isHovering)
    const space = '\xa0'

    // If end of sentence
    if (word === '.' || word === '!' || word === '?') {
        return <span>{word + space}</span>
    }

    // If non-word in sentence
    if (word === ',' || word === '-' || word === ':' || word === ';' || word === "'" || word === "’") {
        return <span>{word}</span>
    }

    if (word === ' ') {
        return <span>{space}</span>
    }

    if (isHovering) {
        return (
            <span className='tooltip'>
                <span className='word hover-highlight'
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>
                    {word}
                </span>
                <WordDetails word={word} sentence={sentence} />
            </span>
        )
    }

    return (
        <span className='tooltip'>
            <span className='word hover-highlight'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                {word}
            </span>
        </span>
    )

}

export default Word
