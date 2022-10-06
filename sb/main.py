import time

import uvicorn as uvicorn
from fastapi import FastAPI

from config.celery_utils import create_celery
from routers import sb
from fastapi.middleware.cors import CORSMiddleware

def create_app() -> FastAPI:
    current_app = FastAPI(title="Asynchronous tasks processing with Celery and RabbitMQ",
                          description="POOP Project "
                                      "COP 4331",
                          version="1.0.0", )
    current_app.celery_app = create_celery()
    current_app.include_router(sb.router)
    return current_app


app = create_app()
celery = app.celery_app

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request, call_next):
    print('inside middleware!')
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(f'{process_time:0.4f} sec')
    return response


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
