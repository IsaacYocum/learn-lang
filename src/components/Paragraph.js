import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import GS from '../globalSettings.json'

const Paragraph = ({ paragraph }) => {
    const [sentences, setSentences] = useState([])
    useEffect(() => {
        let regex = new RegExp(GS.sentenceRegex, "g")
        console.log('sentences', paragraph.match(/(.+?([A-Z].)\.(?:['")\\\s][\"]?)+?\s?)/igm))
        let matches = paragraph.match(/(.+?([A-Z].)\.(?:['")\\\s]["]?)+?\s?)/igm);
        setSentences(sentences.concat(matches))
    }, [setSentences])

    return (
        <p>
            {sentences.map((sentence, i) => {
                return <Sentence key={i} sentence={sentence.trim()} />
            })}
        </p>
    )
}

export default Paragraph
