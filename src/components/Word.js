import React from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ word, addSpace, punctuation }) => {
    if (word.includes(".")) console.log(". found!", word)
    let punc = punctuation ? punctuation : ''
    let space = addSpace ? '\xa0' : '';

    return (
        <span className='tooltip'>
            <span className='word hover-highlight'>{word}</span>
            {punc}
            {space}
            <WordDetails word={word} />
        </span>
    )
}

export default Word
