var express = require('express')
var router = express.Router()

var environment = process.env.NODE_ENV || 'development'
var configuration = require('../../../knexfile')[environment]
var knex = require('knex')(configuration)

router.get('/', (req, res, _next) => (
  knex('meals')
    .select('meals.name AS mealName', 'meals.id AS mealId', 'foods.*')
    .leftOuterJoin('meal_foods', 'meals.id', '=', 'meal_foods.mealId')
    .innerJoin('foods', 'foods.id', 'meal_foods.foodId')
    .then(foods => Object.values(foods.reduce((meals, food) => {
      const { mealId: id, mealName: name } = food
      delete food.mealId
      delete food.mealName
      if (!meals[id]) meals[id] = { id, name, foods: [] }
      meals[id].foods.push(food)
      return meals
    }, {})))
      .then(meals => res.status(200).json(meals))
))

router.get('/:mealId/foods', function(req, res, _next) {
  knex('foods')
    .select('foods.*')
    .innerJoin('meal_foods', 'foods.id', 'meal_foods.foodId')
    .where('meal_foods.mealId', req.params.mealId)
    .then(foods => res.status(200).json(foods))
})

router.post('/:mealId/foods/:foodId', function(req, res, _next) {
  knex('meal_foods')
    .insert(req.params)
    .then(() => res.status(201).json({}))
})

router.delete('/:mealId/foods/:foodId', function(req, res, _next) {
  knex('meal_foods')
    .where(req.params)
    .del()
    .then(() => res.status(204).end())
})

module.exports = router
