// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.js'
import { Switch, Route } from 'react-router-dom';
import LanguagesViewer from './components/LanguagesViewer'
import TextsViewer from './components/TextsViewer'
import TextViewer from './components/TextViewer';
import AddText from './components/AddText';
import About from './components/About';
import EditText from './components/EditText';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [headerState, setHeaderState] = useState({
    "title": '',
    "text": null,
    "buttons": []
  });

  return (
    <div className="App">
      <Header headerState={headerState} />

      <Switch>
        <Route path="/texts/viewtext/:textId" render={props =>
          <TextViewer textId={props.match.params.textId} setHeaderState={setHeaderState} />}>
        </Route>
        <Route path="/texts/edittext/:textId" render={props =>
          <EditText textId={props.match.params.textId} setHeaderState={setHeaderState} />}>
        </Route>
        <Route path="/texts/addtext">
          <AddText setHeaderState={setHeaderState} />
        </Route>
        <Route path="/texts">
          <TextsViewer setHeaderState={setHeaderState} />
        </Route>
        <Route path="/languages">
          <LanguagesViewer setHeaderState={setHeaderState} />
        </Route>
        <Route path="/about">
          <About setHeaderState={setHeaderState} />
        </Route>
        <Route path="/">
          <Home setHeaderState={setHeaderState} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
