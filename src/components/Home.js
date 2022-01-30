import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = ({ setHeaderState }) => {
    useEffect(() => {
        setHeaderState({
            "title": "Home"
        })
    }, [setHeaderState])

    return (
        <div>
            <nav>
                <Link to="/texts">View Texts</Link>
                <br></br>
                <Link to="/texts/addtext">Add Text</Link>
                <br></br>
                <Link to="/languages">View Languages</Link>
                <br></br>
                <Link to="/about">About</Link>
            </nav>
        </div>
    )
}

export default Home
