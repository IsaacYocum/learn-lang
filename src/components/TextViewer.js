import React, { useState, useEffect } from 'react'
// import sample from '../texts/sample.txt'
import Paragraph from './Paragraph'
import GS from '../globalSettings.json'
import './TextViewer.css'

const Text = (props) => {
    const [paragraphs, setParagraphs] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/api/texts')
            .then(r => r.text())
            .then(text => {
                let regex = new RegExp(GS.paragraphRegex, "g")
                setParagraphs(paragraphs.concat(text.split(regex)))
            })
    }, [])

    return (
        <div className='textBody'>
            <p>Title</p>
            {paragraphs.map((paragraph, i) => {
                return <Paragraph key={i} paragraph={paragraph} />
            })}
        </div>
    )
}

export default Text
