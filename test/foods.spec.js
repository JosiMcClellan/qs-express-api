const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API routes', () => {
  before(() => database.migrate.latest())
  beforeEach(() => database.seed.run())

  describe('GET /api/v1/foods', () => {
    it('should return an array of all foods in database', () => {
      return chai.request(server)
        .get('/api/v1/foods/')
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(12)
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(1)
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal("Banana")
          response.body[0].should.have.property('calories')
          response.body[0].calories.should.equal(150)
        })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it('should return one JSON object of a food', () => {
      return chai.request(server)
        .get('/api/v1/foods/1')
        .then(response => {
          response.should.have.status(200)
          response.body.should.have.property('id')
          response.body.id.should.equal(1)
          response.body.should.have.property('name')
          response.body.name.should.equal("Banana")
          response.body.should.have.property('calories')
          response.body.calories.should.equal(150)
        })
    })
  })

  describe('POST /api/v1/foods', () => {
    it("should create a new food", () => {
      return chai.request(server)
        .post('/api/v1/foods')
        .send({"food": { "name": "tilapia", "calories": 100 } })
        .then(response => {
          response.should.have.status(201)
          response.body.name.should.equal('tilapia')
          response.body.calories.should.equal(100)
        })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    it("should edit an existing food's name", () => {
      return chai.request(server)
        .patch('/api/v1/foods/1')
        .send({ "name": "tilapia" })
        .then(response => {
          response.should.have.status(201)
          response.body.name.should.equal('tilapia')
        })
    })

    it("should edit an existing food's calories", () => {
      return chai.request(server)
        .patch('/api/v1/foods/1')
        .send({ "calories": 1000 })
        .then(response => {
          response.should.have.status(201)
          response.body.calories.should.equal(1000)
        })
    })
  })

  describe("DELETE /api/v1/foods/:id", () => {
    it("should delete a food", () => {
      return chai.request(server)
      //created a new food first (so that it would not be linked to a meal)
        .post('/api/v1/foods')
        .send({"food": { "name": "tilapia", "calories": 100 } })
        .then(() => {
          chai.request(server)
          .delete('/api/v1/foods/13')
          .then(response => {
            response.should.have.status(204)
          })
        })
    })
  })
})
