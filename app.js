// var database = firebase.database();
// var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function () {
  getGifsFromAPI();
  $('a').click(getGifsFromAPI);
});

let indexOfGif = -1;

function getGifsFromAPI() {
  $.ajax({
    type: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=${keyAPI}&limit=100`,
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

function erro() {
  console.log('erro');
}