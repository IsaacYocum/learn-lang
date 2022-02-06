import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewTextEditor = ({ wordToEdit, knownWords, setKnownWords }) => {
    console.log('wordToEdit', wordToEdit)
    const [word, setWord] = useState({})
    const [editedTranslation, setEditedTranslation] = useState('')
    const [editedFamiliarity, setEditedFamiliarity] = useState('')

    const [notification, setNotification] = useState('')

    useEffect(() => {
        setWord(wordToEdit)
        setEditedTranslation(wordToEdit.translation)
        setEditedFamiliarity(wordToEdit.familiarity)
    }, [wordToEdit])

    const handleTranslationChange = (e) => {
        setEditedTranslation(e.target.value)
    }

    const handleFamiliarityChange = (e) => {
        setEditedFamiliarity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let editedWord = JSON.parse(JSON.stringify(word))
        editedWord.translation = editedTranslation
        editedWord.familiarity = editedFamiliarity
        console.log('submit', editedWord)
        
        // Update known word
        if (knownWords[word.word]) {
            axios.put(`/api/languages/${word.language}/words/${word.word}`, { editedWord })
                .then(resp => {
                    if (resp.status === 200) {
                        setNotification(`Term "${word.word}" was successfully updated.`)
                        let knownWordsCopy = JSON.parse(JSON.stringify(knownWords))
                        knownWordsCopy[word.word] = editedWord
                        setKnownWords(knownWordsCopy)
                        setWord({})
                    } else {
                        setNotification(`Error updating term "${word.word}".`)
                        setWord({})
                    }
                })
        } else {
            // Create a new word
            axios.post(`/api/languages/${word.language}/words/${word.word}`, { editedWord })
                .then(resp => {
                    if (resp.status === 201) {
                        setNotification(`Term "${word.word}" was successfully created.`)
                        let knownWordsCopy = JSON.parse(JSON.stringify(knownWords))
                        knownWordsCopy[word.word] = editedWord
                        setKnownWords(knownWordsCopy)
                        setWord({})
                    } else {
                        setNotification(`Error creating term "${word.word}".`)
                        setWord({})
                    }
                })
        }
    }

    if (word.word) {
        return (
            <div className='viewTextEditor'>
                <form onSubmit={handleSubmit}>
                    <label>Term:</label>
                    <br></br>
                    <input type="text" readOnly={true} value={wordToEdit.word} />
                    <br></br>
                    <br></br>
                    <label>Translation:</label>
                    <br></br>
                    {/* <input type="textArea" value={wordToEdit.translation} /> */}
                    <textarea value={editedTranslation} onChange={handleTranslationChange} rows='5' cols='50'></textarea>
                    <br></br>
                    <br></br>
                    <label>Familiarity:</label>
                    <br></br>
                    <input type="text" value={editedFamiliarity} onChange={handleFamiliarityChange} />
                    <br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }

    if (notification !== '') {
        return (
            <div className='viewTextEditor'>
                {notification}
            </div>
        )
    }

    return (
        <div className='viewTextEditor'>
            <p>Hover over a word to view it's translation.</p>
            <p>Click a word to edit it.</p>
        </div>
    )
};

export default ViewTextEditor;
