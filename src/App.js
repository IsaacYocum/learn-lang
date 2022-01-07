// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home.js'
import { BrowserRouter } from "react-router-dom";
import TextViewer from './components/TextViewer'
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header />
      <hr></hr> */}
        <Home />
        {/* <hr></hr>
      <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
