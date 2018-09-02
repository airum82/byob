const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')['test'];
const dataBase = require('knex')(config);

chai.use(chaiHttp);

describe('Get /api/v1/byob', () => {
  beforeEach(done => {
    dataBase.migrate.rollback()
      .then(() => dataBase.migrate.latest())
      .then(() => dataBase.seed.run())
      .then(() => done())
  });

  it('should return an array of locations', (done) => {
    chai.request(server)
      .get('/api/v1/locations')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('city');
        response.body[0].should.have.property('state');
        response.body[0].should.have.property('zipcode');
        done()
      })
  })

  it('should return an array of the specified city', (done) => {
    chai.request(server)
      .get('/api/v1/locations/denver')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('city');
        response.body[0].should.have.property('state');
        response.body[0].should.have.property('zipcode');
        done()
      })
  })
  it('should return an array of breweries', (done) => {
    chai.request(server)
      .get('/api/v1/breweries')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('type');
        response.body[0].should.have.property('address');
        done()
      })
  })

  it('should return an array of breweries by type', (done) => {
    chai.request(server)
      .get('/api/v1/breweries/micro')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('type');
        response.body[0].should.have.property('address');
        done()
      })
  })
})
