FROM python:3.10

WORKDIR /backend

COPY ./pyproject.toml .
COPY ./poetry.lock .

RUN pip install poetry
RUN poetry install

COPY ./tanktics/ tanktics/

RUN poetry install

EXPOSE 8000

CMD ["poetry", "run", "fastapi", "dev", "tanktics/main.py", "--host", "0.0.0.0"]
