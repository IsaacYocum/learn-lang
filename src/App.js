// import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js'
import { Switch, Route } from 'react-router-dom';
import TextsViewer from './components/TextsViewer'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/texts">
          <TextsViewer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
