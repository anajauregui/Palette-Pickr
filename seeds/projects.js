
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1,
          name: 'project1',
          palettes: {palettes1: "green"}
        },
        {
          id: 2,
          name: 'project2',
          palettes: {palettes2: "blue"}
        },
        {
          id: 3,
          name: 'project3',
          palettes: {palettes3: "yellow"}
        }
      ]);
    });
};
