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
    .select("name")
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset)
    .then((result) => console.log(result));
};

const itemsAddedAfter = (daysAgo) => {
  knexInstance
    .select("name", "price")

    .count("date_added AS days")
    .where(
      "date_added",
      ">",
      knexInstance.raw("now()-'?? days'::INTERVAL", daysAgo)
    )
    .from("shopping_list")
    .groupBy("name", "price")
    .orderBy([
      { column: "name", order: "ASC" },
      { column: "days", order: "DESC" },
    ])
    .then((result) => console.log(result));
};
// itemsWithText("fish");
// paginateItems(2);
itemsAddedAfter(21);
