from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import os

# Load variables from .env into the environment
load_dotenv()

# Get the value of API_KEY (make sure the name matches your .env)
api_key = os.getenv("api_key")


llm = ChatGoogleGenerativeAI(
    model="gemini-3-flash-preview",
    temperature=1.0,  # Gemini 3.0+ defaults to 1.0
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=api_key
    # other params...
)