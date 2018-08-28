const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/locations', (request, response) => {
  return response.status(200).json('a list of states');
})

app.get('api/v1/locations/:state');

app.get('api/v1/locations/:city');

app.get('api/v1/breweries');

app.get('api/v1/breweries/:type');

app.post('api/v1/locations');

app.post('api/v1/breweries');

app.delete('api/v1/locations');

app.delete('api/v1/breweries');

app.put('api/v1/breweries/:name');

app.put('api/v1/locations/:city');