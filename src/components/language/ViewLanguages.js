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
import { Link, useHistory } from "react-router-dom";

const ViewLanguage = () => {
    const [languages, setLanguages] = useState([])
    const { setHeaderState } = useContext(HeaderContext)
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            "title": "View Languages"
        })

        axios.get('/api/languages/languagesdetails')
            .then(languagesJson => {
                setLanguages(languagesJson.data)
            })
    }, [setHeaderState])

    const handleAddClick = () => (
        history.push('/languages/addlanguage')
    )

    const handleEditClick = () => (
        history.push('/texts/addtext')
    )

    const handleDeleteClick = () => (
       console.log('handle delete') 
    )

    return (
        <div style={{width: '100vw'}}>
            <Button  onClick={handleAddClick}>Add language</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell align="right">Texts</TableCell>
                            <TableCell align="right">Terms</TableCell>
                            <TableCell >Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {languages.map((language) => (
                            <TableRow
                                key={language.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{language.id}</TableCell>
                                <TableCell align="right">{language.Texts}</TableCell>
                                <TableCell align="right">{language.Words}</TableCell>
                                <TableCell>
                                    <Button onClick={handleEditClick}>Edit</Button>
                                    <Button onClick={handleDeleteClick}>Delete</Button>
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
