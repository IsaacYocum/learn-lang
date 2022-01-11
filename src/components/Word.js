import React, { useState, useEffect } from 'react'
import WordDetails from './WordDetails'
import './Word.css'

const Word = ({ word, sentence }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [familiarity, setFamiliarity] = useState(-1)
    const space = '\xa0'

    useEffect(() => {
        if (/\w+/gi.test(word)) {
            // if(word.toLowerCase() === 'boy' || word.toLowerCase() === 'mr') {
            fetch(`http://localhost:3001/api/languages/english/words/${word.toLowerCase().trim()}`)
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(json => setFamiliarity(1))
                    } else {
                        throw new Error(`No translation for ${word}`)
                    }
                })
                .catch(() => {
                    setFamiliarity(0) // catch 404, word is unkown
                })
        }
    }, [])


    // If end of sentence
    if (word === '.' || word === '!' || word === '?') {
        return <span>{word + space}</span>
    }

    // If non-word in sentence
    if (word === ',' || word === '-' || word === ':' || word === ';' || word === "'" || word === "’") {
        return <span>{word}</span>
    }

    // If space
    if (word === ' ') {
        return <span>{space}</span>
    }

    if (isHovering) {
        return (
            <span className='tooltip'>
                <span className={`word hover-highlight familiarity-highlight-${familiarity}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>
                    {word}
                </span>
                <WordDetails word={word} sentence={sentence} />
            </span>
        )
    }

    return (
        <span className='tooltip'>
            <span className={`word hover-highlight familiarity-highlight-${familiarity}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                {word}
            </span>
        </span>
    )

}

export default Word
