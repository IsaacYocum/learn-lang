import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const AddText = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const history = useHistory()

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newText = {
            "title": title,
            "text": text
        }

        axios.post('/api/addtext', newText)
            .then(resp => {
                if (resp.status === 201) {
                    history.push('/texts/viewtexts')
                }
            })
    }

    return (
        <div>
            <h3>Add a text</h3>
            <form onSubmit={handleSubmit}>
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
