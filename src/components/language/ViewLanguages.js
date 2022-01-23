import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ViewLanguage = ({ setHeaderState }) => {
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        setHeaderState({
            "title": "View Languages"
        })

        axios.get('/api/languages')
            .then(languagesJson => {
                setLanguages(languagesJson.data)
            })
    }, [setHeaderState])

    return (
        <div>
            <ul>
                {languages.map((language, i) => {
                    return (
                        <li key={i}>
                            <Link to={`/languages/${language.language}`}>
                                {language.language}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ViewLanguage
