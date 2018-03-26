exports.up = function(knex) {
  return knex.schema.createTable('meal_foods', function (t) {
    t.integer('foodId').unsigned().references('foods.id')
    t.integer('mealId').unsigned().references('meals.id')
    t.primary(['foodId', 'mealId'])
    t.timestamps(false, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('meal_foods')
}
