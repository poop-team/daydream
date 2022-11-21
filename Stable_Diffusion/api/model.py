from torch import torch, autocast
from diffusers import StableDiffusionPipeline
from api.conf import hg_Token, aws_access_key_id, aws_secret_access_key
import uuid
import boto3

def load_inference():
    pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4", 
        revision="fp16", 
        torch_dtype=torch.float16,
        use_auth_token=hg_Token
    )
    pipe = pipe.to("cuda")

    return pipe