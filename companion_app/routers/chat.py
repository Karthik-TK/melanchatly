from fastapi import APIRouter
from services.chat import predict_response

router = APIRouter()


@router.post("/chat")
def chat_with_me(question: str) -> str:
    print("####### QUESTION #######", question)
    response = predict_response(context=question)
    return response
