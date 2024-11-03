import re

from fastapi import APIRouter

# from langchain import OpenAI as OpenAILC
from langchain.prompts import ChatPromptTemplate
from openai import OpenAI

router = APIRouter()

sensitive_words = [
    "suicide",
    "self-harm",
    "cut",
    "overdose",
    "take my life",
    "end it all",
    "kill myself",
    "end my pain",
    "want to die",
    "kill",
    "murder",
    "violence",
    "beat",
    "hurt",
    "attack",
    "harm",
    "stab",
    "shoot",
    "bomb",
    "explode",
    "drug",
    "alcohol",
    "addiction",
    "pills",
    "tablet",
    "heroin",
    "meth",
    "cocaine",
    "marijuana",
    "opioids",
    "anxiety",
    "depression",
    "stress",
    "panic",
    "PTSD",
    "bipolar",
    "schizophrenia",
    "mental illness",
    "trauma",
    "hopelessness",
    "hopeless",
    "alone",
    "worthless",
    "lost",
    "despair",
    "numb",
    "empty",
    "confusion",
]

more_help_keywords = [
    "not helpful",
    "not helping",
    "provide more info",
    "need assistance",
    "can you clarify",
    "more details",
]


SYS_PROMPT = """
You are a compassionate and supportive chatbot designed to comfort individuals who are feeling homesick. Your primary goal is to engage users in a warm and empathetic conversation about their feelings, inquire about their hometown, and provide comforting and positive words to help them feel more connected and less alone.
Greet the User Warmly:
Start with a friendly and inviting greeting to make the user feel welcome and at ease.
Encourage Sharing:
Gently ask the user to share where they are from and what they miss most about their hometown.
Express Empathy:
Acknowledge their feelings of homesickness and validate their emotions with understanding and empathy.
Highlight Positive Aspects:
Discuss the beautiful aspects of their hometown including culture, traditions, popular places, or memories they cherish.
 Provide Comfort:
Offer comforting and positive words, reminding them of the connections they can maintain even when far from home and suggest simple ways to stay connected.
Inquire About Their Current Environment:
Ask about their current location and what interesting or positive aspects they might explore in their new environment.
Encourage Positive Actions:
Suggest activities that might help lessen homesickness, such as connecting with a community from their hometown, trying out familiar recipes, or setting up virtual calls with family and friends.
Closing:
End the conversation with reassuring words and offer to chat anytime they feel the need to talk.
Example Interaction:
User: I’ve been feeling really homesick lately.
Bot: I’m sorry to hear that you’re feeling this way. Homesickness can be tough. Would you like to share a bit about where you’re from and what you miss most?
User: I’m from a small town in Italy, and I miss the food and my family a lot.
Bot: Italian towns are so charming and full of culture! I bet the food must be incredible. It’s understandable to miss your family and those familiar flavors. Remember, those special memories and connections stay with you no matter where you go. Have you found any nice Italian places in your current city where you can enjoy a taste of home?
"""

# llm = OpenAILC(model_name="gpt-3.5-turbo", openai_api_key="YOUR_API_KEY")

# Create a prompt template
prompt_template = ChatPromptTemplate.from_template(SYS_PROMPT)


@router.post("/v1/chat/completions")
async def chat_completions(question: str):
    response = {
        "content": "",
        "refusal": None,
        "role": "assistant",
        "other_users": "",
        "emergencey": "",
        "resources": [""],
    }
    client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

    completion = client.chat.completions.create(
        model="RichardErkhov/herisan_-_llama-3-8b_mental_health_counseling_conversations-gguf",
        messages=[
            {
                "role": "system",
                "content": SYS_PROMPT,
            },
            {"role": "user", "content": f"{question}"},
        ],
        temperature=0.7,
    )

    print(completion.choices[0].message)
    response["content"] = completion.choices[0].message["content"]

    input_text_lower = question.lower()

    # Find sensitive words in the input text
    detected_words = [
        word
        for word in sensitive_words
        if re.search(r"\b" + re.escape(word) + r"\b", input_text_lower)
    ]

    if len(detected_words) > 0:
        response["emergency"] = {
            "911": "Emergency services (Police, Fire, Medical)",
            "HealthCare": "1-800-273-8255",
            "NearbyHospitals": {
                "Strong Memorial Hospital": "601 Elmwood Ave, Rochester, NY 14642",
                "Rochester General Hospital": "1425 Portland Ave, Rochester, NY 14621",
                "Unity Hospital": "1555 Long Pond Rd, Rochester, NY 14626",
            },
            "PoisonControl": "1-800-222-1222",
        }

    if any(keyword in input_text_lower for keyword in more_help_keywords):
        response["other_users"] = (
            "It seems like you're looking for more assistance. Would like to reach out to other users who can help you better in your situation?"
        )

    if "need more" in input_text_lower:
        response["respources"] = [
            "National Alliance on Mental Illness (NAMI): https://www.nami.org",
            "Substance Abuse and Mental Health Services Administration (SAMHSA): https://www.samhsa.gov",
            "MentalHealth.gov: https://www.mentalhealth.gov",
            "Crisis Text Line: https://www.crisistextline.org",
            "National Suicide Prevention Lifeline: https://suicidepreventionlifeline.org",
            "American Psychological Association (APA): https://www.apa.org",
            "Mental Health America (MHA): https://www.mhanational.org",
            "Veterans Affairs Mental Health: https://mentalhealth.va.gov",
            "The Trevor Project (LGBTQ+ Youth): https://www.thetrevorproject.org",
            "The Jed Foundation (JED): https://www.jedfoundation.org",
            "Psychology Today Therapist Directory: https://www.psychologytoday.com/us/therapists",
            "BetterHelp: https://www.betterhelp.com",
        ]

    return response
