import React from 'react'
import './Footer.css'
import GitHubLogo from '../img/GitHub-Mark-32px.png'

const Footer = () => {
    return (
        <div className='footer'>
            <hr></hr>
            Built with React, Express, SQLite3, Node, and Cypress
            <br></br>
            <div className='row'>
                <div className='column'>
                    <img src={GitHubLogo} alt="GitHub logo" />
                </div>
                <div className=''>
                    <a href="https://github.com/IsaacYocum/learn-lang-frontend" target="_blank" rel="noopener noreferrer">Frontend Git</a>
                    <br></br>
                    <a href="https://github.com/IsaacYocum/learn-lang-backend" target="_blank" rel="noopener noreferrer">Backend Git</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
