const ShoppingService = require("../src/shopping-list-service");
const knex = require("knex");
const { expect } = require("chai");

describe(`Articles service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: "test name1",
      price: "12.23",
      category: "Main",
      checked: true,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      name: "test name1",
      price: "22.23",
      category: "Main",
      checked: true,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      name: "test name3",
      price: "32.23",
      category: "Main",
      checked: true,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });
  before(() => db("shopping_list").truncate());
  before(() => {
    return db.into("shopping_list").insert(testItems);
  });
  after(() => db.destroy());
  describe("Shopping-list service object", () => {
    describe("getAllItems()", () => {
      it("resolves all items from 'shopping_list table", () => {
        return ShoppingService.getAllItems(db).then((actual) => {
          expect(actual).to.eql(testItems);
        });
      });
    });
  });
});
