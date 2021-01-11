const ShoppingService = require("../src/shopping-list-service");
const knex = require("knex");

describe(`Articles service object`, function () {
  let db;

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  describe("Shopping-list service object", () => {
    describe("getAllItems()", () => {
      it("resolves all items from 'shopping_list table", () => {});
    });
  });
});
