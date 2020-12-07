const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("invoices")
    .del()
    .then(function () {
      return knex
        .table("customers")
        .first("id")
        .then((customer) => {
          // Inserts seed entries
          return knex("invoices").insert([
            {
              customer_id: customer.id,
              total: faker.commerce.price(),
            },
            {
              customer_id: customer.id,
              total: faker.commerce.price(),
            },
          ]);
        });
    });
};
