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
  {project_name: 'projectOne'},
  {project_name: 'projectTwo'},
  {project_name: 'projectThree'}
]

let paletteData = [
  {palette_name: 'seaPalette',
  color1: 'FFFFFF',
  color2: 'FFFFFF',
  color3: 'FFFFFF',
  color4: 'FFFFFF',
  color5: 'FFFFFF'},

  {palette_name: 'gardenPalette',
  color1: 'FFFFFF',
  color2: 'FFFFFF',
  color3: 'FFFFFF',
  color4: 'FFFFFF',
  color5: 'FFFFFF'},

  {palette_name: 'outdoorsPalette',
  color1: 'FFFFFF',
  color2: 'FFFFFF',
  color3: 'FFFFFF',
  color4: 'FFFFFF',
  color5: 'FFFFFF'}
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    project_name: project.project_name,
  }, 'id')
  .then(projectId => {
    let projectPromises = [];

    paletteData.forEach(palette => {
      projectPromises.push(
        createPalette(knex, {
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
