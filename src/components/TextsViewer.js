import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import TextViewer from './TextViewer'
import axios from 'axios'

const TextsViewer = () => {
    let [texts, setTexts] = useState([])
    let [textToShow, setTextToShow] = useState('')

    const urlMatch = useRouteMatch('/texts/:text')

    useEffect(() => {
        axios.get('/api/texts')
            .then(textsJson => {
                console.log(textsJson)
                setTexts(t => textsJson.data.texts)
            })

            if (urlMatch) setTextToShow(urlMatch.params.text)
    }, [])


    return (
        <div>
            <Switch>
                <Route path="/texts/:text">
                    <TextViewer title={textToShow} text={textToShow} />
                </Route>
                <Route path="/texts">
                    Available Texts
                    <ul>
                        {texts.map((text, i) => {
                            return <li key={i}><Link to={`/texts/${text}`} onClick={() => setTextToShow(text)}>{text}</Link></li>
                            // return <li key={i}><a onClick={() => handleShowText(text)}>{text}</a></li>
                        })}
                    </ul>
                </Route>
            </Switch>
        </div>
    )
}

export default TextsViewer
