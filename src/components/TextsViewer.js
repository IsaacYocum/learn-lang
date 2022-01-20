import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import './TextsViewer.css'
import axios from 'axios'

const TextsViewer = () => {
    const [texts, setTexts] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('/api/texts')
            .then(textsJson => {
                setTexts(prev => prev.concat(textsJson.data.texts))
            })
    }, [])

    const handleAddTextClick = () => {
        history.push('/texts/addtext')
    }

    const handleEditClick = (event) => {
        console.log('Edit ' + event.target.value)
    }

    const handleDeleteClick = (event) => {
        let textToDelete = event.target.value
        axios.delete(`/api/deletetext/${textToDelete}`)
            .then(resp => {
                if (resp.status === 200) {
                    history.go(0) // refreshes page
                }
            })
    }

    return (
        <div>
            <h3>Available Texts</h3>
            <button onClick={handleAddTextClick}>Add Text</button>
            <nav>
                <ul>
                    {texts.map((title, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/texts/viewtext/${title}`}>
                                    {title}
                                </Link>

                                <button className='hidden' value={title} onClick={handleEditClick}>Edit</button>
                                <button className='hidden' value={title} onClick={handleDeleteClick}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default TextsViewer
