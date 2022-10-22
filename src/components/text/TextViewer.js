import React, { useEffect, useState } from 'react'
import '../../App.css'
import Sentence from '../Sentence'
import Word from '../Word'
import reactStringReplace from 'react-string-replace'
import './ViewText.css'
import Expression from '../Expression'

const TextViewer = ({ text, knownWords, setWordToEdit }) => {
    const [sentences, setSentences] = useState([])
    const [stringReplace, setStringReplace] = useState('')
    const [parsedSentences, setParsedSentences] = useState([])
    const [parsedText, setParsedText] = useState([])

    useEffect(() => {
        // Reduce the number of possible words to test for replacement
        // Sort whats left in descending order so expressions (multi-word words) are found first
        let sortedFilteredDescWords =
            Object.keys(knownWords)
                .filter(word => text.text.includes(word))
                .sort((a, b) => b.length - a.length);

        let listOfKnownWordObjects = {}

        let sentenceMatches = text.text.match(/\b[^.!?]+[.!?\n]+/g);
        console.log(sentenceMatches)

        let parsedText1 = text.text
        let isExpression = false;
        let regex;
        sortedFilteredDescWords.forEach((word, wordIndex) => {
            isExpression = word.includes(' ');
            if (isExpression) {
                regex = new RegExp(`(${word})`, "ig")
            } else {
                regex = new RegExp(`(\b${word})`, "ig")
            }

            parsedText1 = reactStringReplace(parsedText1, regex, (match, i) => {
                // console.log(match)
                if (isExpression) {
                    return <Expression key={match + wordIndex + i} word={match} wordObj={knownWords[match.toLowerCase()]} sentence={[]} expressionsList={[]} setWordToEdit={setWordToEdit} />
                }

                return <Word key={word + i} word={match} wordObj={knownWords[match.toLowerCase()]} sentence={[]} expressionsList={[]} setWordToEdit={setWordToEdit} />
            })
            // console.log(parsedText1)
        })

        parsedText1 = reactStringReplace(parsedText1, /(\w+'*’*\w*|\n)/g, (match, i) => {
            // console.log(match)
            if (match === '\n') {
                return (
                    <span>
                        <br></br>
                        <br></br>
                    </span>
                )
            }

            if (!/\w+/g.test(match)) {
                return <span>{match}</span>
            }

            return <Word key={match + i} word={match} wordObj={knownWords[match.toLowerCase()]} sentence={[]} expressionsList={[]} setWordToEdit={setWordToEdit} />
        })
        // console.log(parsedText1)

        // })
        setParsedText(parsedText1)
        console.log('done parsing')

    }, [text, knownWords, setWordToEdit])

    // let display = {<span>this is {word} sentence with the word {word} </span>}

    return (
        // null
        <div>{parsedText}</div>
        // parsedSentences.map(sentence => {
        //     return <span>{sentence}</span>
        // })
        // <div>
        //     {parsedSentence}
        //     <br></br>
        //     {stringReplace}
        // </div>
    )
}

export default TextViewer
