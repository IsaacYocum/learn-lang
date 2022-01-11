import React, { useState, useEffect } from 'react'
import './Word.css'

const WordDetails = ({ word, sentence }) => {
    const [wordDetails, setWordDetails] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3001/api/languages/english/words/${word.toLowerCase()}`)
            .then(r => r.text())
            .then(wordJsonStr => {
                let wordJson = JSON.parse(wordJsonStr)
                setWordDetails(wordJson)
            })
    }, [])

    return (
        <span className="tooltiptext">
            {word}
            <br></br>
            {wordDetails.language}
            <br></br>
            <a>Translate Sentence</a>
        </span>
    )
}

export default WordDetails