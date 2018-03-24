exports.up = function(knex) {
  return knex.schema.createTable('meals', function (t) {
    t.increments()
    t.string('name').notNullable()
    t.timestamps(false, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('meals')
}
