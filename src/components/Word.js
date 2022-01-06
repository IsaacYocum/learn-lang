import React from 'react'
import WordDetails from './WordDetails'
import './WordDetails.css'

const Word = ({ word, isPunctuation, addSpace }) => {
    let space = addSpace ? '\xa0' : null;

    if (isPunctuation) {
        return <>{word + ' '}</>
    }

    return (
        <span className='tooltip hover-highlight'>
            {word}
            <WordDetails word={word} />
            {space}
        </span>
    )
}

export default Word
