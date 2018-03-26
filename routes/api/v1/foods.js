var express = require('express')
var router = express.Router()
const Food = require('../../../models/food')

function filterObject(object, ...allowed) {
  return allowed.reduce((filtered, name) => {
    if (object.hasOwnProperty(name)) filtered[name] = object[name]
    return filtered
  }, {})
}

router.get('/', function(req, res, _next) {
  Food.all()
    .then(foods => res.status(200).json(foods))
    .catch(error => res.status(500).json({ error }))
})

router.get('/:id', function(req, res, _next) {
  Food.find(req.params.id)
    .then(food => {
      if (!food) return res.status(404).json({error: `Food with ID: ${req.params.id} not found`})
      res.status(200).json(food)
    })
    .catch(error => res.status(500).json({ error }))
})

router.post('/', function(req, res, _next) {
  const params = filterObject(req.body.food, 'name', 'calories')
  Food.create(params)
    .then(created => res.status(201).json(created[0]))
    .catch(error => res.status(422).json({ error }))
})

router.patch('/:id', function(req, res, _next) {
  const { id } = req.params
  const params = filterObject(req.body, 'name', 'calories')
  if (Object.keys(params).length !== 1) return res.status(422).json({ error: "Incorrect parameters" })
  Food.update(id, params)
    .then(updated => res.status(201).json(updated[0]))
    .catch(error => res.status(422).json({ error }))
})

router.delete('/:id', function(req, res, _next) {
  const { id } = req.params
  Food.destroy(id)
    .then(() => res.status(204).json({}))
    .catch(error => res.status(500).json({ error }))
})

module.exports = router
