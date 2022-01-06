import React, { useState, useEffect } from 'react'
import sample from '../texts/sample.txt'
import Paragraph from './Paragraph'
import GS from '../globalSettings.json'
import './TextViewer.css'

const Text = (props) => {
    const [paragraphs, setParagraphs] = useState([])
    useEffect(() => {
        fetch(sample)
            .then(r => r.text())
            .then(text => {
                let regex = new RegExp(`${GS.paragraphSplits}`)
                setParagraphs(paragraphs.concat(text.split(/[\r\n]+/)))
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
