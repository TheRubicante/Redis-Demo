
This is a self-education project. 

The primary goal is to get more comfortable using Redis as a runtime data structure server with MySQL as a persistence layer.

The plan is to have a minimalist idle game that I can explore how implementation of in-flight and persisted data is managed in Redis.

I also want to practice with time-based offline progression, and avoid frontend complexity.

##Architecture plan
- Backend: Node.js (Express)
- Runtime State: Redis
- Durable Storage: MySQL
- Frontend: HTML + Vanilla JS

##Running Locally
1. Start services: 
  docker-compose up -d

2. Start backend:
  cd backend
  npm install
  node src/index.js

3. Open frontend:
  Open frontend/index.html in a browser
