import React, { useEffect, useState } from 'react';
import Word from './Word'

const Sentence = ({ sentenceArr, setWordToEdit, knownWords, language }) => {
    const [sentence] = useState(sentenceArr)
    const [sentenceString, setSentenceString] = useState('')
    const [expressionsList, setExpressionsList] = useState([])

    useEffect(() => {
        let sentenceStr = ''
        let expressionsLi = []
        let skipIndex = -1;
        sentence.forEach((word, i) => {
            sentenceStr = sentenceStr + word

            if (!/[ .,-]/g.test(word)) {
                if (skipIndex !== i) {
                    let tmpWord = word
                    if (word === "'" && /[a-z]+/g.test(sentence[i + 1])) {
                        tmpWord = tmpWord + sentence[i + 1]
                        skipIndex = i + 1
                    }
                    expressionsLi.push(tmpWord)
                }
            }
        })
        setSentenceString(sentenceStr.trim())
        setExpressionsList(expressionsLi)
    }, [sentence])

    return (
        <span>
            {sentence.map((word, i) => {
                if (/\w+/gi.test(word)) { // handle words
                    if (knownWords[word.toLowerCase().trim()]) {
                        return <Word key={i}
                            word={word}
                            wordObj={knownWords[word.toLowerCase().trim()]}
                            sentence={sentenceString}
                            expressionsList={expressionsList}
                            setWordToEdit={setWordToEdit} />
                    } else {
                        let unknownWordObj = {
                            "word": word,
                            "familiarity": 0,
                            "translation": "unknown",
                            "language": language
                        }
                        return <Word key={i}
                            word={word}
                            wordObj={unknownWordObj}
                            sentence={sentenceString}
                            expressionsList={expressionsList}
                            setWordToEdit={setWordToEdit} />
                    }
                } else if (/\n+/g.test(word)) { // handle new lines
                    return (
                        <span key={i}>
                            <br></br>
                            <br></br>
                        </span>
                    )
                } else { // handle any other characters such as punctuation
                    return <span key={i}>{word}</span>
                }
            })}
        </span>
    );
};

export default Sentence;
