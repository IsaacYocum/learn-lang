import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Split from 'react-split'
import '../../App.css'
import HeaderContext from '../../contexts/HeaderContext'
import ViewTextEditorContext from '../../contexts/ViewTextEditorContext'
import Sentence from '../Sentence'
import './ViewText.css'
import ViewTextEditor from './ViewTextEditor'

const ViewText = ({ textId }) => {
    const [text, setText] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [anyCharacter, setAnyCharacter] = useState([])
    const [knownWords, setKnownWords] = useState({});
    const [wordToEdit, setWordToEdit] = useState({})
    const { setHeaderState } = useContext(HeaderContext)

    useEffect(() => {
        axios.get(`/api/texts/${textId}`)
            .then(resp => {
                setHeaderState({
                    "title": resp.data.title,
                    "text": resp.data
                })

                setText(resp.data)

                let textData = resp.data.text
                console.log('text', typeof textData)
                let any = textData.match(/(\w+| |[.,;:!?’'"()\n]*)/gi)
                console.log(any)
                setAnyCharacter(prev => prev.concat(any))

                let words = textData.match(/\w+/gi)

                // Create a new list without duplicates to send to the DB
                let filteredWords = words.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.toLowerCase().trim() === value.toLowerCase().trim()
                    )))
                console.log("filtered", filteredWords)

                // Front load all word definitions from the DB
                axios.post(`/api/languages/${resp.data.language}/getTextWords`, filteredWords)
                    .then(wordsFromDb => {
                        let definedWordsObj = {};
                        wordsFromDb.data.forEach(element => {
                            definedWordsObj[element.word] = element;
                        })
                        setKnownWords(definedWordsObj)

                        setIsLoading(false)
                    })
            })
    }, [textId, setHeaderState])

    if (isLoading) {
        return <p>loading...</p>
    }

    let sentences = []
    let sentence = []
    anyCharacter.forEach((any, i) => {
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

    return (
        <ViewTextEditorContext.Provider value={{ wordToEdit, setWordToEdit }}>
            <div className="body">
                <Split style={{ display: `flex`, height: `calc(100vh - 10rem)` }}>
                    <div id="textPane" className='textPane'>
                        {console.log('anyCharacter', anyCharacter)}
                        {console.log('definedWords', knownWords)}
                        {sentences.map((sentence, i) => {
                            return <Sentence
                                key={i}
                                sentenceArr={sentence}
                                knownWords={knownWords}
                                language={text.language} />
                        })}
                    </div>
                    <Split direction="vertical" style={{ width: '50vw' }}>
                        <div id="notificationPane" className='notificationPane'>
                            <ViewTextEditor
                                knownWords={knownWords}
                                setKnownWords={setKnownWords} />
                        </div>
                        <div id="dictionaryPane" className='dictionaryPane'>

                        </div>
                    </Split>
                </Split>
            </div>
        </ViewTextEditorContext.Provider>
    )
}

export default ViewText
