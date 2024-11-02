import './App.css';
import Home from './components/home';
import Profile from './components/profile';
import Chat from './components/chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         hello Learn React
        </a>
      </header> */}
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;