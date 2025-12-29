# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import your class
from yt_transcript import YouTubeTranscriptTranslator



app = FastAPI()

# Allow React access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
class Item(BaseModel):
    url: str
    target_lang: str = "en"

    model_config = {
        "json_schema_extra": {
            "example": {
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "target_lang": "en"
            }
        }
    }

@app.post("/translate")
def translate(item: Item):
    url = item.url
    target_lang = item.target_lang

    if not url:
        raise HTTPException(400, "Missing 'url'")

    try:
        translator = YouTubeTranscriptTranslator(url, target_lang)
        result = translator.result 
        summary = translator.summarize_transcript()  # uses your .translate_in_chunks pipeline
    except Exception as e:
        raise HTTPException(400, f"Error: {e}")

    return {
        "video_id": translator.video_id,
        "target_lang": target_lang,
        "translated_text": result,
        "summary": summary
    }
