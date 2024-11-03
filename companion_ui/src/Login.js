import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      navigate("/"); // Redirect to Home if already logged in
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Check hardcoded credentials
    if (username === "admin" && password === "I_Like_AI") {
      localStorage.setItem("loggedIn", "true"); // Set login status
      onLogin(username); // Pass username to Home component (if needed)
      navigate("/"); // Redirect to Home
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Melanchatly</h1>
        <h3 style={styles.subtitle}>
          Start chatting with your personal AI companion
        </h3>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "24px",
    color: "#333",
  },
  subtitle: {
    margin: "0 0 20px",
    fontSize: "16px",
    color: "#666",
  },
  inputGroup: {
    margin: "10px 0",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Login;
