import React, { useState, useEffect } from 'react'
import sample from '../texts/sample.txt'
import Word from './Word'

const Text = () => {
    const [sampleText, setSampleText] = useState([])
    useEffect(() => {
        fetch(sample)
            .then(r => r.text())
            .then(text => {
                console.log(text)
                setSampleText(text.split(' '))
            })
    }, [])

    return (
        <div>
            <p>Text</p>
            <span>
                {sampleText.map(word => {
                    return <Word key={word} word={word}/>
                })}
            </span>
        </div>
    )
}

export default Text
