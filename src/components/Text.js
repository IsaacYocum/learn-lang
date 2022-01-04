import React, { useState, useEffect } from 'react'
import sample from '../texts/sample.txt'
import Word from './Word'

const Text = () => {
    const [sampleText, setSampleText] = useState([])
    useEffect(() => {
        fetch(sample)
            .then(r => r.text())
            .then(text => {
                // setSampleText(text.split(' '))
                setSampleText(text.match(/\b(\w+\W+)/g))

            })
    }, [])

    return (
        <div>
            <p>Text</p>
            <span>
                {sampleText.map((word, i) => {
                    return <Word key={i} word={word.trim()} />
                })}
            </span>
        </div>
    )
}

export default Text
