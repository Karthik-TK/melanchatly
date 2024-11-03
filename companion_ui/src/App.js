import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Chat from "./components/chat";
import Home from "./components/home";
import Profile from "./components/profile";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/Chat"
            element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/Profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
