const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("admin", (await bcrypt.hash('admin',10))),
        },
      ]);
    });
};
