## Requirement
- Node 16.20+

## Run Locally
- Run `git clone this repo`.
- Run `docker compose up`
- Run `cd be`.
- Run `cp .env.example .env`.
- Copy these values
- ```bash
        REDIS_HOST=localhost
        REDIS_PORT=6379
        REDIS_PASSWORD=
  ```
- Run `npm i`.
- Run `npm run dev`.
- Run `npm run dev:consumer`.
- Run `cd ../fe`
- Run `npm i`
- Run `npm run dev`
- Go to link [127.0.0.1:5173](http://127.0.0.1:5173/)