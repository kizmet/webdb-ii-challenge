"use strict";

const { transaction } = require("objection");
const Cars = require("./models/Cars");

module.exports = router => {
  // Create a new Cars. Because we use `insertGraph` you can pass relations
  // with the car and they also get inserted and related to the car. If
  // all you want to do is insert a single car, `insertGraph` and `allowInsert`
  // can be replaced by `insert(req.body)`.
  router.post("/cars", async (req, res) => {
    const graph = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Cars.knex(), trx => {
      return (
        Cars.query(trx)
          // For security reasons, limit the relations that can be inserted.
          // .allowInsert("[pets, children.[pets, movies], movies, parent]")
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
  });

  // Patch a single Cars.
  router.patch("/cars/:id", async (req, res) => {
    const car = await Cars.query().patchAndFetchById(req.params.id, req.body);

    res.send(car);
  });

  // Get multiple Carss. The result can be filtered using query parameters
  // `minAge`, `maxAge` and `firstName`. Relations can be fetched eagerly
  // by giving a relation expression as the `eager` query parameter.
  router.get("/cars", async (req, res) => {
    // We don't need to check for the existence of the query parameters because
    // we call the `skipUndefined` method. It causes the query builder methods
    // to do nothing if one of the values is undefined.
    const cars = await Cars.query()
      .skipUndefined()
      // For security reasons, limit the relations that can be fetched.
      // .allowEager(
      //   "[pets, parent, children.[pets, movies.actors], movies.actors.pets]"
      // )
      // .eager(req.query.eager)
      // .where("model", "like", req.query.model)
      .orderBy("model");
    // Order eagerly loaded pets by name.

    res.send(cars);
  });

  // Delete a car.
  router.delete("/cars/:id", async (req, res) => {
    await Cars.query().deleteById(req.params.id);

    res.send({});
  });
};

// The error returned by this function is handled in the error handler middleware in app.js.
function createStatusCodeError(statusCode) {
  return Object.assign(new Error(), {
    statusCode
  });
}
