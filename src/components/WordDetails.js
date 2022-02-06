import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './Word.css'

const WordDetails = ({ word, sentence }) => {
    const [wordDetails, setWordDetails] = useState({})
    useEffect(() => {
        axios.get(`/api/languages/${word.language}/words/${word.word.toLowerCase()}`)
            .then(resp => {
                console.log('wordDetails', resp)
                if (resp.status === 200) {
                    setWordDetails(resp.data)
                }
            })
            .catch(() => {
                let unknown = {
                    "word": word.word,
                    "familiarity": 0,
                    "translation": "unknown"
                }
                setWordDetails(unknown)
            })
    }, [word])

    return (
        <span className="tooltiptext">
            {word.word}
            <br></br>
            {wordDetails.translation}
            <br></br>
            Familiarity: {word.familiarity}
            {/* <br></br>
            <a href="https://translate.google.com" target="_blank" rel="noopener noreferrer">Translate Sentence</a> */}
        </span>
    )
}

export default WordDetails