import React from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ word, sentence }) => {
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

    return (
        <span className='tooltip'>
            <span className='word hover-highlight'>{word}</span>
            <WordDetails word={word} sentence={sentence}/>
        </span>
    )
}

export default Word
