import React, { useContext, useEffect, useState } from 'react'
import LanguageContext from '../contexts/LanguageContext'
import HeaderContext from '../contexts/HeaderContext'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import './Header.css'

const Header = () => {
    const { headerState, setHeaderState } = useContext(HeaderContext)
    const { languageState, setLanguageState } = useContext(LanguageContext)
    //const [languageState, setLanguageState] = useState("")
    const [languagesState, setLanguagesState] = useState([])

    useEffect(() => {
        axios.get('/api/languages')
            .then(resp => {
                setLanguagesState(resp.data)
            })
    }, [setHeaderState])

    const onChange = (e) => {
        if (e?.target?.value) {
            let language = e.target.value;

            setLanguageState(language)

            if (headerState.callback) {
                headerState.callback(language)
            }

            axios.put('/api/settings', {language: language})
        }
    }

    return (
        <div className="headerContents"> 
            <div className="headerTitle">
                {headerState.title}
            </div>
            <div className="headerButtons">
                {headerState.buttons && headerState.buttons.length !== 0 
                    ? <span>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        {headerState.buttons.map(button => {
                            return button;
                        })}
                    </span>
                    : null
                }
            </div>
            {!headerState.hideLanguageSelector 
                ? <div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Language</InputLabel>
                        <Select 
                            value={languageState || ''}
                            label="Language"
                            onChange={onChange}
                        >
                            {languagesState.map(language => {
                                return (
                                    <MenuItem 
                                        key={language.language}
                                        value={language.language}
                                    >
                                        {language.language}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                : null
            }
        </div>
    )
}

export default Header

