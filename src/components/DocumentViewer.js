import React, { useContext, useEffect, useState } from 'react'
import TextViewer from './text/TextViewer';
import HeaderContext from '../contexts/HeaderContext'
import ViewTextEditor from './text/ViewTextEditor';
import './DocumentViewer.css'
import Split from 'react-split'
import axios from 'axios'
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const DocumentViewer = ({ textId, setShowFooter }) => {
    const { setHeaderState } = useContext(HeaderContext)
    const [knownWords, setKnownWords] = useState(null);
    const [text, setText] = useState(null)
    const [wordToEdit, setWordToEdit] = useState({})
    const history = useHistory()

    useEffect(() => {
        setShowFooter(false)

        const onEditClick = () => {
            history.push(`/texts/${textId}/edit`) 
        }

        axios.get(`/api/texts/${textId}`)
            .then(resp => {
                setText(resp.data)
                console.log(resp.data)

                setHeaderState({
                    "title": resp.data.title,
                    "text": resp.data,
                    buttons: [
                        <Button key="edit" onClick={() => onEditClick()}>Edit</Button>
                    ]
                })

                // Front load all word definitions from the DB
                axios.get(`/api/languages/${resp.data.language}/words`)
                    .then(wordsFromDb => {
                        setKnownWords(wordsFromDb.data)
                        console.log(wordsFromDb.data)
                    })
            })

        return () => {
            // Reset show footer on unmount
            setShowFooter(true);
        };
    }, [textId, setHeaderState, setShowFooter, history])

    return (
        <Split className='documentViewer'>
            <div id="textPane" className='textPane'>
                {!text?.text || !knownWords ? <p>loading...</p> :
                    <TextViewer
                        text={text}
                        knownWords={knownWords}
                        setWordToEdit={setWordToEdit}
                    />}
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
