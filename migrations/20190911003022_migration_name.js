exports.up = knex => {
	return knex.schema.createTable("cars", table => {
		table.increments("id").primary();
		table.string("VIN");
		table.string("make");
		table.string("model");
		table.integer("mileage");
		table.string("transmission");
		table.string("title");
	});
};

exports.down = knex => {
	return knex.schema.dropTableIfExists("cars");
};
