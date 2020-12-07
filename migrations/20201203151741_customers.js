exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments();
    // table.decimal('total').notNullable();
    table.string("email").notNullable();

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
