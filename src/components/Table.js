import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultsTable = ({ rows, cols }) => {
    console.log('rows', rows)
    console.log('cols', cols)

    if (rows && cols) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {cols.map((col, i) => {
                                return (
                                    <TableCell key={i}>{col.headerName}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((rows) => (
                            <TableRow
                                key={rows.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{rows.id}</TableCell>
                                <TableCell align="right">{rows.Texts}</TableCell>
                                <TableCell align="right">{rows.Words}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (<div>asdf</div>)
};

export default ResultsTable;
