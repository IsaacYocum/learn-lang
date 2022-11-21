import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../contexts/HeaderContext';

const Home = () => {
    const { setHeaderState } = useContext(HeaderContext)

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
                <Link to="/settings">Settings</Link>
                <br></br>
                <Link to="/about">About</Link>
            </nav>
        </div>
    )
}

export default Home
