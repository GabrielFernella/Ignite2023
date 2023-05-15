# Package
1. npm i typescript @types/node tsx tsup -D
2. npm i fastify
3. npm i dotenv
4. npm i zod
5. npm i eslint @rocketseat/eslint-config -D
6. npm i prisma -D
7. npm i @prisma/client
8. npm i bcryptjs
9. npm i -D @types/bcryptjs
10. npm i vitest vite-tsconfig-paths -D
11. npm i @vitest/coverage-c8
12. npm i -D @vitest/ui 
13. npm i dayjs
14. npm i @fastify/jwt (complemento do fastify trabalhar com jwt)
15. npm i -D npm-run-all (para executar códigos a nivel do npm)
16. npm i supertest -D (lib para teste e2e)
17. npm i @types/supertest -D



# Commands
1. npx tsc --init
2. npx prisma init
3. npx prisma generate
4. docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker  -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
5. npx prisma migrate dev
6. npx prisma studio
7. docker compose up -d    ||   docker rm api-solid-pg || docker compose stop
8. npm link (dentro da lib que vc está criando)
9. npm link vitest-environment-prisma
10. npm run test:e2e:watch



