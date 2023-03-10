# packages
1. npm i -D typescript
2. npm i fastify
3. npm install -D @types/node
4. npm install tsx -D
5. npm i eslint @rocketseat/eslint-config -D
6. npm i knex sqlite3
7. npm i knex -g
8. npm i dotenv
9. npm i zod (para validação de dados)


# commands
1. npx tsc --init
2. npx knex migrate:make create-documents
3. npm run knex -- -h
4. npm run knex -- migrate:make create-documents (Criar um arquivo do zero para montar o schema do banco)
5. npm run knex -- migrate:latest (vai ler todas as migrations e executa-las)
5. npm run knex -- migrate:rollback (remove a migration)
6. 
