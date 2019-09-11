"use strict";

const { transaction } = require("objection");
const Cars = require("./models/Cars");
const Sales = require("./models/Sales");

module.exports = router => {
  //get all cars
  router.get("/cars", async (req, res) => {
    const cars = await Cars.query()
      .skipUndefined()
      .eager(req.query.eager)
      .where("model", "like", req.query.model)
      .orderBy("id");

    res.send(cars);
  });
  //add a new car
  router.post("/cars", async (req, res) => {
    const graph = req.body;
    const insertedGraph = await transaction(Cars.knex(), trx => {
      return Cars.query(trx).insertGraph(graph);
    });
    res.send(insertedGraph);
  });

  //update a car
  router.patch("/cars/:id", async (req, res) => {
    const car = await Cars.query().patchAndFetchById(req.params.id, req.body);

    res.send(car);
  });
  //get a car by id
  router.get("/cars/:id", async (req, res) => {
    const car = await Cars.query().findById(req.params.id);
    //.where("id", "=", req.params.id);

    res.send(car);
  });

  // Delete a car
  router.delete("/cars/:id", async (req, res) => {
    await Cars.query().deleteById(req.params.id);

    res.send({});
  });
  //get all sales
  router.get("/sales", async (req, res) => {
    const sales = await Sales.query()
      .skipUndefined()
      .eager(req.query.eager)
      .where("carId", "like", req.query.model)
      .orderBy("carId");

    res.send(sales);
  });

  //get sales per car
  //http://localhost:8641/cars/9/sales
  router.get("/cars/:id/sales", async (req, res) => {
    const car = await Cars.query().findById(req.params.id);

    if (!car) {
      throw createStatusCodeError(404);
    }
    const sales = await car
      .$relatedQuery("sales")
      .skipUndefined()
      .where("name", "like", req.query.name);

    res.send(sales);
  });

  // Add a sales for a Car.
  //http://localhost:8641/cars/9/sales
  //  {"date": "315336736931484.0", "price": 11223333}

  router.post("/cars/:id/sales", async (req, res) => {
    const sales = await transaction(Cars.knex(), async trx => {
      const car = await Cars.query(trx).findById(req.params.id);

      if (!car) {
        throw createStatusCodeError(404);
      }

      return await car.$relatedQuery("sales", trx).insert(req.body);
    });

    res.send(sales);
  });
};

function createStatusCodeError(statusCode) {
  return Object.assign(new Error(), {
    statusCode
  });
}
