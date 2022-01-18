import React, { useState, useEffect } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import TextViewer from './TextViewer'
import axios from 'axios'

const TextsViewer = () => {
    const [texts, setTexts] = useState([])
    const [textToShow, setTextToShow] = useState('')

    useEffect(() => {
        axios.get('/api/texts')
            .then(textsJson => {
                setTexts(prev => prev.concat(textsJson.data.texts))
            })
    }, [])

    return (
        <div>
            Available Texts
            <nav>
                <ul>
                    {texts.map((title, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/texts/${title}`} onClick={() => setTextToShow(title)}>
                                    {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <Switch>
                <Route exact path={`/text/:text`}>
                    <TextViewer title={textToShow} text={textToShow} />
                </Route>
            </Switch>
        </div>
    )
}

export default TextsViewer
