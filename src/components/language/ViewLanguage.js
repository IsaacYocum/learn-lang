import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import HeaderContext from '../../contexts/HeaderContext';

const ViewLanguage = ({ language }) => {
    const [words, setWords] = useState([])
    const { setHeaderState } = useContext(HeaderContext)

    useEffect(() => {
        setHeaderState({
            "title": `Viewing ${language}`
        })

        axios.get(`/api/languages/${language}/words`)
            .then(resp => {
                setWords(resp.data)
            })
    }, [language, setHeaderState])

    return (
        <div>
            <ul>
                {words.map((word, i) => {
                    return (
                        <li key={i}>
                            {word.word}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ViewLanguage
