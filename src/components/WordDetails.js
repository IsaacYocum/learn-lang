import React, { useState, useEffect } from 'react'
import './Word.css'

const WordDetails = ({ word, sentence, expressionsList }) => {
    const [trimedExpressionList, setTrimedExpressionList] = useState([])

    useEffect(() => {
        // axios.get(`/api/languages/${word.language}/words/${word.word.toLowerCase()}`)
        //     .then(resp => {
        //         console.log('wordDetails', resp)
        //         if (resp.status === 200) {
        //             setWordDetails(resp.data)
        //         }
        //     })
        //     .catch(() => {
        //         let unknown = {
        //             "word": word.word,
        //             "familiarity": 0,
        //             "translation": "unknown"
        //         }
        //         setWordDetails(unknown)
        //     })

        let tmpTrimedExpressionList = []

        let wordIndex = 100000000
        expressionsList.forEach((w, i) => {
            if (word.word === w || word.word === w.replace("'", "")) {
                wordIndex = i + 1
            }

            if (i >= wordIndex) {
                tmpTrimedExpressionList.push(w)
            }
        })

        setTrimedExpressionList(tmpTrimedExpressionList)

    }, [word, expressionsList])

    const handleClick = (e) => {
        console.log(e, trimedExpressionList)
    }

    let translateUrl = `https://translate.google.com/?ie=UTF-8&sl=auto&tl=vi&text=${sentence}`;

    return (
        <span className="tooltiptext">
            <b>Word: </b>{word.word}
            <br></br>
            <b>Translation: </b>{word.translation}
            <br></br>
            <b>Familiarity: </b>{word.familiarity}
            <br></br>
            <span><b>Expressions: </b></span>
            {trimedExpressionList.map((word, i) => {
                if (i < trimedExpressionList.length) {
                    return (
                        <span key={i}>
                            <button
                                className='buttonThatLooksLikeALink'
                                onClick={() => handleClick()}
                            >
                                {i + 1 + '..' + word}
                            </button>
                            &nbsp;
                        </span>)
                }
                return null;
            })}
            <br></br>
            <b>Lookup Word: </b>
            <br></br>
            <b>Lookup Sentence: </b> <a href={translateUrl} target={'_blank'} rel="noReferrer">Google Translate</a>
            {/* <br></br>
            <a href="https://translate.google.com" target="_blank" rel="noopener noreferrer">Translate Sentence</a> */}
        </span>
    )
}

export default WordDetails