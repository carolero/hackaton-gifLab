var database = firebase.database();
var userID = window.location.search.match(/\?userId=(.*)/);

$(document).ready(function () {

  $('input').val('');

  database.ref("users/" + userID).once("value")
    .then(function (snapshot) {
      var userInfo = snapshot.val();
    })

  database.ref("users").once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createUsers(childData.email, childKey);
      });
    })

  $('input').keyup(getSearch);

  getGifsFromAPI();
  
  $('a').click(getSearch);
});

let indexOfGif = -1;

function getSearch(event) {
  let searchItem = buscaPalavra();
  if (!searchItem) {
    getGifsFromAPI();
  }
  trazBusca(searchItem);
}

function trazBusca(searchItem) {
  $.ajax({
    type: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${searchItem}&api_key=${keyAPI}&limit=100`,
    success: showGif,
    error: erro
  });
}

function buscaPalavra(){
  return document.getElementById("search").value;
}


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