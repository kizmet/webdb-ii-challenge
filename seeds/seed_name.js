exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          id: 1,
          VIN: "WDDLJ7DB0CA008277",
          make: "Mercedes-Benz",
          model: "CLS",
          mileage: "104530",
          transmission: "Automatic",
          title: "clean"
        }
      ]);
    });
};
