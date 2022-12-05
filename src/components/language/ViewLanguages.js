import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import HeaderContext from '../../contexts/HeaderContext';
import { useHistory } from "react-router-dom";

const ViewLanguage = () => {
    const [languages, setLanguages] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            title: "View Languages",
            buttons: null
        })

        getLanguages()
    }, [setHeaderState])

    const getLanguages = () => {
        axios.get('/api/languages')
            .then(languagesJson => {
                setLanguages(languagesJson.data)
            })
    }

    const handleAddClick = () => (
        history.push('/languages/add')
    )

    const handleEditClick = (language) => (
        history.push(`/languages/${language}/edit`)
    )

    const handleDeleteClick = (language) => (
        axios.delete(`/api/languages/${language}`)
        .then(resp => {
            if (resp.status === 200) {
                getLanguages()
            }
        })
    )

    return (
        <div style={{width: '100vw'}}>
            <Button variant="contained" onClick={handleAddClick}>Add language</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {languages.map((language) => (
                            <TableRow
                                key={language.language}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{language.language}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleEditClick(language.language)}>Edit</Button>
                                    <Button onClick={() => handleDeleteClick(language.language)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewLanguage
