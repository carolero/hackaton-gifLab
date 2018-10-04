var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {

    database.ref('favorites/' + USER_ID).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          createFavorite(childData.url, childData.title, childKey);
        });
      });

    function createFavorite(url, title, key) {
    $(".favorite-list").append(`
        <li>
        <div class="row txt-post">
            <img src="${url}">
            <p>${title}</p>
        </div>
        <button data-delete-id="${key}" >Deletar</button>
        </li>
    `);
      
    // $(`button[data-delete-id=${key}]`).click(function() {
    //   $(this).parent().remove();
    //   database.ref('posts/'+ USER_ID + "/" + key).remove();
    // }); >>>>> ISSO AQUI DELETA
      
    };

});