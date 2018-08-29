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

app.get('/api/v1/locations/:state', (request, response) => {
  const state = request.params.state.charAt(0).toUpperCase() + request.params.state.slice(1);
  console.log(state);
  database('locations').where('state', state).select()
    .then(location => {
      return response.status(200).json(location);
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.get('/api/v1/locations/:city');


app.get('/api/v1/breweries/:type');

app.post('/api/v1/locations');

app.post('/api/v1/breweries');

app.delete('/api/v1/locations');

app.delete('/api/v1/breweries');

app.put('/api/v1/breweries/:name');

app.put('/api/v1/locations/:city');

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})