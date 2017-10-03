const generateRandomColorBtn = document.querySelector('.gen-palette-btn')
const paletteSaveBtn = document.querySelector('.save-palette-btn')

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
    $(e.target).toggleClass("locked unlocked")

  } else {

    $(e.target).attr("src", "assets/003-unlocked.svg");
    $(e.target).toggleClass("locked unlocked")
  }
}

// const saveAPalette = () => {
//
// }

$(generateRandomColorBtn).on('click', selectRandomColor)
$('.color-suggestion img').on('click', changeLockImage)
$(paletteSaveBtn).on('click', saveAPalette)
