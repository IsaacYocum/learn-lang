import React from 'react'
import './Footer.css'
import GitHubLogo from '../img/GitHub-Mark-32px.png'

const Footer = (showFooter) => {
    if (showFooter.showFooter) {
        return (
            <div className='footer'>
                <div className='horizontalRule'>
                    <hr></hr>
                </div>
                <div className='builtWith'>
                    Built with React, Express, SQLite3, Node, and Cypress
                    <br></br>
                </div>
                <div className='gitHubLogo'>
                    <img src={GitHubLogo} alt="GitHub logo" />
                </div>
                <div className='gitLinks'>
                    <a
                        href="https://github.com/IsaacYocum/learn-lang-frontend"
                        target="_blank"
                        rel="noopener noreferrer">
                        Frontend Git
                    </a>
                    <br></br>
                    <a
                        href="https://github.com/IsaacYocum/learn-lang-backend"
                        target="_blank"
                        rel="noopener noreferrer">
                        Backend Git
                    </a>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Footer
