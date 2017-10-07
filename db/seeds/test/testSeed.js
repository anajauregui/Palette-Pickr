exports.seed = (knex, Promise) => {
  return knex('palettes').del() // delete footnotes first
    .then(() => knex('projects').del()) // delete all papers
    .then(() => {
      let projectPromises = [];

      projectData.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

let projectData = [
  {id: 1, project_name: 'projectOne'},
  {id: 2, project_name: 'projectTwo'},
  {id: 3, project_name: 'projectThree'}
]

let paletteData = [
  {
    id:1,
    palette_name: 'seaPalette',
    color1: '#C50742',
    color2: '#4B98D8',
    color3: '#4BEBE5',
    color4: '#268E94',
    color5: '#8FF159',
    project_id: 1
  },

  {
    id: 2,
    palette_name: 'gardenPalette',
    color1: '#C50742',
    color2: '#4B98D8',
    color3: '#4BEBE5',
    color4: '#268E94',
    color5: '#8FF159',
    project_id: 2
  },

  {
    id: 3,
    palette_name: 'outdoorsPalette',
    color1: '#C50742',
    color2: '#4B98D8',
    color3: '#4BEBE5',
    color4: '#268E94',
    color5: '#8FF159',
    project_id: 3
  },
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    id: project.id,
    project_name: project.project_name,
  }, 'id')
  .then(projectId => {
    let projectPromises = [];

    paletteData.forEach(palette => {
      projectPromises.push(
        createPalette(knex, {
          id: palette.id,
          palette_name: palette.palette_name,
          color1: palette.color1,
          color2: palette.color2,
          color3: palette.color3,
          color4: palette.color4,
          color5: palette.color5,
          project_id: projectId[0]
        })
      )
    });

    return Promise.all(projectPromises);
  })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};
