# YouTube Transcript Translator & Summarizer

A powerful web application that fetches YouTube transcripts, translates them into multiple languages, and provides AI-generated summaries in a convenient split-view interface.

## 🚀 Features

-   **Transcript Fetching**: Automatically extracts transcripts from YouTube videos.
-   **Multi-language Translation**: Translate transcripts into languages like Hindi, Telugu, Spanish, French, and more.
-   **AI Summarization**: Generates concise 3-paragraph summaries (Introduction, Main Ideas, Conclusion).
-   **Split Video View**: Toggle between a chat-only view and a side-by-side summary view.
-   **Interactive Chat**: Conversational interface for easy interaction.

## 🛠️ Tech Stack

### Frontend
-   **React.js**: specific UI library.
-   **CSS3**: Custom responsive styling with flexbox layouts.

### Backend
-   **FastAPI**: High-performance web framework for building APIs with Python.
-   **YouTube Transcript API**: For fetching video captions.
-   **LangChain & Google Gemini**: For AI-powered summarization.
-   **Deep Translator**: For text translation.

## 📦 Installation & Setup

### Prerequisites
-   Node.js & npm
-   Python 3.8+

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd back_end
```

Install dependencies:
```bash
pip install -r requirements.txt
```
*(Note: Ensure you have `fastapi`, `uvicorn`, `youtube-transcript-api`, `deep-translator`, `langchain-core`, and `llm-gemini` installed or listed in requirements)*

**Environment Configuration:**
Create a `.env` file in the `back_end` directory and add your Google Gemini API key:
```env
api_key=your_api_key_here
```

Run the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will start at `http://127.0.0.1:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd front_end
```

Install dependencies:
```bash
npm install
```

Start the React application:
```bash
npm start
```
The app will open at `http://localhost:3000`.

## 📖 Usage

1.  **Paste URL**: Copy a YouTube video URL and paste it into the input box.
2.  **Select Language**: Choose your desired target language from the dropdown (default is English).
3.  **Send**: Click the "Send" button.
4.  **View Results**:
    -   The translated transcript will appear in the chat bubble.
    -   Click the **"Summary"** button to open the side panel and read the AI-generated summary.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
