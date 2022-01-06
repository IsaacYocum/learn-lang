import React, { useState, useEffect } from 'react'
import Sentence from './Sentence'
import GS from '../globalSettings.json'

const Paragraph = ({ paragraph }) => {
    const [sentences, setSentences] = useState([])
    useEffect(() => {
        let regex = new RegExp(`(?=[${GS.sentenceSplits}])`, "g")
        setSentences(sentences.concat(paragraph.split(regex)))
    }, [])

    return (
        <p>
            {sentences.map((sentence, i) => {
                return <Sentence key={i} sentence={sentence.trim()} />
            })}
        </p>
    )
}

export default Paragraph
