const meals = require('./meals.json')
const foods = require('./foods.json')

const buildMealFoods = ([mealIds, foodIds]) => (
  mealIds.reduce((inserts, mealId) => {
    foodIds.forEach(foodId => {
      if (Math.random() > 0.75) inserts.push({ mealId, foodId })
    })
    return inserts
  }, [])
)

exports.seed = (knex, Promise) => Promise.all([
  knex.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
    .then(() => knex('meals').returning('id').insert(meals)),
  knex.raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE')
    .then(() => knex('foods').returning('id').insert(foods)),
]).then(buildMealFoods).then(meal_foods => (
  knex('meal_foods').insert(meal_foods)
))
