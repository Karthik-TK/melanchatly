# Melanchatly: Your Personal AI Companion

![MLH Best AI Project Winner](https://d112y698adiu2z.cloudfront.net/photos/production/achievement_photos/000/930/137/datas/fe7da55a06691d0a0fa2fb2f32d9d352_large_bronze.png)

## 🏆 Winner of the [MLH] Best AI Project with Databricks Open Source 2024 🎉

We are proud to announce that our project won the [[MLH] Best AI Project with Databricks Open Source](https://hack-coms-24.devpost.com/) award with the support of Databricks. More details of the project [here](https://devpost.com/software/melanchatly-home-away-from-home).

Melanchatly is an innovative personal AI companion application designed to assist users as their personal companion for mental health through interactive chat and document queries. Built for the Hack.coms 2024 Hackathon, this project showcases the integration of a FastAPI backend with a React.js frontend.

## Project Structure

- **companion_ui**: The frontend user interface developed using React.js.
- **companion_app**: The backend service developed using FastAPI.

## Features

- Interactive chat interface to communicate with the AI companion.
- Document query functionality to retrieve answers based on user-provided URLs.
- Text-to-speech capabilities for bot responses.
- Clean and user-friendly UI/UX.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python 3.7 or later
- Node.js 14 or later
- npm (Node Package Manager)

## Installation

### Backend (FastAPI)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/karthik-tk/melanchatly.git
   cd melanchatly/companion_app
   ```

2. **Poetry Install and Start the server**

   ```bash
   poetry install
   poetry run uvicorn main:app --host 0.0.0.0 --port 8081 --reload
   ```

   The backend will be accessible at http://localhost:8081.

### Frontend (ReactJS)

1. **Clone the repository:**

   ```bash
   cd ../companion_ui
   ```

2. **NPM Install and Start the server**

   ```bash
   npm install

   npm run start
   ```

   The frontend will be accessible at http://localhost:3000.

## Usage

- Once both servers are running, navigate to the frontend URL in your web browser.
- You can start chatting with your personal AI companion, ask questions, and get responses from your documents.
- Use the "Answer from Your Docs" button to access the document query functionality.

## Contributing

If you want to contribute to this project, feel free to fork the repository and submit a pull request. Your feedback and contributions are always welcome
