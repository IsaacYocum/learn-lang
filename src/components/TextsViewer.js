import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import TextViewer from './TextViewer'

const TextsViewer = () => {
    let [texts, setTexts] = useState([])
    let [textToShow, setTextToShow] = useState('')

    const urlMatch = useRouteMatch('/texts/:text')
    useEffect(() => {
        fetch('http://localhost:3001/api/texts')
            .then(r => r.text())
            .then(textsJsonStr => {
                console.log(textsJsonStr)
                let textsJson = JSON.parse(textsJsonStr)
                let arrayTexts = []
                textsJson.texts.forEach(text => {
                    arrayTexts.push(text)
                })
                setTexts(texts.concat(arrayTexts))
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
