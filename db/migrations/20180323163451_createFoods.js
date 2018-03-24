exports.up = function(knex) {
  return knex.schema.createTable('foods', function (t) {
    t.increments();
    t.string('name').notNullable();
    t.integer('calories').notNullable();;
    t.timestamps(false, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('foods');
};
