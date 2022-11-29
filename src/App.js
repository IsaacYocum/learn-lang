import React, { useState } from 'react';
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
import AddText from './components/text/AddText';
import EditText from './components/text/EditText';
import ViewTexts from './components/text/ViewTexts';  
import HeaderContext from './contexts/HeaderContext';
import MenuDrawer from './components/MenuDrawer';
import './components/Header.css'

const App = () => {
    const [headerState, setHeaderState] = useState({
        "title": '',
        "text": null,
        "buttons": []
    });

    const [showFooter, setShowFooter] = useState(true);

    return (
        <div className="App">
                <HeaderContext.Provider value={{ headerState, setHeaderState }}>
                    <div className='header'>
                        <MenuDrawer />
                        <Header />
                    </div>
                    <hr></hr>

                    <div id="content" className="content">
                        <Switch>
                            <Route path="/texts/:textId/edit" render={props =>
                            <EditText textId={props.match.params.textId} />}>
                            </Route>
                            <Route path="/texts/add">
                                <AddText />
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
        </div >
    );
}

export default App;
