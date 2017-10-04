const generateRandomColorBtn = document.querySelector('.gen-palette-btn')
const paletteSaveBtn = document.querySelector('.save-palette-btn')
const saveProjectBtn = document.querySelector('.project-save-btn')

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
 $('.project-folders').append(
   `<section>
      <div>color1</div>
      <div>color2</div>
      <div>color3</div>
      <div>color4</div>
      <div>color5</div>
    </section>`
 )
}

const saveProject = () => {
  const projectName = $('.project-name').val()
  const className = $('.project-name').val().split(' ').join('-').toLowerCase()

  $('.project-folders').append(`<div class=${className}><h2>${projectName}</h2h></div>`);
  $('.project-drop-menu').append(`<option value=${projectName}>${projectName}</option>`);
}

$(generateRandomColorBtn).click(selectRandomColor);
$('.color-suggestion img').click(changeLockImage);
$(paletteSaveBtn).click(saveAPalette);
$(saveProjectBtn).click(saveProject);
