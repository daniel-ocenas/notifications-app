# Notifications App

A minimal monorepo with a NestJS GraphQL backend and a React web client implemented using the Next.js framework. The
backend stores announcements in DynamoDB and emits real-time updates via WebSockets; the web app consumes the GraphQL
API and listens for live updates.

## Main technologies

- Backend: NestJS, GraphQL (Apollo), WebSockets
- Database: AWS DynamoDB
- Web: React, Next.js, Tailwind, Apollo Client
- TypeScript, Jest, ESLint, Prettier

## Start commands

Make sure you have Docker installed and running, then start the container:

```
cd infra    

docker-compose up -d
```

For local development run the following commands in the root directory:

- Install dependencies (root):
    - `npm install`
- Run backend and web together (dev):
    - `npm run dev`
- Run only backend (watch mode):
    - `npm run dev:backend`
- Run only web app:
    - `npm run dev:web`
- Run backend tests:
    - `npm run tests:backend`

## API testing

You can test the API using Postman or Insomnia using the following requests

All requests share the POST method to url: http://localhost:3000/graphql
using header Content-Type: application/json
Replace \_\_pasteId__ with the id of the announcement you want to test.

Postman collection can be imported from the file Announcements.postman_collection.json

Queries:

- listAnnouncements:
  ```
  { 
    "query": "query { announcements { id title content category publicationDate updatedAt } }" 
  }
  ```
- getAnnouncementById:
  ```
  { 
    "query": "query { announcement(id: \"__pasteId__\") { id title content category publicationDate updatedAt } }"
  }
  ```
- createAnnouncement:
  ```
  {
    "query": "mutation ($input: CreateAnnouncementInput!) { createAnnouncement(input: $input) { id title content category publicationDate } }",
    "variables": {
      "input": {
        "title": "Test",
        "content": "Hello world",
        "category": ["Crime & Safety", "Emergencies"],
        "publicationDate": "2025-12-19T12:47:31.696Z"
      }
    }
  }
  ```
- updateAnnouncement:
  ```
  {
    "query": "mutation ($input: UpdateAnnouncementInput!) { updateAnnouncement(input: $input) { id title content category publicationDate } }",
    "variables": {
      "input": {
        "id": "__pasteId__",
        "title": "Test",
        "content": "Hello world",
        "category": ["Crime & Safety", "Emergencies"],
        "publicationDate": "2025-12-19T12:47:31.696Z"
      }
    }
  }
  ```



