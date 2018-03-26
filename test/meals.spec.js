const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run().then(() => done())
      })
    })
  })

  describe('GET /api/v1/meals/', () => {
    it("should return an array of JSON objects for 4 meals", () => {
      return chai.request(server)
        .get('/api/v1/meals')
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(4)
          response.body[0].id.should.equal(2)
          response.body[0].name.should.equal('lunch')
          response.body[0].foods.should.be.a('array')
          response.body[0].foods[0].id.should.be.a('number')
          response.body[0].foods[0].name.should.be.a('string')
          response.body[0].foods[0].calories.should.be.a('number')
        })
    })
  })

  describe('GET /api/v1/meals/:id/foods', () => {
    it("should return 1 meal with its associated foods", () => {
      return chai.request(server)
        .get('/api/v1/meals/1/foods')
        .then(response => {
          response.should.have.status(200)
          response.body.id.should.equal(1)
          response.body.name.should.equal('breakfast')
          response.body.foods.should.be.a('array')
          response.body.foods[0].id.should.be.a('number')
          response.body.foods[0].name.should.be.a('string')
          response.body.foods[0].calories.should.be.a('number')
        })
    })
  })

  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it("should add a food to a meal", () => {
      return chai.request(server)
        .post('/api/v1/meals/1/foods/1')
        .then(response => {
          response.should.have.status(201)
        })
    })

    it("should not be able to add a food to a non-existing meal", () => {
      return chai.request(server)
        .post('/api/v1/meals/5/foods/1')
        .then(response => {
          response.should.have.status(404)
        })
    })

    it("should not be able to add a non-existing food to a meal", () => {
      return chai.request(server)
        .post('/api/v1/meals/1/foods/1000')
        .then(response => {
          response.should.have.status(404)
        })
    })
  })

  describe("DELETE /api/v1/meals/:meal_id/foods/:id", () => {
    it("can delete a food from a meal", () => {
      return chai.request(server)
        .post('/api/v1/meals/1/foods/12')
        .then(() => {
          chai.request(server)
          .delete('/api/v1/meals/1/foods/12')
          .then(response => {
            response.should.have.status(204)
          })
        })
    })
  })
})
