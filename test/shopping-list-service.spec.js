const ShoppingService = require("../src/shopping-list-service");
const knex = require("knex");

describe(`Articles service object`, function () {
  let db;
  let testItems = [
    {
      name: "test name1",
      price: 12.23,
      category: "Main",
      checked: true,
    },
    {
      name: "test name1",
      price: 22.23,
      category: "Main",
      checked: true,
    },
    {
      name: "test name3",
      price: 32.23,
      category: "Main",
      checked: true,
    },
  ];
  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });
  before(() => {
    return db.into("shopping_list").insert(testItems);
  });
  after(() => db.destroy());
  describe("Shopping-list service object", () => {
    describe("getAllItems()", () => {
      it("resolves all items from 'shopping_list table", () => {});
    });
  });
});
