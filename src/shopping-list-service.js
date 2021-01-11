const ShoppingService = {
  //get
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  insertItems(knex, newItem) {
    return knex
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};
module.exports = ShoppingService;
