from torch import torch, autocast
from diffusers import StableDiffusionPipeline
from api.conf import hg_Token, aws_access_key_id, aws_secret_access_key
import uuid
import boto3

def generateImage(prompt):
    pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4", 
        revision="fp16", 
        torch_dtype=torch.float16,
        use_auth_token=hg_Token
    )
    pipe = pipe.to("cuda")
    session = boto3.Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )
    s3 = session.resource('s3')
    bucket = s3.Bucket("sbleaping")

    with autocast("cuda"):
        image = pipe(prompt).images[0]

    file_name = f'{uuid.uuid4().hex}.png'
    object_name = 'sb/'+ file_name
    image.save(file_name)
    response = bucket.upload_file(file_name, object_name)
    url = "https://sbleaping.s3.us-east-1.amazonaws.com/"+object_name
    print(url)
    return url
