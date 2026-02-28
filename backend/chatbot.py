import os
try:
    import google.generativeai as genai
except ImportError:
    genai = None

API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY and genai:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
else:
    model = None

def fitness_chatbot(message):
    prompt = f"""
    You are a professional AI fitness coach.

    Rules:
    - Speak naturally like a human trainer
    - NO quotes
    - NO markdown stars
    - Short conversational responses
    - Sound motivating and realistic

    User: {message}
    """

    fallback = (
        "Nice work checking in. Keep your form controlled, stay hydrated, and "
        "focus on consistency this week. If you share your goal, I can suggest "
        "a full workout and diet plan."
    )

    if model is None:
        return fallback

    try:
        response = model.generate_content(prompt)
        text = getattr(response, "text", "") or fallback
    except Exception:
        text = fallback

    text = text.replace('"', '')
    text = text.replace('*', '')
    return text