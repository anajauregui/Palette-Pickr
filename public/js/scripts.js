$(document).ready(() => {
  fetchProjects();
  selectRandomColor();
})

const generateRandomColorBtn = document.querySelector('.gen-palette-btn')
const paletteSaveBtn = document.querySelector('.save-palette-btn')
const saveProjectBtn = document.querySelector('.project-save-btn')

const randomColorMaker = () => {
   return "#" + (Math.random().toString(16) + '0000000').slice(2, 8)
}

const selectRandomColor = () => {
  $('.color-suggestion').each((i, element) => {

    if($(element).children('img').attr("class") == "unlocked") {

      $(element).children('p').text(randomColorMaker().toUpperCase());
      $(element).css("background-color", $(element).children('p').text());
    }
  });
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

const fetchProjects = () => {
   fetch('/api/v1/projects')
    .then(response => response.json())
    .then(response => showExistingProjects(response))
    .catch(error => console.log(error))
}

const fetchSavedPalettes = () => {
  fetch('/api/v1/palettes')
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

    if($('.project-folders').children('div').hasClass(id)) {
      $(`.${id}`).append(`<section class='${palette.id} color-group'>
        <div class="color-group-name" style="height:60px; width:100px">${name}</div>
        <div id="hue1" style="background-color:${color1}; height:60px; width:100px">${color1}</div>
        <div id="hue2" style="background-color:${color2}; height:60px; width:100px">${color2}</div>
        <div id="hue3" style="background-color:${color3}; height:60px; width:100px">${color3}</div>
        <div id="hue4" style="background-color:${color4}; height:60px; width:100px">${color4}</div>
        <div id="hue5" style="background-color:${color5}; height:60px; width:100px">${color5}</div>
        <img id=${palette.id} class='trash' style="height:40px; width:40px" src="assets/001-garbage.svg"/>
       </section>`)
     }
  });
}

const showExistingProjects = (projects) => {
  projects.map(project => {
    const id = project.id
    const name = project.project_name

    $('.project-folders').append(`<div class='${id} ${name}'>
    <h2>${name}</h2>
    </div>`);

    $('.project-drop-menu')
    .append(`<option id=${id} value=${id}>${name}</option>`);
  });
  fetchSavedPalettes();
}

const saveAPalette = () => {
  const palette_name = $('.palette-name').val()
  const color1 = $('#color1').children('p').text()
  const color2 = $('#color2').children('p').text()
  const color3 = $('#color3').children('p').text()
  const color4 = $('#color4').children('p').text()
  const color5 = $('#color5').children('p').text()
  const project_id = parseInt($('.project-drop-menu option:selected').val())


if($('.project-folders').children('div').hasClass(project_id)) {
  fetch(`/api/v1/palettes`, {
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
    .then(response => {
      fetch(`/api/v1/palettes/${response[0]}`)
      .then(response => response.json())
      .then(response => {
        $(`.${project_id}`).append(
          `<section class="color-group">
            <div class="color-group-name" style="height:60px; width:100px">${palette_name}</div>
            <div id="hue1" style="background-color:${color1}; height:60px; width:100px">${color1}</div>
            <div id="hue2" style="background-color:${color2}; height:60px; width:100px">${color2}</div>
            <div id="hue3" style="background-color:${color3}; height:60px; width:100px">${color3}</div>
            <div id="hue4" style="background-color:${color4}; height:60px; width:100px">${color4}</div>
            <div id="hue5" style="background-color:${color5}; height:60px; width:100px">${color5}</div>
            <img class='trash' style="height:40px; width:40px" src="assets/001-garbage.svg"/>
           </section>`
        )
      })
    })
    .catch(error => console.log(error))
  }
}

const saveProject = () => {
  const project_name = $('.project-name').val()

  if(!$('.project-folders').children('div').hasClass(project_name)) {
    fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({project_name}),
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      fetch(`/api/v1/projects/${response[0]}`)
        .then(response => response.json())
        .then(response => {
          $('.project-folders').append(`<div class='${response[0].id} ${response[0].project_name}'>
          <h2>${response[0].project_name}</h2>
          </div>`);
          $('.project-drop-menu').append(`<option value=${response[0].id}>${response[0].project_name}</option>`);
        });
      });
  }
}

{/* <img style="height:20px; width:20px" src='assets/circle.svg' /> */}

const deleteProject = (e) => {
  const id = parseInt($(e.target).attr('class'))

  fetch(`/api/v1/projects/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      $(`${id}`).remove();
      $(e.target).remove();
    })
    .catch(error => console.log(error))
}

const deletePalette = (e) => {
  const id = parseInt($(e.target).attr('id'))
  fetch(`/api/v1/palettes/${id}`, {
    method: 'DELETE',
  })
    .then(() => $(`${id}`).remove())
    .catch(error => console.log(error))

  $(e.target).parent('section').remove();

}

//on click of '.color-group' colors of palette should populate the generator
// #color1 style="background-color: "

const pullSavedColorsToGenerator = () => {

}

$(generateRandomColorBtn).click(selectRandomColor);
$('.color-suggestion img').click(changeLockImage);
$(paletteSaveBtn).click(saveAPalette);
$(saveProjectBtn).click(saveProject);
$('.project-folders').on('click', '.trash', deletePalette);
$('.project-folders').on('click', 'div', deleteProject);
