FROM python:3.10

WORKDIR /backend

COPY ./pyproject.toml /backend/
COPY ./poetry.lock /backend/

RUN pip install poetry
RUN poetry install

COPY ./tanktics/main.py /backend/tanktics/
COPY ./tanktics/src /backend/tanktics/src

RUN poetry install

EXPOSE 8000

CMD ["poetry", "run", "fastapi", "dev", "tanktics/main.py", "--host", "0.0.0.0"]
