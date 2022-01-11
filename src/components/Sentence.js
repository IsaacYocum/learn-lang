import React, { useState, useEffect } from 'react'
import Word from './Word'
import GS from '../globalSettings.json'

const Sentence = ({ sentence }) => {
    // console.log('sentence', sentence)
    const [words, setWords] = useState([])

    useEffect(() => {
        let regex = new RegExp(GS.englishWordRegex, "g")
        // console.log(sentence.match(/(\w+|\.|,|!|\?| |&)/g))
        setWords(words.concat(sentence.match(/(\w+|\.|,|!|\?| |&|’|')/g)))
    }, [setWords])
    

    if (words !== null) {
        return (
            <>
                {words.map((word, i) => {
                    if (word !== null) {
                        return <Word key={i} word={word} sentence={sentence} />
                    }

                    return null;
                })}
            </>
        )
    }
    return null;
}

export default Sentence
