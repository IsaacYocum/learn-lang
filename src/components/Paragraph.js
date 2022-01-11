import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import GS from '../globalSettings.json'

const Paragraph = ({ paragraph }) => {
    const [sentences, setSentences] = useState([])
    useEffect(() => {
        let regex = new RegExp(GS.sentenceRegex, "g")
        // console.log('sentences', paragraph.split(/(?!Mrs.|Mr.)(?<=[.!?:;])/g))
        let matches = paragraph.split(/(?<=[.!?:;])/g);
        setSentences(sentences.concat(matches))
    }, [setSentences])

    return (
        <p>
            {sentences.map((sentence, i) => {
                if (sentence !== " ") {
                    return <Sentence key={i} sentence={sentence.trim()} />
                }
            })}
        </p>
    )
}

export default Paragraph
