Project Details:

This project is an API that stores a list of cities and the breweries in each of the city. It was built with express, knex and vanilla javascript on the front end. Postgres is the database. Neither list is complete and with authorization you can add and edit each one.

Instructions for using API:

You must go to https://arram-byob.herokuapp.com/ and fill out the form to get a web token. This token must be used to edit the database in any way. The token expires in 72 hours.

Making GET requests:

You can fetch information from the API by 4 different methods:

1. To request a list of all locations, use the url: https://arram-byob.herokuapp.com/api/v1/locations

2. To request a list of all breweres, use the url: https://arram-byob.herokuapp.com/api/v1/breweries

3. To request a specific location, use the url: https://arram-byob.herokuapp.com/api/v1/locations/:city where city is the name of the location you want.

4. To request all breweries of a given type, use the url: https://arram-byob.herokuapp.com/api/v1/breweries/:type. Replace :type with the type of brewery you want ex: micro.

Making POST requests:

1. To make a POST request to add a new location, use the url: https://arram-byob.herokuapp.com/api/v1/location. You must include the city, state and a zipcode in the body like so: { city: 'Sacramento', state: 'California', zipcode: 54326 }

 
