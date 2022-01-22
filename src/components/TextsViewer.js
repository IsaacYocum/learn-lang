import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import './TextsViewer.css'
import axios from 'axios'

const TextsViewer = ({ setHeaderState }) => {
    const [texts, setTexts] = useState([])
    const history = useHistory()

    useEffect(() => {
        setHeaderState({
            "title": 'Available Texts'
        })

        axios.get('/api/texts')
            .then(textsJson => {
                setTexts(textsJson.data)
            })
    }, [])

    const handleAddTextClick = () => {
        history.push('/texts/addtext')
    }

    const handleEditClick = (event) => {
        history.push(`/texts/edittext/${event.target.value}`)
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
            <button onClick={handleAddTextClick}>Add Text</button>
            <nav>
                <ul>
                    {texts.map((text, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/texts/viewtext/${text.textId}`}>
                                    {text.title}
                                </Link>

                                <button className='hidden' value={text.textId} onClick={handleEditClick}>Edit</button>
                                <button className='hidden' value={text.textId} onClick={handleDeleteClick}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default TextsViewer
