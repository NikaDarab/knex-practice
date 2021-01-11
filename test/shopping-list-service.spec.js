const ShoppingService = require("../src/shopping-list-service");
const knex = require("knex");
const { expect } = require("chai");

describe("shopping service object", function () {
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
  afterEach(() => db("shopping_list").truncate());
  after(() => db.destroy());
  context("Given 'shopping_list' has data", () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testItems);
    });
  });

  it("getAllItems() resolves all items from 'shopping_list table", () => {
    return ShoppingService.getAllItems(db).then((actual) => {
      expect(actual).to.eql(
        testItems.map((item) => ({
          ...item,
          checked: false,
        }))
      );
    });
  });
  it(`getById() resolved an item from 'shopping_list' table`, () => {
    const thirdId = 3;
    const thirdTestItem = testItems[thirdId - 1];
    return ShoppingService.getById(db, thirdId).then((actual) => {
      expect(actual).to.eql({
        id: thirdId,
        name: thirdTestItem.name,
        price: thirdTestItem.price,
        category: thirdTestItem.category,
        checked: false,
        date_added: thirdTestItem.date_added,
      });
    });
  });
  context("Given 'shopping_list' has no data", () => {
    it("getAllItems() resolved an empty array", () => {
      return ShoppingService.getAllItems(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });
    it("insertItema() inserts a new item and resolved the new item with an id", () => {
      const newItem = {
        name: "Test new name",
        price: "20.00",
        category: "Main",
        checked: true,
        date_added: new Date("2020-01-01T00:00:00.000Z"),
      };
      return ShoppingService.insertItems(db, newItem).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          checked: newItem.checked,
          date_added: newItem.date_added,
        });
      });
    });
  });
});
