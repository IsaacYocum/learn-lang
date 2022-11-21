import React, { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import Word from './Word'
import Expression from './Expression';

const Sentence = ({ sentenceString, setWordToEdit, knownWords, filteredExpressions, language }) => {
    const [parsedSentence, setParsedSentence] = useState([])

    useEffect(() => {
        let sentenceToParse = sentenceString

        // Parse expressions
        filteredExpressions.forEach((expression, wordIndex) => {
            let regex = new RegExp(`(${expression})`, "ig")
            sentenceToParse = reactStringReplace(sentenceToParse, regex, (match, i) => {
                return <Expression
                    key={match + wordIndex + i}
                    word={match}
                    wordObj={knownWords.expressions[match.toLowerCase()]}
                    sentence={replaceWordInSentence(match, sentenceString)}
                    expressionsList={[]}
                    setWordToEdit={setWordToEdit}
                />
            })
        })

        // Parse everything else
        sentenceToParse = reactStringReplace(sentenceToParse, /(\w+'*’*\w*|\n| )/gi, (match, i) => {
            // Handle new lines
            if (match === '\n') {
                return (<br key={'newline' + match + i}></br>)
            }

            // Handle anything else that isn't a word
            if (!/\w+/g.test(match)) {
                return <span key={'notAWord' + match + i + Math.random()}>{match}</span>
            }

            // Everything past this point should be a single-word word
            let wordObj;
            if (knownWords.words[match.toLowerCase()]) {
                wordObj = knownWords.words[match.toLowerCase()]
            } else {
                wordObj = {
                    "word": match,
                    "familiarity": 0,
                    "translation": "unknown",
                    "language": language
                }
            }

            // Handle word
            return <Word
                key={match + i}
                word={match}
                wordObj={wordObj}
                sentence={replaceWordInSentence(match, sentenceString)}
                expressionsList={[]}
                setWordToEdit={setWordToEdit} />
        })

        setParsedSentence(sentenceToParse)

    }, [sentenceString, knownWords, filteredExpressions, language, setWordToEdit])

    const replaceWordInSentence = (word, sentence) => {
        let regex = new RegExp(`(${word})`)
        return sentence.replace(regex, '{$1}').trim()
    }

    return (
        <span>
            {parsedSentence}
            &nbsp;
        </span>
    );
};

export default Sentence;
