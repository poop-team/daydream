from celery import group
from fastapi import APIRouter
from starlette.responses import JSONResponse

from api import sb
from celery_tasks.tasks import get_image_task
from config.celery_utils import get_task_info
from schemas.schemas import Item

router = APIRouter(prefix='/sb', tags=['Sb'], responses={404: {"description": "Not found"}})


@router.post("/async")
async def get_images_async(item: Item):
    print('inside get_images_async!')
    task = get_image_task.delay(item.prompt)
    return JSONResponse({"task_id": task.id})


@router.get("/task/{task_id}")
async def get_task_status(task_id: str) -> dict:
    """
    Return the status of the submitted Task
    """
    return get_task_info(task_id)

