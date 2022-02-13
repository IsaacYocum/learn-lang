import React, { useContext, useState } from 'react'
import ViewTextEditorContext from '../contexts/ViewTextEditorContext'
import './Word.css'
import WordDetails from './WordDetails'

const Word = ({ wordObj, sentence, expressionsList }) => {
    const [isHovering, setIsHovering] = useState(false)
    const {setWordToEdit} = useContext(ViewTextEditorContext)

    const handleWordClick = () => {
        console.log('Clicked on: ', wordObj)
        wordObj.sentence = sentence.replace(wordObj.word, '{' + wordObj.word + '}')
        setWordToEdit(wordObj)
    }

    if (isHovering) {
        return (
            <span className='tooltip'>
                <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                    onClick={handleWordClick}>
                    {wordObj.word}
                </span>
                <WordDetails word={wordObj} sentence={sentence} expressionsList={expressionsList} />
            </span>
        )
    }

    return (
        <span className='tooltip'>
            <span className={`word hover-highlight familiarity-highlight-${wordObj.familiarity}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleWordClick}>
                {wordObj.word}
            </span>
        </span>
    )
}

export default Word
