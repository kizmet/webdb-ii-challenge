const faker = require("faker");

const fakeCar = i => ({
  id: i,
  VIN: faker.internet.password(),
  make: faker.commerce.product(),
  model: faker.commerce.productName(),
  mileage: faker.random.number(),
  transmission: faker.commerce.product(),
  title: faker.commerce.product()
});

const fakeSale = i => ({
  carId: i,
  date: faker.date.past(),
  price: faker.commerce.price()
});

exports.seed = async function(knex, Promise) {
  const fakeCars = [];
  const cars = 50;
  for (let i = 1; i < cars; i++) {
    fakeCars.push(fakeCar(i));
  }

  const fakeSales = [];
  const sales = 50;
  for (let i = 1; i < sales; i++) {
    fakeSales.push(fakeSale(i));
  }
  await knex("cars").del();
  await knex("cars").insert(fakeCars);
  await knex("sales").del();
  await knex("sales").insert(fakeSales);
};

//knex seed:run
//knex seed:run --specific=cars.js
//knex seed:run --specific=seeds/01-cars.js
