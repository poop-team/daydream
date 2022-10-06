from typing import List

from celery import shared_task

from api.sb import generateImage

@shared_task(bind=True,autoretry_for=(Exception,), retry_backoff=True, retry_kwargs={"max_retries": 0},
             name='sb:get_image_task')
def get_image_task(self, prompt: str):
    print("inside task")
    print(prompt)
    url = generateImage(prompt)
    return url
