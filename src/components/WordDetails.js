import React from 'react'

const WordDetails = ({ word, show }) => {
    if (show) {
        return (
            <div>
                {word}
            </div>
        )
    } else {
        return <></>
    }
}

export default WordDetails