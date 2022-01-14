import React, { useState, useEffect, useRef } from 'react'
// import sample from '../texts/sample.txt'
import Paragraph from './Paragraph'
import GS from '../globalSettings.json'
import './TextViewer.css'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const Text = ({ title, text }) => {
    const prevTitle = useRef(title)
    const prevText = useRef(text)
    console.log('title', title, 'text', text)
    const [paragraphs, setParagraphs] = useState([])
    useEffect(() => {
        if (!prevTitle.current === title && !prevText.current === text) {
            axios.get(`/api/texts/${text}`)
                .then(text => {
                    console.log(text)
                    let regex = new RegExp(GS.paragraphRegex, "g")
                    setParagraphs(paragraphs.concat(text.data.match(regex)))
                    prevTitle.current = true;
                    prevText.current = true;
                })
        }
    }, [title, text, paragraphs])

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
