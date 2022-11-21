import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';

const AddText = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [language, setLanguage] = useState('')
    const [languages, setLanguages] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            "title": "Add text"
        })

        axios.get('/api/languages')
            .then(languagesJson => {
                setLanguage(languagesJson.data[0].language)
                setLanguages(languagesJson.data)
            })

    }, [setHeaderState])

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newText = {
            "title": title,
            "text": text,
            "language": language
        }

        axios.post('/api/addtext', newText)
            .then(resp => {
                if (resp.status === 201) {
                    history.push('/texts')
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Select language: </label>
                <select value={language} onChange={handleLanguageChange}>
                    {languages.map((language, i) => {
                        return (
                            <option key={i} value={language.language.toLowerCase()}>{language.language}</option>
                        )
                    })}
                </select>
                <br></br>
                <br></br>
                <label>
                    Title:
                    <br></br>
                    <input type='text' value={title} onChange={handleTitleChange} />
                </label>
                <br></br>
                <br></br>
                <label>
                    Text:
                    <br></br>
                    <textarea value={text} onChange={handleTextChange} rows='15' cols='50'></textarea>
                </label>
                <br></br>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
};

export default AddText;
