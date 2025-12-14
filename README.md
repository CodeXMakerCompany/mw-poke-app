# Pokemon Monorepo App

A full-stack application with Next.js client and Node.js/Express server, managed as a monorepo.

# Live Demo !

- Client: [https://mw-poke-app-client-git-prod-codexmakers-projects.vercel.app](https://mw-poke-app-client-git-prod-codexmakers-projects.vercel.app)
- Server: [https://vnbiu4tt43ywn2qurni4tcmyqu0fxkxr.lambda-url.us-east-1.on.aws/](https://vnbiu4tt43ywn2qurni4tcmyqu0fxkxr.lambda-url.us-east-1.on.aws/)

## Quick Start (Docker - 1st recommended)

Please use docker compose to run the app after cloning the repo in your local machine.

#### Optional (Manual Run - 2nd recommended)
```bash
cd client
npm install
npm run dev
```

```bash
cd server
npm install
npm run dev
```

### Prerequisites
- Docker & Docker Compose installed on your machine.
- Rename the client.env.example to client.env and server.env.example to server.env then fill the values at environments.

```bash 
NEXT_PUBLIC_SERVER_URL=http://server:8000 
```
- That's it for the envs!

### How to Run
1. Open your terminal in the root folder.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
3. Wait for the containers to start.

### Access the App
- **Client**: [http://localhost:3001](http://localhost:3001)
- **Server**: [http://localhost:8000](http://localhost:8000)
---

### Linting and test
- These can be tested isolated on each folder client/server but the recommended way is to run it via husky
```bash
sh .husky/pre-commit
```
- Otherwise, you can run it on each folder client/server
```bash
npm run lint
npm run test
```

### Terraform
- Terraform template are at infra folder and should be manually triggered (CI/CD pipeline wil solve it in a future)
```bash
#To update and redeploy the last infra changes please run the next command, also be sure to have the last version of terraform installed:
terraform init -upgrade
```
- You will need key's for vercel and aws to deploy the app please contact me to get them.

## Tech Stack

- **Client**: Next.js 15, TypeScript, TailwindCSS, Framer Motion
- **Server**: Node.js, Express, TypeScript, DDD Architecture
- **Infrastructure**: Docker, Terraform (AWS Lambda + Vercel)

## Features & Extras

Extras implemented:
[X] Lint and tests Husky managed by pre-commits it test the full-monorepo
[X]​ Docker compose in the monorepo for development env
[X]​ Next.js used for client side
[X]​ Terraform included sending the clioent to vercel and server to aws lambda