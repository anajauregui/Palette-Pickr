exports.seed = function(knex, Promise) {
  // Deletes all existing entries
  return knex('palettes').del()
    .then( () => knex('projects').del() )
    .then( () => {
      return Promise.all([
        knex('projects').insert({
          id: 1,
          project_name: 'projectOne'
        }, 'id')
        .then( project => {
          return knex('palettes').insert([
            {
              id: 1,
              palette_name: 'seaPalette',
              color1: '#C50742',
              color2: '#4B98D8',
              color3: '#4BEBE5',
              color4: '#268E94',
              color5: '#8FF159',
              project_id: project[0]
            },
            {
              id: 2,
              palette_name: 'gardenPalette',
              color1: '#C50742',
              color2: '#4B98D8',
              color3: '#4BEBE5',
              color4: '#268E94',
              color5: '#8FF159',
              project_id: project[0]
            }
          ])
        })
        .then( () => console.log('Seeding done'))
        .catch( error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch( error => console.log(`Error seeding data: ${error}`))
};
