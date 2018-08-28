
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(() => knex('breweries').del())
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        
        knex('locations').insert(
          {id: 1, city: 'Dallas', state: 'Texas', zipcode: '75001'}, 'id'
        )
        .then(location => {
          return knex('breweries').insert([
            { id: 1, name: 'great big brewery', type: 'micro', address: '123 fake street', location_id: location[0] }
          ])
        })
        .then(() => console.log('Seeding complete'))
        .catch(err => console.log(`Error seeding data: ${err}`))
      ])
    })
    .catch(err => console.log(`Error seeding data: ${err}`))
};
