import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Box } from '@mui/material';
import HeaderContext from '../../contexts/HeaderContext';
import LanguageContext from '../../contexts/LanguageContext';

const AddEditText = ({language, action, textId}) => {
    const [titleState, setTitleState] = useState('')
    const [textState, setTextState] = useState('')
    const { setHeaderState } = useContext(HeaderContext)
    const { languageState } = useContext(LanguageContext)
    const history = useHistory()

    const buttonStyle = {
        width: 'auto'
    }

    useEffect(() => {
        setHeaderState({
            title: action === "add" ? "Add Text" : "Edit Text",
            hideLanguageSelector: action === "add" ? false : true
        })

        if (action === "edit") {
            axios.get(`/api/texts/${textId}`)
                .then(resp => {
                    setTitleState(resp.data.title)
                    setTextState(resp.data.text)
                })
        }
    }, [setHeaderState, action, textId])

    const handleTitleChange = (event) => {
        setTitleState(event.target.value)
    }

    const handleTextChange = (event) => {
        setTextState(event.target.value)
    }

    const createText = async (newText, open) => {
        console.log(newText)
        await axios.post('/api/texts', newText)
            .then(resp => {
                console.log(resp.data)
                if (resp.status === 201) {
                    open ? history.push(`/texts/${textId}`) : history.push('/texts')
                }
            })
    }

    const updateText = (updatedText, open) => {
        axios.put(`/api/texts/${textId}`, updatedText)
            .then(resp => {
                console.log(resp.data)
                if (resp.status === 200) {
                    open ? history.push(`/texts/${textId}`) : history.push('/texts')
                }
            })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        let text = {
            "title": titleState,
            "text": textState,
            "language": languageState
        }

        action === "add" ? createText(text, true) : updateText(text, true)

    }

    const onSecondaryClick = () => {
        let text = {
            "title": titleState,
            "text": textState,
            "language": languageState 
        }

        action === "add" ? createText(text, false) : updateText(text, false)
    }

    const onCancel = () => {
        history.goBack();
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                paddingTop: '7px'
            }}
            onSubmit={onSubmit}
        >
            <label>
                Title:
                <br></br>
                <input type='text' value={titleState} onChange={handleTitleChange} />
            </label>
            <br></br>
            <br></br>
            <label>
                Text:
                <br></br>
                <textarea value={textState} onChange={handleTextChange} rows='15' cols='50'></textarea>
            </label>
            <br></br>
            <Button color="error" variant="contained" style={buttonStyle} onClick={onCancel}>
                Cancel
            </Button>
            <Button color="secondary" variant="contained" style={buttonStyle} onClick={onSecondaryClick}>
                Save
            </Button>
            <Button type="submit" variant="contained" style={buttonStyle}>
                Save and Open
            </Button>
        </Box>
    )
};

export default AddEditText;
