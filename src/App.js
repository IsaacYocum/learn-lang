// import logo from './logo.svg';
import { createContext, useState, useContext, useMemo } from 'react';
import './App.css';
import Home from './components/Home.js'
import { Switch, Route } from 'react-router-dom';
import TextsViewer from './components/TextsViewer'
import TextViewer from './components/TextViewer';
import AddText from './components/AddText';
import About from './components/About';
import EditText from './components/EditText';
import Header from './components/Header';

function App() {
  const HeaderContext = createContext({
    title: '',
    buttons: [],
    setHeaderContext: () => {},
  });

  return (
    <div className="App">
      {/* <Header /> */}
      <Switch>
        <Route path="/texts/viewtext/:textId" render={props =>
          <TextViewer textId={props.match.params.textId} />}>
        </Route>
        <Route path="/texts/edittext/:textId" render={props =>
          <EditText textId={props.match.params.textId} />}>
        </Route>
        <Route path="/texts/addtext">
          <AddText />
        </Route>
        <Route path="/texts">
          <TextsViewer />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
