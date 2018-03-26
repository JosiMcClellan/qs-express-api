var express = require('express')
var router = express.Router()
const Meal = require('../../../models/meal')

router.get('/', (request, response) => {
  Meal.all()
  .then(meals => {
    response.status(200).json(meals)
  })
  .catch(error => response.status(500).json({ error }))
})

router.get('/:meal_id/foods', (request, response) => {
  Meal.find(request.params.meal_id)
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
  Meal.create(request.params)
    .then(() => response.status(201).json(`Food with ID: ${request.params.foodId} successfully added to meal with ID: ${request.params.mealId}`))
    .catch((error) => response.status(422).json({ error }))
})

router.delete('/:mealId/foods/:foodId', (request, response) => {
  Meal.destroy(request.params)
    .then(() => response.status(204).end())
})

module.exports = router
