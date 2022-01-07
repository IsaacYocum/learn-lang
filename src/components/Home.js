import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextViewer from './TextViewer'


const Home = () => {
    const navigate = useNavigate();
    navigate('/home')

    let [texts, setTexts] = useState([])
    let [showText, setShowText] = useState(false)
    let [textToShow, setTextToShow] = useState('')

    const handleShowText = (text) => {
        console.log(text)
        navigate(`/texts/${text}`)
        setShowText(true)
        setTextToShow(text)
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/texts')
            .then(r => r.text())
            .then(textsJsonStr => {
                let textsJson = JSON.parse(textsJsonStr)
                let arrayTexts = []
                textsJson.texts.forEach(text => {
                    arrayTexts.push(text)
                })
                setTexts(texts.concat(arrayTexts))
            })
    }, [setTexts])

    if (showText) {
        return (
            <TextViewer title={textToShow} text={textToShow} />
        )
    }

    return (
        <div>
            <p>Home</p>
            <p>View a text</p>
            <ul>
                {texts.map((text, i) => {
                    return <li key={i}><a onClick={() => handleShowText(text)}>{text}</a></li>
                })}
            </ul>
        </div>
    )
}

export default Home
