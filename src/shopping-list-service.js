const ShoppingService = {
  //get
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  insertItems() {
    return Promise.resolve();
  },
};
module.exports = ShoppingService;
