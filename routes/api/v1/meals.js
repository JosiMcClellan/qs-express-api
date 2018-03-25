var express = require('express')
var router = express.Router()

var environment = process.env.NODE_ENV || 'development'
var configuration = require('../../../knexfile')[environment]
var knex = require('knex')(configuration)

router.get('/', (request, response) => {
  knex('meals')
    .select(['meals.id', 'meals.name', knex.raw('ARRAY_TO_JSON(ARRAY_AGG(foods.*)) AS foods')])
    .innerJoin('meal_foods', 'meals.id', 'meal_foods.mealId')
    .innerJoin('foods', 'meal_foods.foodId', 'foods.id')
    .groupBy('meals.id')
  .then(meals => {
    response.status(200).json(meals)
  })
  .catch(error => response.status(500).json({ error }))
})

router.get('/:meal_id/foods', (request, response) => {
  knex('meals')
    .select(['meals.id', 'meals.name', knex.raw('ARRAY_TO_JSON(ARRAY_AGG(foods.*)) AS foods')])
    .innerJoin('meal_foods', 'meals.id', 'meal_foods.mealId')
    .innerJoin('foods', 'meal_foods.foodId', 'foods.id')
    .groupBy('meals.id')
    .where('meals.id', request.params.meal_id)
  .then(meals => {
    if (meals.length) {
      response.status(200).json(meals)
    }
    else {
      response.status(404).json(`No meals were found with ID of: ${request.params.meal_id}`)
    }
  })
  .catch(error => response.status(500).json({ error }))
})

router.post('/:mealId/foods/:foodId', (request, response) => {
  knex('meal_foods')
  // Note: request params is already an object like {mealId: 5, foodId: 6}
    .insert(request.params)
    .then(() => response.status(201).json(`Food with ID: ${request.params.foodId} successfully added to meal with ID: ${request.params.mealId}`))
    .catch((error) => response.status(422).json({ error }))
})

router.delete('/:mealId/foods/:foodId', (request, response) => {
  knex('meal_foods')
    .where(request.params)
    .del()
    .then(() => response.status(204).end())
})

module.exports = router
