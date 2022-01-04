import React from 'react'
import WordDetails from './WordDetails'
import './WordDetails.css'

const Word = ({ word }) => {
    // Remove punctuation from words
    let punctuation = '';
    if (word.includes('.')) {
        punctuation = '.';
        word = word.replace('.', '')
    }

    if (word.includes(',')) {
        punctuation = ',';
        word = word.replace(',', '')
    }

    if (word.includes(';')) {
        punctuation = ';';
        word = word.replace(';', '')
    }

    if (word.includes(':')) {
        punctuation = ':';
        word = word.replace(':', '')
    }

    return (
        <div className='tooltip'>
            <WordDetails word={word} />
            <span>
                <span className='hover-highlight'>{word}</span>
                {punctuation}
                &nbsp;
            </span>
        </div>
    )
}

export default Word
