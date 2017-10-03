
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(function () {
      // Inserts seed entries
      return knex('palettes').insert([
        {
          id: 1,
          "palette name": "palette1",
          colors: {green: true},
          "project id": 1
        },
        {
          id: 2,
          "palette name": "palette2",
          colors: {blue: true},
          "project id": 2
        },
        {
          id: 3,
          "palette name": "palette3",
          colors: {yellow: true},
          "project id": 3
        }
      ]);
    });
};
