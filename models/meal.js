var environment = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var knex = require('knex')(configuration)

const foodsAsJson = () => (
  knex.raw(`ARRAY_TO_JSON(
    ARRAY_REMOVE(ARRAY_AGG(foods.*), NULL)
  ) AS foods`)
)

class Meal {
  static all() {
    return knex('meals')
      .select(['meals.id', 'meals.name', foodsAsJson()])
      .leftJoin('meal_foods', 'meals.id', 'meal_foods.mealId')
      .leftJoin('foods', 'meal_foods.foodId', 'foods.id')
      .groupBy('meals.id')
      .orderBy('meals.id')
  }

  static find(mealId) {
    return knex('meals')
      .select(['meals.id', 'meals.name', foodsAsJson()])
      .leftJoin('meal_foods', 'meals.id', 'meal_foods.mealId')
      .leftJoin('foods', 'meal_foods.foodId', 'foods.id')
      .groupBy('meals.id')
      .where('meals.id', mealId)
      .first()
  }

  static create(params) {
    return knex('meal_foods').insert(params)
  }

  static destroy(params) {
    return knex('meal_foods').where(params).del()
  }
}

module.exports = Meal
