import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const EditText = ({ textId }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const history = useHistory()

    useEffect(() => {
        axios.get(`/api/texts/${textId}`)
            .then(resp => {
                console.log(resp)
                setTitle(resp.data[0].title)
                setText(resp.data[0].text)
            })
    }, [textId])

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let submitButtonId = event.nativeEvent.submitter.id

        let editedText = {
            "textId": parseInt(textId),
            "title": title,
            "text": text,
            "language": 'english'
        }

        axios.put(`/api/edittext/${textId}`, editedText)
            .then(resp => {
                if (resp.status === 200) {
                    if (submitButtonId === 'save') {
                        history.push('/texts/viewtexts')
                    } else {
                    history.push(`/texts/viewtext/${textId}`)
                    }
                }
            })
    }

    return (
        <div>
            <h3>Edit text</h3>
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
                <input id="save" type="submit" value="Save"></input>
                &nbsp;
                <input id="saveAndOpen" type="submit" value="Save and open"></input>
            </form>
        </div>
    )
};

export default EditText;
