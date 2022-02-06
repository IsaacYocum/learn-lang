import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.js'
import { Switch, Route } from 'react-router-dom';
import ViewTexts from './components/text/ViewTexts'
import ViewText from './components/text/ViewText';
import AddText from './components/text/AddText';
import EditText from './components/text/EditText';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import ViewLanguage from './components/language/ViewLanguage';
import ViewLanguages from './components/language/ViewLanguages'


const App = () => {
  const [headerState, setHeaderState] = useState({
    "title": '',
    "text": null,
    "buttons": []
  });

  return (
    <div className="App">
      <Header headerState={headerState} />

      <div className="body">
        <Switch>
          <Route path="/texts/edittext/:textId" render={props =>
            <EditText textId={props.match.params.textId} setHeaderState={setHeaderState} />}>
          </Route>
          <Route path="/texts/addtext">
            <AddText setHeaderState={setHeaderState} />
          </Route>
          <Route path="/texts/:textId" render={props =>
            <ViewText textId={props.match.params.textId} setHeaderState={setHeaderState} />}>
          </Route>
          <Route path="/texts">
            <ViewTexts setHeaderState={setHeaderState} />
          </Route>
          <Route path="/languages/:language/" render={props =>
            <ViewLanguage language={props.match.params.language} setHeaderState={setHeaderState} />}>
          </Route>
          <Route path="/languages">
            <ViewLanguages setHeaderState={setHeaderState} />
          </Route>
          <Route path="/about">
            <About setHeaderState={setHeaderState} />
          </Route>
          <Route path="/">
            <Home setHeaderState={setHeaderState} />
          </Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
