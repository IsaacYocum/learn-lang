import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h3>Home</h3>
            <nav>
                <Link to="/texts/viewtext">View Texts</Link>
                <br></br>
                <Link to="/texts/addtext">Add Text</Link>
            </nav>
        </div>
    )
}

export default Home
