import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "I_Like_AI") {
      onLogin(); // Call the onLogin function from props
      navigate("/"); // Redirect to Home
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Melanchatly</h1>
      <h2>Start chatting with your personal AI companion</h2>
      <form
        onSubmit={handleLogin}
        style={{ maxWidth: "300px", margin: "0 auto" }}
      >
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
