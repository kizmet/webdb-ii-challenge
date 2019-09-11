// const faker = require("faker");
//
// const fakeSale = () => ({
//   date: faker.date.past(),
//   price: faker.commerce.price()
// });
//
// exports.seed = async function(knex, Promise) {
//   const fakeSales = [];
//   const sales = 21;
//   for (let i = 1; i < sales; i++) {
//     fakeSales.push(fakeSale());
//   }
//   await knex("sales").del();
//   await knex("sales").insert(fakeSales);
// };
//
// //knex seed:run
// //knex seed:run --specific=02-sales.js
