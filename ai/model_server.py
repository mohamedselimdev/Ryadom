"""Optional text-generation service for the Ryadom chat.

Run:  python ai/model_server.py
Then set AI_SERVICE_URL=http://127.0.0.1:8000 in .env so the Node server forwards chat messages here.
"""
import os

from flask import Flask, jsonify, request
from transformers import pipeline

MODEL_NAME = os.getenv("AI_MODEL", "ai-forever/rugpt3small_based_on_gpt2")
PORT = int(os.getenv("AI_PORT", "8000"))
MAX_INPUT_CHARS = 1000

app = Flask(__name__)
generator = pipeline("text-generation", model=MODEL_NAME)


@app.post("/generate")
def generate():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()[:MAX_INPUT_CHARS]
    if not message:
        return jsonify({"error": "message is required"}), 400

    output = generator(message, max_new_tokens=80, num_return_sequences=1, do_sample=True, top_p=0.9)
    text = output[0]["generated_text"]
    reply = text[len(message):].strip() if text.startswith(message) else text.strip()
    return jsonify({"reply": reply})


if __name__ == "__main__":
    # Bind to localhost only: the service is called by the Node server, not by browsers.
    app.run(host="127.0.0.1", port=PORT)
