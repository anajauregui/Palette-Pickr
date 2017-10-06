$(document).ready(() => {
  fetchProjects();
  fetchSavedPalettes();
  selectRandomColor();
})

const generateRandomColorBtn = document.querySelector('.gen-palette-btn')
const paletteSaveBtn = document.querySelector('.save-palette-btn')
const saveProjectBtn = document.querySelector('.project-save-btn')

function fetchProjects() {
// const fetchProjects = () => {
   fetch('http://localhost:3000/api/v1/projects')
    .then(response => response.json())
    .then(response => showExistingProjects(response))
    .catch(error => console.log(error))
}

const fetchSavedPalettes = () => {
  fetch('http://localhost:3000/api/v1/palettes')
    .then(response => response.json())
    .then(response => showExistingPalettes(response))
    .catch(error => console.log(error))
}

const showExistingPalettes = (palettes) => {
  palettes.map(palette => {
    const id = palette.project_id
    const name = palette.palette_name
    const color1 = palette.color1
    const color2 = palette.color2
    const color3 = palette.color3
    const color4 = palette.color4
    const color5 = palette.color5
    console.log(palette);

    if($('.project-folders').children('div').hasClass(id)) {
      $(`.${id}`).append(`<section>
         <div style="background-color:${color1}; height:40px; width:40px">1</div>
         <div style="background-color:${color2}; height:40px; width:40px">2</div>
         <div style="background-color:${color3}; height:40px; width:40px">3</div>
         <div style="background-color:${color4}; height:40px; width:40px">4</div>
         <div style="background-color:${color5}; height:40px; width:40px">5</div>
         <img class='trash' style="height:20px; width:20px" src="assets/001-garbage.svg"/>
       </section>`)
    }
  })
}

const showExistingProjects = (projects) => {
  projects.map(project => {
    const id = project.id

    $('.project-folders')
    .append(`<div class=${id}><h2>${project.project_name}</h2h></div>`);

    $('.project-drop-menu')
    .append(`<option id=${id} value=${id}>${project.project_name}</option>`);
  })
}

const randomColorMaker = () => {
   return "#" + (Math.random().toString(16) + '0000000').slice(2, 8)
}

const selectRandomColor = () => {
  $('.color-suggestion').each((i, element) => {

    if($(element).children('img').attr("class") == "unlocked") {

      $(element).children('p').text(randomColorMaker().toUpperCase());
      $(element).css("background-color", $(element).children('p').text());
    }
  })
}

const changeLockImage = (e) => {

  if($(e.target).attr("class") == "unlocked" ){

    $(e.target).attr("src", "assets/002-locked.svg");
    $(e.target).toggleClass("locked unlocked");

  } else {

    $(e.target).attr("src", "assets/003-unlocked.svg");
    $(e.target).toggleClass("locked unlocked");
  }
}

const saveAPalette = () => {
  const palette_name = $('.palette-name').val()
  const color1 = $('#color1').children('p').text()
  const color2 = $('#color2').children('p').text()
  const color3 = $('#color3').children('p').text()
  const color4 = $('#color4').children('p').text()
  const color5 = $('#color5').children('p').text()
  const project_id = parseInt($('.project-drop-menu option:selected').val())

  fetch(`http://localhost:3000/api/v1/palettes`, {
    method: 'POST',
    body: JSON.stringify({
      palette_name,
      color1,
      color2,
      color3,
      color4,
      color5,
      project_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    // .then(response => console.log(response))
    .catch(error => console.log(error))

    if($('.project-folders').children('div').hasClass(project_id)) {
        $(`.${project_id}`).append(
          `<section>
             <div style="background-color:${color1}; height:40px; width:40px">1</div>
             <div style="background-color:${color2}; height:40px; width:40px">2</div>
             <div style="background-color:${color3}; height:40px; width:40px">3</div>
             <div style="background-color:${color4}; height:40px; width:40px">4</div>
             <div style="background-color:${color5}; height:40px; width:40px">5</div>
           </section>`
        )
      }
}

function saveProject() {
  const project_name = $('.project-name').val()
  // const className = $('.project-name').val().split(' ').join('-').toLowerCase()

  $('.project-folders').append(`<div class=${className}><h2>${project_name}</h2h></div>`);
  $('.project-drop-menu').append(`<option value=${project_name}>${project_name}</option>`);

  fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({project_name}),
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(response => response.json())
  // .then(response => console.log(response))
}

$(generateRandomColorBtn).click(selectRandomColor);
$('.color-suggestion img').click(changeLockImage);
$(paletteSaveBtn).click(saveAPalette);
$(saveProjectBtn).click(saveProject);
