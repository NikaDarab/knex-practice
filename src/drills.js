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

    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw("now()-'?? days'::INTERVAL", daysAgo)
    )
    .then((result) => {
      console.log(`Products added ${daysAgo} days ago`);
      console.log(result);
    });
};

const totalCost = () => {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log(result);
    });
};
// itemsWithText("fish");
// paginateItems(2);
// itemsAddedAfter(21);
totalCost();
