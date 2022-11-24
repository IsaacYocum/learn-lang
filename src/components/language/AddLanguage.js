import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import HeaderContext from '../../contexts/HeaderContext';
import { Button } from '@mui/material';
import axios from 'axios';

const AddLanguage = () => {

    const { setHeaderState } = useContext(HeaderContext)

    useEffect(() => {
        setHeaderState({
            "title": "Add language"
        })
    }, [setHeaderState])

    return (
        <div>
            <form onSubmit={() => console.log('submit')}>
                <br></br>
                <br></br>
                <label>
                    Language:
                    <br></br>
                    <input type='text' value={'asdf'} onChange={() => console.log('language')} />
                </label>
                <br></br>
                <br></br>
                <label>
                    Text:
                    <br></br>
                    <textarea value={'asdf'} onChange={() => console.log('textArea')} rows='15' cols='50'></textarea>
                </label>
                <br></br>
                <Button type="submit" value="Submit">Submit</Button>
            </form>
        </div>
    )
}

export default AddLanguage;
