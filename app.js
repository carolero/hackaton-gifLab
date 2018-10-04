var database = firebase.database();
var userID = window.location.search.match(/\?userId=(.*)/);

$(document).ready(function () {
  getGifsFromAPI();
  $('a').click(getGifsFromAPI);


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

  function addGifToDB(text) {
    return database.ref("favorites/" + userID).push({
      text: text,
      time: time
    });
  }


  
});

let indexOfGif = -1;

function getGifsFromAPI() {
  $.ajax({
    type: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=5SM5CM1SwJrKJ9nhP6AfjeKquA2aZdqW&limit=100`,
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