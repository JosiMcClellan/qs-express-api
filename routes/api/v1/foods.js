var express = require('express')
var router = express.Router()

var environment = process.env.NODE_ENV || 'development'
var configuration = require('../../../knexfile')[environment]
var knex = require('knex')(configuration)

function filterObject(object, ...allowed) {
  return allowed.reduce((filtered, name) => {
    if (object.hasOwnProperty(name)) filtered[name] = object[name]
    return filtered
  }, {})
}

router.get('/', function(req, res, _next) {
  knex('foods').then(foods => res.status(200).json(foods))
})

router.get('/:id', function(req, res, _next) {
  knex('foods').where({ id: req.params.id }).first().then(food => {
    res.status(200).json(food)
  })
})

router.post('/', function(req, res, _next) {
  const params = filterObject(req.body, 'name', 'calories')
  knex('foods').returning('*').insert(params).first().then(created => {
    res.status(201).json(created)
  })
})

router.patch('/:id', function(req, res, _next) {
  const { id } = req.params
  const params = filterObject(req.body, 'name', 'calories')
  knex('foods')
    .returning('*')
    .where({ id })
    .update(params)
    .then(updated => res.status(201).json(updated[0]))
})

router.delete('/:id', function(req, res, _next) {
  const { id } = req.params
  knex('foods').where({ id }).del().then(() => res.status(204).json({}))
})

module.exports = router
