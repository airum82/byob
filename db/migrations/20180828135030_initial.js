
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', table => {
      table.increments('id').primary();
      table.string('city');
      table.string('state');
      table.string('zipcode');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('breweries', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('type');
      table.string('address');
      table.integer('location_id').unsigned();
      table.foreign('location_id')
        .references('location_id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('breweries')
  ])
};
