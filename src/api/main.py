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

# CORS 오류 방지 코드 ----

dir_path = "../Database/"

searchText = ""


class Blog(BaseModel):
    title: str
    content: str


@app.get("/showblog")
def show_blog():
    file_list = os.listdir(dir_path)
    file_list_txt = [file for file in file_list if file.endswith(".txt")]

    text_list = []

    for file in file_list_txt:
        f = open(f"../Database/{file}", "r")
        file_text = f.read()
        text_list.append(file_text)

    return {"content": text_list}


@app.post("/addblog/")
async def add_blog(blog: Blog):

    f = open(f"..\Database\{blog.title}.txt", 'w')
    f.write(blog.content)

    f.close()

    return {"msg": "Ay-yo"}


@app.post("/delectblog/")
async def delect_blog(blog: Blog):

    file_path = f'../Database/{blog.title}.txt'
    os.remove(file_path)

    return {"msg": "삭제 성공"}


@app.get("/search/{searchText}")
def search_blog(searchText):
    file_list = os.listdir(dir_path)
    file_list_txt = [file for file in file_list if file.endswith(".txt")]

    text_list = []

    for file in file_list_txt:
        f = open(f"../Database/{file}", "r")
        file_text = f.read()
        text_list.append(file_text)

    print(searchText)

    text_search_list = []

    for file in text_list:
        if searchText in file:
            text_search_list.append(file)
        else:
            continue

    return {"searchKeyword": searchText, "searchRes": text_search_list}
