# Build
FROM node:slim AS build

WORKDIR /app

COPY frontend/. ./

# install and build

RUN npm install && npm run build

# Runtime
FROM python:3.12.10-slim AS runtime

WORKDIR /app

# create directory for UX
RUN mkdir /app/frontend

COPY --from=build /app/dist /app/frontend/dist/.

# copy python requirements
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# copy support components
RUN mkdir /app/server

COPY server/. /app/server

# copy entrypoint 
COPY main.py /app/main.py

# set env variables
EXPOSE 5000

ENTRYPOINT ["python","main.py"]