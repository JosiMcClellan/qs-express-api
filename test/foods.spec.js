const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API routes', () => {
  before((done) => {
    database.migrate.latest().then(() => done())
    .catch(done)
  })

  beforeEach((done) => {
    database.seed.run().then(() => done())
    .catch(done)
  })

  describe('GET /api/v1/foods', () => {
    it('should return an array of all foods in database', () => {
      return chai.request(server)
        .get('/api/v1/foods/')
        .then(response => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(14)
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(2)
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal("Bagel Bites - Four Cheese")
          response.body[0].should.have.property('calories')
          response.body[0].calories.should.equal(650)
        })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it('should return one JSON object of a food', () => {
      return chai.request(server)
        .get('/api/v1/foods/2')
        .then(response => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.json
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(2)
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal("Bagel Bites - Four Cheese")
          response.body[0].should.have.property('calories')
          response.body[0].calories.should.equal(650)
        })
    })
  })

})
