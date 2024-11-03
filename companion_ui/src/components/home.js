import React, { useState, useEffect, useRef} from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "../Login";

function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatStarted, setIsChatStarted] = useState(false);
    const inputRef = useRef(null);
    const [username, setUsername] = useState('');

    const handleSend = () => {
        if (input.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, { text: input, fromUser: true }]);
            setInput('');
            if(!isChatStarted){
                setIsChatStarted(true);
            }
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "This is a response from the bot.", fromUser: false }
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleLogin = (username) => {
        setUsername(username);
    };
    
    const isLoggedIn = !!username;//Determine if user is logged in based on the presence of username
    
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
            {/* Login Button in Top Right */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000, // Ensure it's on top of other elements
            }}>
                {isLoggedIn ? (
                    <span style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px' }}>
                        {username}
                    </span>
                ) : (
                    <Link to="/Login" style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>Login</Link>
                )}
            </div>

            {/* Left column for past chats */}
            <div style={{ flex: '0 0 10%', padding: '10px', borderRight: '1px solid #ccc', backgroundColor: '#fff' }}>
                <h2>Past Chats</h2>
                <div>No past chats available</div>
            </div>

            {/* Main chat area */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '20px', marginRight: '100px'}}>
                <div style={{ flex: '1', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#fff' }}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                margin: '5px 0',
                                maxWidth: '100%',
                                wordWrap: 'break-word',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                                backgroundColor: msg.fromUser ? '#e1ffc7' : '#f1f0f0',
                                alignSelf: msg.fromUser ? 'flex-end' : 'flex-start', // Adjust alignment for user and bot
                                textAlign: msg.fromUser ? 'right' : 'left',
                                marginLeft: msg.fromUser ? 'auto' : '0',
                                display: 'flex',
                                justifyContent: msg.fromUser ? 'flex-end' : 'flex-start'
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {!isChatStarted && (
                        <div style={{
                            textAlign: 'center',
                            marginTop: '50%',
                            opacity: 0.7,
                            fontSize: '18px'
                        }}>
                            <p>How are you doing today?</p>
                        </div>
                    )}
                </div>

                {/* Input field and send button */}
                <div style={{ position: 'relative', marginTop: '10px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref = {inputRef}
                        placeholder="Type your message..."
                        style={{
                            width: '100%',
                            padding: '10px 50px 10px 10px', // Padding on left and right
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxSizing: 'border-box' // Ensures padding doesn't affect width
                        }}
                    />
                    <button
                        onClick={handleSend}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            borderRadius: '50%',
                            backgroundColor: '#007bff',
                            color: 'white',
                            cursor: 'pointer',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            width="16px"
                            height="16px"
                        >
                            <path d="M2 12l9-9v6h10v6H11v6z" transform="rotate(90 12 12)" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Routes for the application */}
            <Routes>
                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </div>
    );
}

export default Home;
