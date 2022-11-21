import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import HeaderContext from '../../contexts/HeaderContext';

const EditText = ({ textId }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const {setHeaderState} = useContext(HeaderContext)
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            "title": "Edit text"
        })

        axios.get(`/api/texts/${textId}`)
            .then(resp => {
                console.log(resp)
                setTitle(resp.data.title)
                setText(resp.data.text)
            })
    }, [textId, setHeaderState])

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
            "language": text.language
        }

        axios.put(`/api/texts/${textId}`, editedText)
            .then(resp => {
                if (resp.status === 200) {
                    if (submitButtonId === 'save') {
                        history.push('/texts')
                    } else {
                    history.push(`/texts/${textId}`)
                    }
                }
            })
    }

    return (
        <div>
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
