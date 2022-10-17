import React, { useState } from 'react'
import './Word.css'
import WordDetails from './WordDetails'

const Word = ({ word, wordObj, sentence, expressionsList, setWordToEdit }) => {
    const [isHovering, setIsHovering] = useState(false)
    // const { setWordToEdit } = useContext(ViewTextEditorContext)

    const handleWordClick = () => {
        console.log('Clicked on: ', wordObj)
        wordObj.sentence = sentence.replace(wordObj.word, '{' + wordObj.word + '}')
        setWordToEdit(wordObj)
    }

    return (
        <span className='tooltip' title={wordObj.translation}>
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
