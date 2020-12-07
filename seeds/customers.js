const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function () {
      return knex
        .table("users")
        .first("id")
        .then((user) => {
          // Inserts seed entries
          return knex("customers").insert([
            {
              user_id: user.id,
              email: faker.internet.email(),
            },
            {
              user_id: user.id,
              email: faker.internet.email(),
            },
          ]);
        });
    });
};
