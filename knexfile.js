// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    host: 'localhost',
    user: "redux",
    password: "password",
    database: "redux_end_to_end",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
