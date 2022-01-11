import React, { useState, useEffect } from 'react'
// import sample from '../texts/sample.txt'
import Paragraph from './Paragraph'
import GS from '../globalSettings.json'
import './TextViewer.css'
import Header from './Header'
import Footer from './Footer'

const Text = ({ title, text }) => {
    console.log('title', title, 'text', text)
    const [paragraphs, setParagraphs] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/api/texts/${text}`)
            .then(r => r.text())
            .then(text => {
                let regex = new RegExp(GS.paragraphRegex, "g")
                setParagraphs(paragraphs.concat(text.match(regex)))
            })
    }, [text])

    return (
        <div>
            <Header />
            <hr></hr>

            <div className='textBody'>
                <p>{title}</p>
                {paragraphs.map((paragraph, i) => {
                    return <Paragraph key={i} paragraph={paragraph} />
                })}
            </div>

            <hr></hr>
            <Footer />
        </div>
    )
}

export default Text
