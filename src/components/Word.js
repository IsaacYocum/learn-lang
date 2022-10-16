import React, { useContext, useState } from 'react'
import ViewTextEditorContext from '../contexts/ViewTextEditorContext'
import './Word.css'
import WordDetails from './WordDetails'

const Word = ({ word, wordObj, sentence, expressionsList }) => {
    const [isHovering, setIsHovering] = useState(false)
    const { setWordToEdit } = useContext(ViewTextEditorContext)

    const handleWordClick = () => {
        console.log('Clicked on: ', wordObj)
        wordObj.sentence = sentence.replace(wordObj.word, '{' + wordObj.word + '}')
        setWordToEdit(wordObj)
    }

    return (
        <span className='tooltip'>
            <span
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleWordClick}
            >
                <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}>
                    {word}
                </span>
                {isHovering ? <WordDetails word={wordObj} sentence={sentence} expressionsList={expressionsList} /> : null}
            </span>
        </span>
    )
}

export default Word
