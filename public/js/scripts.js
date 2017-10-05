const generateRandomColorBtn = document.querySelector('.gen-palette-btn')
const paletteSaveBtn = document.querySelector('.save-palette-btn')
const saveProjectBtn = document.querySelector('.project-save-btn')

const fetchProjects = () => {
   fetch('http://localhost:3000/api/v1/projects')
    .then(response => response.json())
    .then(response => showExistingProjects(response))
    .catch(error => console.log(error))
}

$(document).ready(() => {
  fetchProjects();
})

const showExistingProjects = (projects) => {
  projects.map(project => {
    $('.project-folders')
    .append(`<div><h2>${project.project_name}</h2h></div>`);

    $('.project-drop-menu')
    .append(`<option value=${project.project_name}>${project.project_name}</option>`);
  })
}

const randomColorMaker = () => {
   return "#" + (Math.random().toString(16) + '0000000').slice(2, 8)
}

const selectRandomColor = () => {
  $('.color-suggestion').each((i, element) => {

    if($(element).children('img').attr("class") == "unlocked") {

      $(element).css("background-color", randomColorMaker());
      $(element).children('p').text(randomColorMaker().toUpperCase());
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

  fetch(`http://localhost:3000/api/v1/palettes`, {
    method: 'POST',
    body: JSON.stringify({
      palette_name,
      color1,
      color2,
      color3,
      color4,
      color5
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))

 // $('.project-folders').append(
 //   `<section>
 //      <div>${color1}</div>
 //      <div>${color2}</div>
 //      <div>${color3}</div>
 //      <div>${color4}</div>
 //      <div>${color5}</div>
 //    </section>`
 // )
}

function saveProject() {
  const project_name = $('.project-name').val()
  const className = $('.project-name').val().split(' ').join('-').toLowerCase()

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
  .then(response => console.log(response))
}

$(generateRandomColorBtn).click(selectRandomColor);
$('.color-suggestion img').click(changeLockImage);
$(paletteSaveBtn).click(saveAPalette);
$(saveProjectBtn).click(saveProject);
