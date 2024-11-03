// src/components/DocQuery.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DocQuery = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer(""); // Clear previous answer

    try {
      const response = await axios.get(
        `http://localhost:8081/v1/chat/query?question=${encodeURIComponent(
          question
        )}`
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Error fetching answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333" }}>Melanchatly: Document Query</h1>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        Go Back
      </button>
      <form
        onSubmit={handleQuery}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Document URL:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Your Question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Get Answer
        </button>
      </form>
      {loading && (
        <div style={{ marginTop: "20px", fontStyle: "italic" }}>
          Checking sources and gathering information...
        </div>
      )}
      {answer && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#e6f7ff",
            borderRadius: "5px",
            border: "1px solid #b3e0ff",
          }}
        >
          <h3 style={{ margin: "0" }}>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default DocQuery;
