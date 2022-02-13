import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import HeaderContext from '../../contexts/HeaderContext';


const ViewLanguage = () => {
    const [languages, setLanguages] = useState([])
    const { setHeaderState } = useContext(HeaderContext)

    useEffect(() => {
        setHeaderState({
            "title": "View Languages"
        })

        axios.get('/api/languages/languagesdetails')
            .then(languagesJson => {
                setLanguages(languagesJson.data)
            })
    }, [setHeaderState])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Language</TableCell>
                        <TableCell align="right">Texts</TableCell>
                        <TableCell align="right">Terms</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ViewLanguage
