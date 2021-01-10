require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

const itemsWithText = (searchTerm) => {
  knexInstance
    .select("name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => console.log(result));
};

const paginateItems = (pageNumber) => {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance
    .select("shopping_list")
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset)
    .then((result) => console.log(result));
};
// itemsWithText("fish");
paginateItems(2);
