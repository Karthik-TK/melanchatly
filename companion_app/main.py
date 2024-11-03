from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, ping, rag

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

refresh_openapi_docs = False

app.include_router(ping.router)
app.include_router(chat.router)
app.include_router(rag.router)
