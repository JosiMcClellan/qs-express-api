exports.up = function(knex, Promise) {
  return knex.schema.createTable('meal_foods', function (t) {
    t.integer('foodId').unsigned().references('foods.id')
    t.integer('mealId').unsigned().references('meals.id')
    t.primary(['foodId', 'mealId'])
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meal_foods');
};
