var environment = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var knex = require('knex')(configuration)

class Food {
  static all() {
    return knex('foods')
  }

  static show(foodId) {
    return knex('foods').where({ id: foodId }).first()
  }

  static create(params) {
    return knex('foods').returning('*').insert(params).first()
  }

  static edit(id, params) {
    return knex('foods')
      .returning('*')
      .where({ id })
      .update(params)
  }

  static destroy(id) {
    return knex('foods').where({ id }).del()
  }
}

module.exports = Food
