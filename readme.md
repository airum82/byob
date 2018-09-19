# Project Details:

This project is an API that stores a list of cities and the breweries in each of the city. It was built with express, knex and vanilla javascript on the front end. PostgreSQL is the database. Neither list is complete and with authorization you can add and edit each one.

# Instructions for using API:

You must go to https://arram-byob.herokuapp.com/ and fill out the form to get a web token. This token must be used to edit the database in any way. The token expires in 72 hours.

Making GET requests:

You can fetch information from the API by 4 different methods:

1. To request a list of all locations, use the url: https://arram-byob.herokuapp.com/api/v1/locations

2. To request a list of all breweres, use the url: https://arram-byob.herokuapp.com/api/v1/breweries

3. To request a specific location, use the url: https://arram-byob.herokuapp.com/api/v1/locations/:city where city is the name of the location you want.

4. To request all breweries of a given type, use the url: https://arram-byob.herokuapp.com/api/v1/breweries/:type. Replace :type with the type of brewery you want ex: micro.

## Making POST requests:

1. To make a POST request to add a new location, use the url: https://arram-byob.herokuapp.com/api/v1/location. You must include the city, state and a zipcode in the body like so: { city: 'Sacramento', state: 'California', zipcode: 54326 }.

2. To make a POST Request to add a new brewery, use the url: http://arram-byob.herokuapp.com/api/v1/breweries. You much include a name, type and an address in the body like so: { name: 'great awesome brewery', type: 'brewpub', address: '123 fake street' }.

## Making DELETE requests:

1. To make a DELETE request to remove a brewery by name, use the url: https://arram-byob.herokuapp.com/api/v1/breweries/:name.
You must replace :name with the name of the brewery you want to delete. If the name is multiple words you must separate them with dashes in the url ex: https://arram-byob.herokuapp.com/api/v1/breweries/great-awesome-brewery. You must supply your json web token in the body to delete the brewery ex: { token: 'dk593kfovkec9i43hndf' }.

##Making PUT requests: 

1. To make a DELETE request to remove a brewery by name, use the url: https://arram-byob.herokuapp.com/api/v1/breweries/:name.
You must replace :name with the name of the brewery you want to update. If the name is multiple words you must separate them with dashes in the url ex: https://arram-byob.herokuapp.com/api/v1/breweries/great-awesome-brewery. You must supply your json web token in the body to delete the brewery ex: { token: 'dk593kfovkec9i43hndf' }.

1. To make a DELETE request to remove a brewery by city, use the url: https://arram-byob.herokuapp.com/api/v1/breweries/:city.
You must replace :city with the city of the brewery you want to update. If the name is multiple words you must separate them with dashes in the url ex: https://arram-byob.herokuapp.com/api/v1/breweries/Denver. You must supply your json web token in the body to delete the brewery ex: { token: 'dk593kfovkec9i43hndf' }.

# Contributors

https://github.com/airum82
https://github.com/gavin-love

# Setup

git clone https://github.com/airum82/byob
npm install nodemon -g
npm install && nodemon server.js

# Hosted on
https://arram-byob.herokuapp.com

go to this site to register for a token, once registered you can interact with the database using something like Postman.


 
