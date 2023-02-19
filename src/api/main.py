import os

from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")


class Blog(BaseModel):
    id: int
    content: str


@app.post("/addblog/")
async def add_blog(blog: Blog):

    f = open(f"..\Database\{blog.id}.txt", 'w')
    f.write(blog.content)

    f.close()

    return {"msg": "Ay-yo"}
