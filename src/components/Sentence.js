import React, { useState, useEffect } from 'react'
import Word from './Word'
import GS from '../globalSettings.json'

const Sentence = ({ sentence }) => {
    const [words, setWords] = useState([])
    useEffect(() => {
        let regex = new RegExp(`(?![${GS.wordSplits}]+)`, "g")
        setWords(words.concat(sentence.split(regex)))
    }, [])

    const punctuations = ['.', ',', ';', ':']

    return (
        <>
            {words.map((word, i) => {
                let isPunctuation = false;
                let addSpace = false;

                punctuations.forEach(punctuation => {
                    console.log(words[i + 1], punctuation)
                    if (words[i + 1] === punctuation) {
                        isPunctuation = true;
                        addSpace = false;
                    } else {
                        isPunctuation = false;
                        addSpace = true;
                    }
                })
                console.log('nextWord', words[i + 1])
                console.log('isPunctuation', isPunctuation)
                console.log('addSpace', addSpace)

                return <Word key={i} word={word.trim()} isPunctuation={isPunctuation} addSpace={addSpace} />
            })}
        </>
    )
}

export default Sentence
