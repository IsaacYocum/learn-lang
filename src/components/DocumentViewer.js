import React, { useContext, useEffect, useState } from 'react'
import ViewText from './text/ViewText';
import HeaderContext from '../contexts/HeaderContext'
import ViewTextEditor from './text/ViewTextEditor';
import Split from 'react-split'
import axios from 'axios'

const DocumentViewer = ({ textId }) => {
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

                setText(resp.data)

                let textData = resp.data.text
                console.log('text', typeof textData)
                let any = textData.match(/(\w+| |[.,;:!?’'"()\n]*)/gi)
                console.log(any)

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
                        setKnownWords(wordsFromDb.data)

                        setIsLoading(false)
                    })
            })
    }, [textId, setHeaderState])

    return (
        <div className="body">
            <Split style={{ display: `flex`, height: `calc(100vh - 10rem)` }}>
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
        </div>
    )
}

export default DocumentViewer;