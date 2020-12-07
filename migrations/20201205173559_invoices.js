exports.up = function (knex) {
  return knex.schema.createTable("invoices", function (table) {
    table.increments();
    table.decimal("total").notNullable();
    table.integer("customer_id").unsigned().notNullable();
    table.foreign("customer_id").references("customers.id").onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("invoices");
};
