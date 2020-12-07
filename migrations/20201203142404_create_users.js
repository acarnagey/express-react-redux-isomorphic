exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
