from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/", include_in_schema=False)
def read_root(request: Request) -> str:
    return "Welcome to Companion AI app"


@router.get("/ping")
def app_ping() -> bool:
    return True
