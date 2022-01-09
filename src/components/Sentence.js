import React, { useState, useEffect } from 'react'
import Word from './Word'
import GS from '../globalSettings.json'

const Sentence = ({ sentence }) => {
    console.log('sentence', sentence)
    const [words, setWords] = useState([])
    useEffect(() => {
        let regex = new RegExp(GS.englishWordRegex, "g")
        console.log(sentence.match(regex))
        setWords(words.concat(sentence.match(regex)))
    }, [setWords])

    return (
        <>
            {words.map((word, i) => {
                word = word.trim()
                let addSpace = true;
                let isPunctuation = false;
                let nextWord = words[i + 1]
                let nextWordIsPunctuation = false;
                let punctuation;

                if (word.includes(".") || word === ',') {
                    isPunctuation = true;
                }

                if (nextWord) {
                    if (nextWord.includes(".") || nextWord === ',') {
                        if (word.includes(".")) console.log(". found!", word)
                        addSpace = true;
                        nextWordIsPunctuation = true;
                        punctuation = nextWord;
                    }
                }

                if (nextWordIsPunctuation) {
                    return <Word key={i} word={word} addSpace={addSpace} punctuation={punctuation} />
                }

                if (!isPunctuation) {
                    return <Word key={i} word={word} addSpace={addSpace} />
                }

                return null;
            })}
        </>
    )
}

export default Sentence
