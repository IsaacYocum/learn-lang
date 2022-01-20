// import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js'
import { Switch, Route } from 'react-router-dom';
import TextsViewer from './components/TextsViewer'
import TextViewer from './components/TextViewer';
import AddText from './components/AddText';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/texts/viewtext/:title" render={props =>
          <TextViewer title={props.match.params.title} />}>
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
