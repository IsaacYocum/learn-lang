import React, { useEffect, useState } from 'react'
import { Router, Link, Switch, Route } from 'react-router-dom';
import TextsViewer from './TextsViewer'
import TextViewer from './TextViewer'


const Home = () => {
    return (
        <div>
            Home
            <div>
                <Link to="/texts">View Texts</Link>
            </div>

            <Switch>
                <Route path="/texts">
                    <TextsViewer />
                </Route>
            </Switch>
        </div>
    )
}

export default Home
