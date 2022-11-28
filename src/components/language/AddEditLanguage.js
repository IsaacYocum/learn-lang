import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import {Box} from '@mui/system';

const AddEditLanguage = (props) => {
    const emptyForm = {
        language: "",
        dictionary1Uri: "",
        dictionary2Uri: "",
        googleTranslateUri: "",
        regExpSplitSentences: "",
        exceptionsSplitSentences: "",
        regExpWordCharacters: ""
    }

    const { setHeaderState } = useContext(HeaderContext)
    const [ form, setForm ] = useState(emptyForm)
    const history = useHistory()

    useEffect(() => {
        let title = props?.action === "add" ? "Add" : "Edit"
        setHeaderState({
            "title": `${title} language`
        })

        if (props.action === "edit") {
            axios.get(`/api/languages/${props.language}`)
                .then(resp => {
                    if (resp.status === 200) {
                        console.log(resp.data)
                        setForm(resp.data)
                    }
                })
        }       
    }, [setHeaderState, props.language])

    const onCancel = () => {
        history.push('/languages');
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (props.action === "add") {
            axios.post('/api/languages', form)
                .then(resp => {
                    if (resp.status === 201) {
                        history.push('/languages')
                    }
                })
        } else {
            delete form.language
            axios.put(`/api/languages/${props.language}`, form)
                .then(resp => {
                    if (resp.status === 200) {
                        history.push('/languages')
                    }
                })
        }
    }

    const onLanguageFieldChange = (e) => {
        console.log(e.target.value)
        setForm({...form, language: e.target.value})
    }

    const onDictionary1UriChange = (e) => {
        console.log(e.target.value)
        setForm({...form, dictionary1Uri: e.target.value})
    }

    const onDictionary2UriChange = (e) => {
        console.log(e.target.value)
        setForm({...form, dictionary2Uri: e.target.value})
    }

    const onGoogleTranslateUriChange = (e) => {
        console.log(e.target.value)
        setForm({...form, googleTranslateUri: e.target.value})
    }

    const onRegExpSplitSentencesChange = (e) => {
        console.log(e.target.value)
        setForm({...form, regExpSplitSentences: e.target.value})
    }

    const onExceptionsSplitSentencesChange = (e) => {
        console.log(e.target.value)
        setForm({...form, exceptionsSplitSentences: e.target.value})
    }

    const onRegExpWordCharactersChange = (e) => {
        console.log(e.target.value)
        setForm({...form, regExpWordCharacters: e.target.value})
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
            <br></br>
            <TextField
                required
                id="languageField"
                label="Language Name"
                value={form.language}
                onChange={onLanguageFieldChange}
            />
            <br></br>
            <TextField
                required
                id="dictionary1Uri"
                label="Dictionary 1 URI"
                value={form.dictionary1Uri}
                onChange={onDictionary1UriChange}
            />
            <br></br>
            <TextField
                required
                id="dictionary2Uri"
                label="Dictionary 2 URI"
                value={form.dictionary2Uri}
                onChange={onDictionary2UriChange}
            />
            <br></br>
            <TextField
                required
                id="googleTranslateUri"
                label="Google Translate URI"
                value={form.googleTranslateUri}
                onChange={onGoogleTranslateUriChange}
            />
            <br></br>
            <TextField
                required
                id="regExpSplitSentences"
                label="RegExp Split Sentences"
                value={form.regExpSplitSentences}
                onChange={onRegExpSplitSentencesChange}
            />
            <br></br>
            <TextField
                required
                id="exceptionsSplitSentences"
                label="Split Sentence RegExp Exceptions"
                value={form.exceptionsSplitSentences}
                onChange={onExceptionsSplitSentencesChange}
            />
            <br></br>
            <TextField
                required
                id="regExpWordCharacters"
                label="RegExp Word Characters"
                value={form.regExpWordCharacters}
                onChange={onRegExpWordCharactersChange}
            />
            <br></br>
            <Button color="secondary" variant="contained" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
                {props.action === "add" ? "Add" : "Save"}
            </Button>
        </Box>
    )
}

export default AddEditLanguage;
