import React, {useState} from "react";
import { useNavigate } from "react-router";

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Check hardcoded credentials
        if (username === "Mental_AI" && password === "I_Like_AI") {
            // onLogin(username); // Pass username to Home component
            navigate("/"); // Redirect to Home
        } else {
            alert("Invalid credentials");
        }
};
return (
    <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                    />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    );
};

export default Login;
