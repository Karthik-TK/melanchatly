import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const MAIN_URL = "http://localhost:8081";

function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, fromUser: true },
    ]);
    setInput("");
    if (!isChatStarted) {
      setIsChatStarted(true);
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${MAIN_URL}/v1/chat/completions?question=${encodeURIComponent(input)}`
      );
      const data = response.data;

      const botMessage = {
        text: data.content.content,
        fromUser: false,
        subMessages: [],
      };

      // Handle emergency, other users, and resources as before
      if (data.emergency) {
        botMessage.subMessages.push(
          { text: "Emergency Contacts:", type: "header" },
          { text: "📞 911: Emergency services (Police, Fire, Medical)" },
          { text: `📞 HealthCare: ${data.emergency.HealthCare}` },
          ...Object.entries(data.emergency.NearbyHospitals).map(
            ([name, address]) => ({
              text: `${name}: ${address}`,
            })
          ),
          { text: `📞 Poison Control: ${data.emergency.PoisonControl}` }
        );
      }

      if (data.other_users) {
        botMessage.subMessages.push({
          text: data.other_users,
          type: "info",
        });
      }

      if (data.resources && data.resources.length > 0) {
        botMessage.subMessages.push(
          { text: "Resources:", type: "header" },
          ...data.resources.map((resource) => ({
            text: resource,
            link: resource,
          }))
        );
      }

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response", fromUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: "0 0 20%",
          padding: "10px",
          borderRight: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <h2>Past Chats</h2>
        <div>No past chats available</div>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.fromUser ? "right" : "left",
                margin: "5px 0",
                width: "100%", // Ensure it takes the full width
                display: "flex",
                justifyContent: msg.fromUser ? "flex-end" : "flex-start",
              }}
            >
              <div
                className={`chat-message ${
                  msg.fromUser ? "from-user" : "from-bot"
                }`}
                style={{
                  backgroundColor: msg.fromUser ? "#e1ffc7" : "#f1f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  width: "fit-content",
                  maxWidth: "70%", // Limit max width
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {msg.subMessages && msg.subMessages.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "#e6f7ff",
                      border: "1px solid #b3e0ff",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      marginTop: "10px",
                    }}
                  >
                    <h4 style={{ margin: "0 0 10px" }}>
                      Additional Information:
                    </h4>
                    {msg.subMessages.map((info, subIndex) => (
                      <div
                        key={subIndex}
                        style={{ margin: "5px 0", textAlign: "left" }}
                      >
                        {info.type === "header" ? (
                          <strong>{info.text}</strong>
                        ) : info.link ? (
                          <div>
                            <ul
                              style={{ paddingLeft: "20px", margin: "5px 0" }}
                            >
                              <li>
                                <a
                                  href={info.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {info.text}
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          info.text
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{ textAlign: "center", padding: "10px", color: "#888" }}
            >
              Thinking...
            </div>
          )}
          {!isChatStarted && !loading && (
            <div
              style={{
                textAlign: "center",
                marginTop: "50%",
                opacity: 0.7,
                fontSize: "18px",
              }}
            >
              <p>How are you doing today?</p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ position: "relative", marginTop: "10px" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            placeholder="Type your message..."
            style={{
              width: "100%",
              padding: "10px 50px 10px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
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
        </form>
      </div>
    </div>
  );
}

export default Home;
