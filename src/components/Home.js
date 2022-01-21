import React from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Header title={"Home"} />

            <nav>
                <Link to="/texts/viewtext">View Texts</Link>
                <br></br>
                <Link to="/texts/addtext">Add Text</Link>
                <br></br>
                <Link to="/about">About</Link>
            </nav>

            <Footer />
        </div>
    )
}

export default Home
