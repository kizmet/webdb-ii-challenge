"use strict";

const { Model } = require("objection");
const Sales = require("./Sales");

class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      sales: {
        relation: Model.HasManyRelation,
        modelClass: Sales,
        join: {
          from: "cars.id",
          to: "sales.carId"
        }
      }
    };
  }
}

module.exports = Cars;
