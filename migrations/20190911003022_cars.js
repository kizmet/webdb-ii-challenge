exports.up = (knex, Promise) => {
	return Promise.all([
		knex.schema.hasTable("cars").then(function(exists) {
			if (!exists) {
				return knex.schema.createTable("cars", function(table) {
					table.increments("id").primary();
					table.string("VIN").notNullable();
					table.string("make").notNullable();
					table.string("model").notNullable();
					table.integer("mileage").notNullable();
					table.string("transmission");
					table.string("title");
				});
			}
		}),
		knex.schema.hasTable("sales").then(function(exists) {
			if (!exists) {
				return knex.schema.createTable("sales", function(table) {
					table.increments("id"); //.primary();
					table
						.integer("carId")
						//.unsigned()
						.references("cars.id");
					// .inTable("cars")
					// .onDelete("SET NULL")
					// .index();
					table.string("date");
					table.integer("price");
				});
			}
		})
	]);
};

exports.down = (knex, Promise) => {
	return Promise.all([
		knex.schema.dropTableIfExists("sales"),
		knex.schema.dropTableIfExists("cars")
	]);
};

//knex migrate:latest --env development
