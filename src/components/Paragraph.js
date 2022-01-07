import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import GS from '../globalSettings.json'

const Paragraph = ({ paragraph }) => {
    const [sentences, setSentences] = useState([])
    useEffect(() => {
        let regex = new RegExp(GS.sentenceRegex, "g")
        setSentences(sentences.concat(paragraph.match(regex)))
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
