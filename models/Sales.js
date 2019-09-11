"use strict";

const { Model } = require("objection");

class Sales extends Model {
  static get tableName() {
    return "sales";
  }
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Cars",
        join: {
          from: "cars.id",
          to: "sales.carId"
        }
      }
    };
  }
}

module.exports = Sales;
