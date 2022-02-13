import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home.js';
import ViewLanguage from './components/language/ViewLanguage';
import ViewLanguages from './components/language/ViewLanguages';
import AddText from './components/text/AddText';
import EditText from './components/text/EditText';
import ViewText from './components/text/ViewText';
import ViewTexts from './components/text/ViewTexts';
import HeaderContext from './contexts/HeaderContext';


const App = () => {
  const [headerState, setHeaderState] = useState({
    "title": '',
    "text": null,
    "buttons": []
  });

  return (
    <div className="App">
      <HeaderContext.Provider value={{ headerState, setHeaderState }}>
        <Header />

        <div className="body">
          <Switch>
            <Route path="/texts/edittext/:textId" render={props =>
              <EditText textId={props.match.params.textId} />}>
            </Route>
            <Route path="/texts/addtext">
              <AddText />
            </Route>
            <Route path="/texts/:textId" render={props =>
              <ViewText textId={props.match.params.textId} />}>
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </HeaderContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
