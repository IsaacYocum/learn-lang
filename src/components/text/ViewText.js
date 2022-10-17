import React from 'react'
import '../../App.css'
import Sentence from '../Sentence'
import './ViewText.css'

const ViewText = ({ knownWords, sentences, setWordToEdit, text, isLoading }) => {

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <div id="textPane" className='textPane'>
            {/* {console.log('anyCharacter', anyCharacter)}
            {console.log('definedWords', knownWords)} */}
            {sentences.map((sentence, i) => {
                return <Sentence
                    key={i}
                    sentenceArr={sentence}
                    knownWords={knownWords}
                    language={text.language}
                    setWordToEdit={setWordToEdit}
                />
            })}
        </div>
    )
}

export default ViewText
