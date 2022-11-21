import React, { useEffect, useState } from 'react'
import '../../App.css'
import Sentence from '../Sentence'
import './ViewText.css'

const TextViewer = ({ text, knownWords, setWordToEdit }) => {
    const [sentences] = useState(text.text.match(/[^.!?]+[.!?]+/g))
    const [sortedFilteredDescExpressions, setSortedFilteredDescExpressions] = useState([])

    useEffect(() => {
        // Reduce the number of possible words to test for replacement
        // Sort whats left in descending order so expressions (multi-word words) are found first
        setSortedFilteredDescExpressions(
            Object.keys(knownWords.expressions)
                .filter(expression => text.text.toLowerCase().includes(expression))
                .sort((a, b) => b.length - a.length)
        )

        console.log('TextView useEffect done parsing')
    }, [text, knownWords, setWordToEdit])

    return (
        <>
            {sentences.map((sentence, i) => {
                return <Sentence
                    key={i}
                    sentenceString={sentence}
                    setWordToEdit={setWordToEdit}
                    knownWords={knownWords}
                    filteredExpressions={sortedFilteredDescExpressions}
                    language={text.language}
                />
            })}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </>
    )
}

export default TextViewer
