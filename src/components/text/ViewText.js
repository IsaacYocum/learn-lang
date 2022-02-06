import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../App.css'
import './ViewText.css'
import Word from '../Word'
import Split from 'react-split'
import ViewTextEditor from './ViewTextEditor'

const ViewText = ({ textId, setHeaderState }) => {
    const [text, setText] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [anyCharacter, setAnyCharacter] = useState([])
    const [knownWords, setKnownWords] = useState({});
    const [wordToEdit, setWordToEdit] = useState({})

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

    return (
        <div className="body">
            <Split style={{ display: `flex`, height: `calc(100vh - 10rem)` }}>
                <div id="textPane" className='textPane'>
                    {console.log('anyCharacter', anyCharacter)}
                    {console.log('definedWords', knownWords)}
                    {anyCharacter.map((any, i) => {
                        if (/\w+/gi.test(any)) { // handle words
                            let knownWord = knownWords[any.toLowerCase()]
                            if (knownWord) {
                                let knownWordObj = {
                                    "word": any,
                                    "familiarity": knownWord.familiarity,
                                    "translation": knownWord.translation,
                                    "language": text.language
                                }
                                return <Word key={i} wordObj={knownWordObj} setWordToEdit={setWordToEdit} />
                            } else {
                                let unknownWordObj = {
                                    "word": any,
                                    "familiarity": 0,
                                    "translation": "unknown",
                                    "language": text.language
                                }
                                return <Word key={i} wordObj={unknownWordObj} setWordToEdit={setWordToEdit} />
                            }
                        } else if (/\n+/g.test(any)) { // handle new lines
                            return (
                                <span key={i}>
                                    <br></br>
                                    <br></br>
                                </span>
                            )
                        } else { // handle any other characters such as punctuation
                            return <span key={i}>{any}</span>
                        }
                    })}

                </div>
                <Split direction="vertical" style={{ width: '50vw' }}>
                    <div id="notificationPane" className='notificationPane'>
                        <ViewTextEditor wordToEdit={wordToEdit} knownWords={knownWords} setKnownWords={setKnownWords} />
                    </div>
                    <div id="dictionaryPane" className='dictionaryPane'>
                        
                    </div>
                </Split>
            </Split>
        </div>
    )
}

export default ViewText
