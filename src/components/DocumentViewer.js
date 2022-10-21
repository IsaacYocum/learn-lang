import React, { useContext, useEffect, useState } from 'react'
import ViewText from './text/ViewText';
import HeaderContext from '../contexts/HeaderContext'
import ViewTextEditor from './text/ViewTextEditor';
import './DocumentViewer.css'
import Split from 'react-split'
import _ from 'lodash';
import axios from 'axios'

const DocumentViewer = ({ textId, setShowFooter }) => {
    const [knownWords, setKnownWords] = useState({});
    const [sentences, setSentences] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState({})
    const [wordToEdit, setWordToEdit] = useState({})

    useEffect(() => {
        axios.get(`/api/texts/${textId}`)
            .then(resp => {
                setHeaderState({
                    "title": resp.data.title,
                    "text": resp.data
                })

                setShowFooter(false)

                setText(resp.data)

                let textData = resp.data.text
                console.log('text', typeof textData)
                // let any = textData.match(/(\w+| |[.,;:!?’'"()\n]*)/gi)
                let any = textData.match(/(\w+'*’*\w*| |[.,;:!?’'"()&\n]*)/gi)
                //(\w+'*\w*| |[.,;:!?’'"()&\n]*)
                console.log(any)

                let sentenceStrings = textData.match(/\b[^.!?]+[.!?]+/g)
                console.log('sentenceStrings', sentenceStrings)

                let splitSentences = sentenceStrings.map((sentence) => {
                    return sentence.match(/\w+'*\w*/g)
                })

                console.log('splitSentences', splitSentences)

                let sentences = []
                let sentence = []
                any.forEach((any, i) => {
                    if (/\w+/gi.test(any)) { // handle words
                        sentence.push(any)
                    } else if (/\n+/g.test(any)) { // handle new lines
                        sentences.push(sentence)
                        sentence = []

                        sentence.push('\n')

                        sentences.push(sentence)
                        sentence = []
                    } else { // handle any other characters such as punctuation
                        sentence.push(any)
                        if (any === '.' || any === '!' || any === '?' || any === '\n') {
                            sentences.push(sentence)
                            sentence = []
                        }
                    }
                })
                console.log('sentences', sentences)
                setSentences(sentences)




                // Front load all word definitions from the DB
                axios.get(`/api/languages/${resp.data.language}/words`)
                    .then(wordsFromDb => {
                        console.log(wordsFromDb.data)
                        // let definedWordsObj = {};
                        // wordsFromDb.data.forEach(element => {
                        //     definedWordsObj[element.word] = element;
                        // })

                        let sentenceOptions = splitSentences.map(sentence => {
                            return _.pickBy(wordsFromDb.data, (value, key) =>
                                _.some(sentence, str => _.includes(key, str.toLowerCase()))
                            )
                        })


                        let matchExpressions = []
                        for (let i = 0; i < sentences.length; i++) {

                            for (let j = 0; j < sentences[i].length; j++) {
                                if (/\w+/gi.test(sentences[0][j])) {
                                    let potentialExpression = sentences[i][j]
                                    for (let k = j + 1; k < sentences[0].length; k++) {
                                        if (wordsFromDb.data[potentialExpression.toLowerCase()]) {
                                            matchExpressions.push(potentialExpression.toLowerCase())
                                        }
                                        potentialExpression = potentialExpression + sentences[j][k]
                                    }
                                }
                            }
                        }

                        let replacedSentence = sentenceStrings[3]
                        let sentenceOptsArray = Object.keys(sentenceOptions[3]).sort((a, b) => b.length - a.length)
                        console.log('sentenceOptsArray', sentenceOptsArray)
                        sentenceOptsArray.forEach(opt => {
                            console.log(opt, typeof opt, opt.includes(' ') ? 'expression' : 'single word')
                            let regex = new RegExp(`(${opt})`, "ig")
                            replacedSentence = replacedSentence.replace(regex, "{$1}")
                        })
                        console.log('original sentence\n', sentenceStrings[3])
                        console.log('replacedSentence with known words\n', replacedSentence)
                        let matchWordsNotPrecededByOpenSquiglyBracketRegEx = /(?<!{[\w*'’-]*)(\b[\w'’-]+)/g
                        replacedSentence = replacedSentence.replace(matchWordsNotPrecededByOpenSquiglyBracketRegEx, "<$1>")

                        console.log('replacedSentence with unknown words\n', replacedSentence)


                        console.log('matched expressions', matchExpressions)

                        console.log('sentenceOptions', sentenceOptions)

                        setKnownWords(wordsFromDb.data)

                        setIsLoading(false)
                    })
            })

        return () => {
            // Reset show footer on unmount
            setShowFooter(true);
        };
    }, [textId, setHeaderState])

    return (
        <Split className='documentViewer'>
            <div id="textPane" className='textPane'>
                <ViewText
                    textId={textId}
                    knownWords={knownWords}
                    sentences={sentences}
                    setWordToEdit={setWordToEdit}
                    text={text}
                    isLoading={isLoading}
                />
            </div>
            <Split direction="vertical" style={{ width: '50vw' }}>
                <div id="notificationPane" className='notificationPane'>
                    <ViewTextEditor
                        knownWords={knownWords}
                        setKnownWords={setKnownWords}
                        wordToEdit={wordToEdit}
                    />
                </div>
                <div id="dictionaryPane" className='dictionaryPane'>

                </div>
            </Split>
        </Split>
    )
}

export default DocumentViewer;