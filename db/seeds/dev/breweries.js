const breweryList = require('../../../breweryData');

const createLocation = (knex, location) => {
  return knex('locations').insert({
    city: location.city,
    state: location.state,
    zipcode: location.postal_code
  }, 'id')
    .then(locationId => {
      let breweries = [];

      breweryList.forEach(brewery => {
        if (brewery.city === location.city) {
          breweries.push(
            createBrewery(knex, {
              name: brewery.name.toUpperCase(),
              type: brewery.brewery_type,
              address: brewery.street,
              location_id: locationId[0]
            })
          )
        }
      });
      return Promise.all(breweries);
    })
};

const createBrewery = (knex, brewery) => {
  return knex('breweries').insert(brewery);
};

exports.seed = (knex, Promise) => {
  return knex('breweries').del()
    .then(() => knex('locations').del())
    .then(() => {
      let locations = [];
      let cityReference = [];

      breweryList.forEach(location => {

        if (!cityReference.includes(location.city)) {
          cityReference.push(location.city)
          locations.push(createLocation(knex, location));
        }
      });
      return Promise.all(locations);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};