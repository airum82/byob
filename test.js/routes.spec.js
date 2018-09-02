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

describe('POST /api/v1/byob', () => {
  beforeEach(done => {
    dataBase.migrate.rollback()
      .then(() => dataBase.migrate.latest())
      .then(() => dataBase.seed.run())
      .then(() => done())
  });

  it('should insert a new location into the database', (done) => {
    chai.request(server)
      .post('/api/v1/locations')
      .send({
        city: 'here',
        state: 'there',
        zipcode: 'everywhere'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        done();
      });
  })

  it('should not insert a new location into the database if params are missing', (done) => {
    chai.request(server)
      .post('/api/v1/locations')
      .send({
        city: 'here',
        zipcode: 'everywhere'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('Expected format: {city: <string>, state: <string>, zipcode: <string>}. You are missing a "state" property')
        response.should.be.json;
        done();
      });
  })

  it('should insert a new brewery into the database', (done) => {
    chai.request(server)
      .post('/api/v1/breweries')
      .send({
        name: 'Don/s',
        type: 'unknown',
        address: 'forget about it'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        done();
      });
  })

  it('should not insert a new brewery into the database if params are missing', (done) => {
    chai.request(server)
      .post('/api/v1/breweries')
      .send({
        name: 'Don/s',
        address: 'forget about it'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('Expected format: {name: <string>, type: <string>, address: <string>}. You are missing a "type" property')
        response.should.be.json;
        done();
      });
  })
});

describe('DELETE /api/v1/byob', () => {
  beforeEach(done => {
    dataBase.migrate.rollback()
      .then(() => dataBase.migrate.latest())
      .then(() => dataBase.seed.run())
      .then(() => done())
  });

  it('should remove a brewery from the database by name', done => {
    chai.request(server)
      .delete('/api/v1/breweries/brewmented')
      .send(
        {
          "appName": "why-tho",
          "email": "123@gmail.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoid2h5LXRobyIsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSIsImlhdCI6MTUzNTkyNzE2NCwiZXhwIjoxNTM2MTg2MzY0fQ.qQcc11cuR3yP4hrMn_vf2KgRLhXUfBoPOaNaKZgRqA0"
        }
      )
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.equal('BREWMENTED was successfully deleted');
        done();
      });
  });

  it('should error out if brewery name does not exist', done => {
    chai.request(server)
      .delete('/api/v1/breweries/brwmnted')
      .send(
        {
          "appName": "why-tho",
          "email": "123@gmail.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoid2h5LXRobyIsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSIsImlhdCI6MTUzNTkyNzE2NCwiZXhwIjoxNTM2MTg2MzY0fQ.qQcc11cuR3yP4hrMn_vf2KgRLhXUfBoPOaNaKZgRqA0"
        }
      )
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('BRWMNTED does not exist');
        done();
      });
  });

  it('should remove all breweries from the database by type', (done) => {
    chai.request(server)
      .delete('/api/v1/breweries/by/brewpub')
      .send(
        {
          "appName": "why-tho",
          "email": "123@gmail.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoid2h5LXRobyIsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSIsImlhdCI6MTUzNTkyNzE2NCwiZXhwIjoxNTM2MTg2MzY0fQ.qQcc11cuR3yP4hrMn_vf2KgRLhXUfBoPOaNaKZgRqA0"
        }
      )
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.equal('Breweries with the type of brewpub were successfully deleted');
        done();
      });
  });

  it.only('should error out if brewery type does not exist', (done) => {
    chai.request(server)
      .delete('/api/v1/breweries/by/bullshit')
      .send(
        {
          "appName": "why-tho",
          "email": "123@gmail.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoid2h5LXRobyIsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSIsImlhdCI6MTUzNTkyNzE2NCwiZXhwIjoxNTM2MTg2MzY0fQ.qQcc11cuR3yP4hrMn_vf2KgRLhXUfBoPOaNaKZgRqA0"
        }
      )
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('err');
        done();
      });
  });
});
