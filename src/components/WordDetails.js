import React, { useState, useEffect } from 'react'
import './Word.css'

const WordDetails = ({ word, sentence }) => {
    const [wordDetails, setWordDetails] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3001/api/languages/english/words/${word.toLowerCase()}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error(`No translation for ${word}`)
                }
            })
            .then(wordJson => {
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