Авторизация, аутентификация node.js + Postgresql


#install

knex migrate:latest --env development

knex seed:run --env development


knex migrate:make users

knex migrate:make movies

