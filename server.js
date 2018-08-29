const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/locations', (request, response) => {
  database('locations').select()
    .then(locations => {
      return response.status(200).json(locations);
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
})

app.get('/api/v1/breweries', (request, response) => {

  database('breweries').select()
    .then(breweries => {
      return response.status(200).json(breweries);
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.get('/api/v1/locations/:city', (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  console.log(city);
  database('locations').where('city', state).select()
    .then(location => {
      return response.status(200).json(location);
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.get('/api/v1/breweries/:type', (request, response) => {
  database('breweries').where('type', request.params.type).select()
    .then(brewery => {
      return response.status(200).json(brewery);
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.post('/api/v1/locations', (request, response) => {
  const location = request.body;

  for (let requiredParameter of ['city', 'state', 'zipcode']) {
    if (!location[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {city: <string>, state: <string>, zipcode: <string>}. You are missing a "${requiredParameter}" property`
      });
    }

    database('locations').insert(location, 'id')
      .then(location => {
        return response.status(201).json({ id: project[0] });
      })
      .catch(err => {
        return res.status(500).json({ err })
      })
  }
});

app.post('/api/v1/breweries', (request, response) => {
  const brewery = request.body
});

app.delete('/api/v1/locations');

app.delete('/api/v1/breweries');

app.put('/api/v1/breweries/:name');

app.put('/api/v1/locations/:city');

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})