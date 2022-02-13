import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';

const ViewTexts = () => {
    const [language, setLanguage] = useState("")
    const [languages, setLanguages] = useState([])
    const [texts, setTexts] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            "title": 'Available Texts'
        })

        axios.get('/api/languages')
            .then(languagesJson => {
                setLanguage(languagesJson.data[0].language)
                populateTexts(languagesJson.data[0].language)
                setLanguages(languagesJson.data)
            })
    }, [setHeaderState])

    const populateTexts = (language) => {
        axios.get(`/api/languages/${language}/texts`)
            .then(textsJson => {
                setTexts(textsJson.data)
            })
    }

    const handleSelectChange = (event) => {
        setLanguage(event.target.value)
        populateTexts(event.target.value)
    }

    const handleAddTextClick = () => {
        history.push('/texts/addtext')
    }

    const handleEditClick = (event) => {
        history.push(`/texts/edittext/${event.target.value}`)
    }

    const handleDeleteClick = (event) => {
        if (window.confirm("Are you sure you want to delete this text?") === true) {
            axios.delete(`/api/texts/${event.target.value}`)
                .then(resp => {
                    if (resp.status === 200) {
                        setTexts(texts.filter(text => text.textId !== Number(event.target.value)))
                    }
                })
        }
    }

    return (
        <div>
            <label>Select language: </label>
            <select value={language} onChange={handleSelectChange}>
                {languages.map((language, i) => {
                    return (
                        <option key={i} value={language.language.toLowerCase()}>{language.language}</option>
                    )
                })}
            </select>
            &nbsp;
            <button onClick={handleAddTextClick}>Add Text</button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Text</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {texts.map((text) => (
                            <TableRow
                                key={text.textId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <nav>
                                        <Link to={`/texts/${text.textId}`}>
                                            {text.title}
                                        </Link>
                                    </nav>
                                </TableCell>
                                <TableCell align="left">
                                    <button value={text.textId} onClick={handleEditClick}>Edit</button>
                                    &nbsp;
                                    <button value={text.textId} onClick={handleDeleteClick}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ViewTexts
