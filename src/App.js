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
import { Settings } from './components/settings/Settings';
import AddText from './components/text/AddText';
import EditText from './components/text/EditText';
import ViewTexts from './components/text/ViewTexts';  
import HeaderContext from './contexts/HeaderContext';


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
        <Header />

        <div id="content" className="content">
          <Switch>
            <Route path="/texts/edittext/:textId" render={props =>
              <EditText textId={props.match.params.textId} />}>
            </Route>
            <Route path="/texts/addtext">
              <AddText />
            </Route>
            <Route path="/texts/:textId" render={props =>
              <DocumentViewer textId={props.match.params.textId} setShowFooter={setShowFooter} />}>
            </Route>
            <Route path="/texts">
              <ViewTexts />
            </Route>
            <Route path="/languages/:language/" render={props =>
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
