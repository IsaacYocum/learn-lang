import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewTextEditor = ({ knownWords, setKnownWords, wordToEdit }) => {
    const [word, setWord] = useState({})
    const [editedTranslation, setEditedTranslation] = useState('')
    const [editedFamiliarity, setEditedFamiliarity] = useState(0)
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
        setEditedFamiliarity(parseInt(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let editedWord = JSON.parse(JSON.stringify(word))
        editedWord.translation = editedTranslation
        editedWord.familiarity = editedFamiliarity
        console.log('submit', editedWord)

        // Update known word
        if (knownWords[word.word.toLowerCase()]) {
            axios.put(`/api/languages/${word.language}/words/${word.word}`, { editedWord })
                .then(resp => {
                    if (resp.status === 200) {
                        setNotification(`Term "${word.word}" was successfully updated.`)
                        let knownWordsCopy = JSON.parse(JSON.stringify(knownWords))
                        knownWordsCopy[word.word.toLowerCase()] = editedWord
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
                        knownWordsCopy[word.word.toLowerCase()] = editedWord
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
                    <table>
                        <tbody>
                            <tr>
                                <td>Term:</td>
                                <td>
                                    <input type="text" readOnly={true} value={wordToEdit.word} />
                                </td>
                            </tr>
                            <tr>
                                <td>Translation:</td>
                                <td>
                                    <textarea value={editedTranslation} onChange={handleTranslationChange} rows='5' cols='50'></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Familiarity:</td>
                                <td>
                                    <label className='familiarity-highlight-0'>
                                        [
                                        <input type="radio" value="0" checked={editedFamiliarity === 0} onChange={handleFamiliarityChange} />
                                        unknown]
                                    </label>
                                    &nbsp;
                                    <label className='familiarity-highlight-1'>
                                        [
                                        <input type="radio" value="1" checked={editedFamiliarity === 1} onChange={handleFamiliarityChange} />
                                        1]
                                    </label>
                                    &nbsp;
                                    <label className='familiarity-highlight-2'>
                                        [
                                        <input type="radio" value="2" checked={editedFamiliarity === 2} onChange={handleFamiliarityChange} />
                                        2]
                                    </label>
                                    &nbsp;
                                    <label className='familiarity-highlight-3'>
                                        [
                                        <input type="radio" value="3" checked={editedFamiliarity === 3} onChange={handleFamiliarityChange} />
                                        3]
                                    </label>
                                    &nbsp;
                                    <label className='familiarity-highlight-4'>
                                        [
                                        <input type="radio" value="4" checked={editedFamiliarity === 4} onChange={handleFamiliarityChange} />
                                        4]
                                    </label>
                                    &nbsp;
                                    <label className='familiarity-highlight-5'>
                                        [
                                        <input type="radio" value="5" checked={editedFamiliarity === 5} onChange={handleFamiliarityChange} />
                                        5]
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>Sentence:</td>
                                <td>
                                    <textarea value={wordToEdit.sentence} readOnly={true} rows='5' cols='50'></textarea>
                                </td>
                            </tr>
                            <tr className='viewTextEditorSubmit'>
                                <td></td>
                                <td>
                                    <input align='right' type="submit" value="Submit"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
