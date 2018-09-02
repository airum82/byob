const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);
app.set('secretKey', 'iamnotasthinkasyoudrunkiam');

app.use(express.static('public'));

const checkAuth = (request, response, next) => {
  const { token, appName } = request.body;
  const cert = app.get('secretKey');
  if (!token) {
    return response.status(403).send('You must be most important to access this endpoint');
  } else {
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        return response.status(403).send('Invalid Token')
      } else {
        const validApps = ['my-app', 'your-app', 'he/she/it-app'];
        if (validApps.some(app => app === appName)) {
          request.decoded = decoded;
          next();
        } else {
          return response.status(403).send('Not registered app');
        }
      }
    })
  }
}

app.post('/api/v1/access', (request, response) => {
  const { appName, email } = request.body;
  const cert = app.get('secretKey');
  const token = jwt.sign({ appName, email }, cert, { expiresIn: '72h' });
  return response.status(201).json({ token });
})

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
  database('locations').where('city', city).select()
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

  for (let requiredParameter of ['state']) {
    if (!location[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {city: <string>, state: <string>, zipcode: <string>}. You are missing a "${requiredParameter}" property`
      });
    }

    database('locations').insert(location, 'id')
      .then(location => {
        return response.status(201).json({ id: location[0] });
      })
      .catch(err => {
        return response.status(500).json({ err })
      })
  }
});

app.post('/api/v1/breweries', (request, response) => {
  const brewery = request.body

  for (let requiredParameter of ['type']) {
    if (!brewery[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {name: <string>, type: <string>, address: <string>}. You are missing a "${requiredParameter}" property`
      });
    }
    database('breweries').insert(brewery, 'id')
      .then(brewery => {
        return response.status(201).json({ id: brewery[0] })
      })
      .catch(err => {
        return res.status(500).json({ err })
      })
  }
});

app.delete('/api/v1/breweries/:name', checkAuth, (request, response) => {
  const upperCase = request.params.name.toUpperCase();
  const name = upperCase.replace(/-/g, ' ');
  database('breweries').where('name', name).select().del()
    .then((result) => {
      if (result) {
        return response.status(200).json(`${name} was successfully deleted`)
      } else {
        return response.status(404).json(`${name} does not exist`);
      }
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.delete('/api/v1/breweries/:type', checkAuth, (request, response) => {
  database('breweries').where('type', request.params.type).select().del()
    .then(() => {
      return response.status(200).json(`Breweries with the type of ${request.params.type} were successfully deleted`)
    })
    .catch(err => {
      return res.status(500).json({ err })
    })
});

app.put('/api/v1/breweries/:name', checkAuth, (request, response) => {
  const name = request.params.name.toUpperCase();
  database('breweries').where('name', name).select()
    .update(request.body)
    .then(() => {
      return response.json(`Property ${Object.keys(request.body)[0]} of ${request.params.name} was succesfully updated`)
    })
    .catch(err => {
      return response.status(422).json(`Propery ${Object.keys(request.body)[0]} does not exist or invalid format`)
    })
});

app.put('/api/v1/locations/:city', checkAuth, (request, response) => {
  const city = request.params.city.charAt(0).toUpperCase() + request.params.city.slice(1);
  database('locations').where('city', city).select()
    .update(request.body)
    .then(() => {
      return response.json(`Property ${Object.keys(request.body)[0]} of ${request.params.city} was succesfully updated`);
    })
    .catch(err => {
      return response.status(422).json(`Propery ${Object.keys(request.body)[0]} does not exist or invalid format`)
    })
});

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})

module.exports = app;