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
  .then(meal => {
    if (!meal) return response.status(404).json(`No meals were found with ID of: ${request.params.meal_id}`)
    response.status(200).json(meal)
  })
  .catch(error => response.status(500).json({ error }))
})

router.post('/:mealId/foods/:foodId', (request, response) => {
  Meal.create(request.params)
    .then(() => response.status(201).json(`Food with ID: ${request.params.foodId} successfully added to meal with ID: ${request.params.mealId}`))
    .catch((error) => response.status(404).json({ error }))
})

router.delete('/:mealId/foods/:foodId', (request, response) => {
  Meal.destroy(request.params)
    .then(() => response.status(204).json({}))
    .catch((error) => response.status(500).json({ error }))
})

module.exports = router
