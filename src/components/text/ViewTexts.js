import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import './ViewTexts.css'
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';
import LanguageContext from '../../contexts/LanguageContext';
import { Button } from '@mui/material';

const ViewTexts = () => {
    const [texts, setTexts] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const { languageState } = useContext(LanguageContext)
    const history = useHistory()

    const buttons = useMemo(() =>  [
        <Button key="addText" onClick={() => history.push('/texts/add')} variant="contained">Add Text</Button>
    ], [history])

    

    useEffect(() => {
        function retrieveTexts(language) {
            if (language === languageState) { // without this, a double api call was made
                axios.get(`/api/languages/${language}/texts`)
                    .then(textsJson => {
                        setTexts(textsJson.data)
                    })
            }
        }

        setHeaderState({
            title: 'Available Texts',
            buttons: buttons,
            callback: retrieveTexts 
        })

        retrieveTexts(languageState)

    }, [setHeaderState, history, languageState, buttons ])


    const handleEditClick = (event) => {
        history.push(`/texts/${event.target.value}/edit`)
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
        <div className="viewTexts">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Text</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {texts && texts.map((text) => (
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
                                <TableCell align="center">
                                    <Button value={text.textId} onClick={handleEditClick}>Edit</Button>
                                    &nbsp;
                                    <Button value={text.textId} onClick={handleDeleteClick}>Delete</Button>
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
