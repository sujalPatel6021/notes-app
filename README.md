# notes-app

Simple Notes App built with Node.js and Express for SIT753 7.3HD DevOps Pipeline with Jenkins.

## Features
- Create notes
- View all notes
- View single note
- Update note
- Delete note
- Health check endpoint

## Run locally
```bash
npm install
npm start
```

## Run tests
```bash
npm test
npm run coverage
```

## Run with Docker
```bash
docker build -t notes-app .
docker run -p 3000:3000 notes-app
```

## Run with Docker Compose
```bash
docker compose up --build -d
```