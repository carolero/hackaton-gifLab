var database = firebase.database();
var userID = window.location.search.match(/\?id=(.*)/)[1];


$(document).ready(function () {
  getGifsFromAPI();
  $('#red-btn').click(getGifsFromAPI);
  $('#green-btn').click(likedGif);
 

  
});

let indexOfGif = -1;

function likedGif() {
  
  getGifsFromAPI();
  addToFav()
}

function getGifsFromAPI() {
  $.ajax({
    type: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=rc0vl8oEetDnA6wEuyjXXwtGB99EYxSS&limit=100 `,
    success: showGif,
    error: erro
  });
}

function showGif(data) {
  indexOfGif += 1;
  urlImg = data['data'][indexOfGif]['images']['original']['url'];
  $('img').attr('src', urlImg);
  gifTitle = data['data'][indexOfGif]['title'];
  $('#gif-title').html(gifTitle);
  }

function addToFav() {

  return database.ref("favorites/" + userID).push({
    url: urlImg,
    title: gifTitle

  });
}

function erro() {
  console.log('erro');
}