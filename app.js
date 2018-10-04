// var database = firebase.database();
// var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

let indexOfGif = 0;

$('a').click(goToNextGif);

function goToNextGif() {
  
}

$.ajax({
  type: 'GET',
  url: `https://api.giphy.com/v1/gifs/search?q=gif&api_key=${keyAPI}&limit=100`,
  success: carregarPosts,
  error: erro
});

function carregarPosts(data) {
  urlImg = data['data'][indexOfGif]['images']['original']['url'];
  $('img').attr('src', urlImg);
  // gifTitle = data['data'][indexOfGif]['title'];
  // $('.gif-title').html(gifTitle);
}

function erro() {
  console.log('erro');
}