// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
// import Home from './components/Home.js'
import TextViewer from './components/TextViewer'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <TextViewer />
      <Footer />
    </div>
  );
}

export default App;
