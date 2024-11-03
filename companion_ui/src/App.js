import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// function App() {
//   return (
//     <div className="App">
      /* <header className="App-header">
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
      </header> */


      function App(){
        return(
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/Chat" element={<Chat/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Login" element={<Login/>} />
          </Routes>
      </div >
      </Router>
        );
      }

export default App;
