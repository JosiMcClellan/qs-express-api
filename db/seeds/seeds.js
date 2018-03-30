const meals = require('./meals.json')
const foods = require('./foods.json')
const mealFoods = require('./mealFoods.json')

exports.seed = (knex) => {
  return knex.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
    .then(() => knex('meals').insert(meals))
    .then(() => knex.raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE'))
    .then(() => knex('foods').insert(foods))
    .then(() => knex.raw('TRUNCATE TABLE meal_foods RESTART IDENTITY CASCADE'))
    .then(() => knex('meal_foods').insert(mealFoods))
}
