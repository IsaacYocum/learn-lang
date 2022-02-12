import React, { useState } from 'react';
import Word from './Word'

const Sentence = ({ sentenceArr, setWordToEdit, knownWords, language }) => {
    const [sentence, setSentence] = useState(sentenceArr)
    
    let sentenceString = ''
    sentence.forEach(word => {
        sentenceString = sentenceString + word
    })
    sentenceString = sentenceString.trim()

    return (
        <span>
            {sentence.map((word, i) => {
                if (/\w+/gi.test(word)) { // handle words
                    let knownWord = knownWords[word.toLowerCase()]
                    if (knownWord) {
                        let knownWordObj = {
                            "word": word,
                            "familiarity": knownWord.familiarity,
                            "translation": knownWord.translation,
                            "language": language
                        }
                        return <Word key={i}
                            wordObj={knownWordObj}
                            sentence={sentenceString}
                            setWordToEdit={setWordToEdit} />
                    } else {
                        let unknownWordObj = {
                            "word": word,
                            "familiarity": 0,
                            "translation": "unknown",
                            "language": language
                        }
                        return <Word key={i}
                            wordObj={unknownWordObj}
                            sentence={sentenceString}
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
