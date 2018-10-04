var database = firebase.database();
var userID = window.location.search.match(/\?userId=(.*)/);

$(document).ready(function () {
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


  getGifsFromAPI();
  $('#red-btn').click(getGifsFromAPI);
  $('#green-btn').click(likedGif);
});

let indexOfGif = -1;

function likedGif(){
  getGifsFromAPI();
  addToFav()
}

function getGifsFromAPI() {
  $.ajax({
    type: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=rc0vl8oEetDnA6wEuyjXXwtGB99EYxSS&limit=100`,
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
  console.log('gostei, mas não tem função de addToFav ainda')
}

function erro() {
  console.log('erro');
}