import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewLanguage = ({ language, setHeaderState }) => {
    const [words, setWords] = useState([])

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
