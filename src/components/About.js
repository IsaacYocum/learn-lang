import React from 'react';

const About = () => {
    return (
        <div>
            <h3>About</h3>
            <p>
                Hi! My name is Isaac and I am learning React. This is an app I created to help me learn!
            </p>
            <p>
                With this app, users will be able to use any text they want to learn any language that they want. I was inspired by this software that I love: <a href='https://learning-with-texts.sourceforge.io/' target='_blank' rel='noreferrer noopener'>learning-with-texts</a>.
            </p>
            <p>
                Simply add a text of your choosing and hover over the words to view existing definitions or add your own! (Not implemented yet)
            </p>
            <p>
                This app is under development so if you have anything you'd like to tell me, feel free to <a href="mailto:thresherbot@gmail.com">email me</a>.
            </p>
            <p>
                Thanks for taking a look!
            </p>

            <br></br>

            <p>
                This is a full stack application using React, Express, and SQLite3 in Node.js.
            </p>
        </div>
    );
};

export default About;
