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
  Food.all().then(foods => res.status(200).json(foods))
})

router.get('/:id', function(req, res, _next) {
  Food.find(req.params.id).then(food => {
    res.status(200).json(food)
  })
})

router.post('/', function(req, res, _next) {
  const params = filterObject(req.body, 'name', 'calories')
  Food.create(params).then(created => {
    res.status(201).json(created)
  })
})

router.patch('/:id', function(req, res, _next) {
  const { id } = req.params
  const params = filterObject(req.body, 'name', 'calories')
  Food.edit(id, params)
    .then(updated => res.status(201).json(updated[0]))
})

router.delete('/:id', function(req, res, _next) {
  const { id } = req.params
  Food.destroy(id).then(() => res.status(204).json({}))
})

module.exports = router
