import React, { useState } from 'react'
import './Word.css'
import WordDetails from './WordDetails'

const Word = ({ word, wordObj, sentence, expressionsList, setWordToEdit }) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleWordClick = () => {
        console.log('Clicked on: ', wordObj)
        wordObj.sentence = sentence.replace(wordObj.word, '{' + wordObj.word + '}')
        setWordToEdit(wordObj)
    }

    let title = `${wordObj.word}\n\u25b6 ${wordObj.translation}\n\u25b6 ${wordObj.familiarity}`

    return (
        <span className='tooltip'>
            <span
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                
            >
                <span
                    className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                    title={title}
                    onClick={handleWordClick}
                >
                    {word}
                </span>
                {isHovering ? <WordDetails word={wordObj} sentence={sentence} expressionsList={expressionsList} /> : null}
            </span>
        </span>
    )
}

export default Word
