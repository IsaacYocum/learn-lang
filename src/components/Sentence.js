import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Word from './Word'

const Sentence = ({ sentenceString, setWordToEdit, knownWords, language }) => {
    const [expressionsList, setExpressionsList] = useState([])

    useEffect(() => {
        console.log(knownWords)
        let splitSentence = sentenceString.match(/\w+'*\w*/g);
        console.log('splitSentence', splitSentence)
        // console.log(splitSentence)
        let sentenceOptions = splitSentence.map(sentence => {
            return _.pickBy(knownWords, (value, key) =>
                _.some(sentence, str => _.includes(key, str.toLowerCase()))
            )
        })
        console.log('sentenceOptions', sentenceOptions)
        
    }, [sentenceString, knownWords])

    return ( <span>{sentenceString}</span>  
        // <span>
        //     {sentence.map((word, i) => {
        //         if (/\w+/gi.test(word)) { // handle words
        //             if (knownWords[word.toLowerCase().trim()]) {
        //                 return <Word key={i}
        //                     word={word}
        //                     wordObj={knownWords[word.toLowerCase().trim()]}
        //                     sentence={sentenceString}
        //                     expressionsList={expressionsList}
        //                     setWordToEdit={setWordToEdit} />
        //             } else {
        //                 let unknownWordObj = {
        //                     "word": word,
        //                     "familiarity": 0,
        //                     "translation": "unknown",
        //                     "language": language
        //                 }
        //                 return <Word key={i}
        //                     word={word}
        //                     wordObj={unknownWordObj}
        //                     sentence={sentenceString}
        //                     expressionsList={expressionsList}
        //                     setWordToEdit={setWordToEdit} />
        //             }
        //         } else if (/\n+/g.test(word)) { // handle new lines
        //             return (
        //                 <span key={i}>
        //                     <br></br>
        //                     <br></br>
        //                 </span>
        //             )
        //         } else { // handle any other characters such as punctuation
        //             return <span key={i}>{word}</span>
        //         }
        //     })}
        // </span>
    );
};

export default Sentence;
