import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import DocumentViewer from './components/DocumentViewer';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home.js';
import ViewLanguage from './components/language/ViewLanguage';
import ViewLanguages from './components/language/ViewLanguages';
import AddEditLanguage from './components/language/AddEditLanguage';
import { Settings } from './components/settings/Settings';
import AddEditText from './components/text/AddEditText';
import ViewTexts from './components/text/ViewTexts';  
import LanguageContext from './contexts/LanguageContext';
import HeaderContext from './contexts/HeaderContext';
import MenuDrawer from './components/MenuDrawer';
import './components/Header.css'

const App = () => {
    const [languageState, setLanguageState] = useState("")
    const [headerState, setHeaderState] = useState({
        title: '',
        text: null,
        buttons: [],
        callback: null,
        hideLanguageSelector: false
    });

    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        axios.get('/api/settings')
            .then(resp => {
                setLanguageState(resp.data.language || "")
            })
    }, [])

    return (
        <div className="App">
            <LanguageContext.Provider value={{ languageState, setLanguageState}}>
                <HeaderContext.Provider value={{ headerState, setHeaderState }}>
                    <div className='header'>
                        <MenuDrawer />
                        <Header />
                    </div>
                    <hr></hr>

                    <div id="content" className="content">
                        <Switch>
                            <Route path="/texts/add" render={props => 
                            <AddEditText language={props.match.params.language} action="add"/>}>
                            </Route>
                            <Route path="/texts/:textId/edit" render={props =>
                            <AddEditText language={props.match.params.language} action="edit" textId={props.match.params.textId} />}>
                            </Route>
                            <Route path="/texts/:textId" render={props =>
                            <DocumentViewer textId={props.match.params.textId} setShowFooter={setShowFooter} />}>
                            </Route>
                            <Route path="/texts">
                                <ViewTexts />
                            </Route>
                            <Route path="/languages/add" render={props =>
                            <AddEditLanguage language={props.match.params.language} action="add" />}>
                            </Route>
                            <Route path="/languages/:language/edit" render={props =>
                            <AddEditLanguage language={props.match.params.language} action="edit" />}>
                            </Route>
                            <Route path="/languages/:language" render={props =>
                            <ViewLanguage language={props.match.params.language} />}>
                            </Route>
                            <Route path="/languages">
                                <ViewLanguages />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/settings">
                                <Settings />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>

                    <Footer showFooter={showFooter} />
                </HeaderContext.Provider >
            </LanguageContext.Provider >
        </div >
    );
}

export default App;
