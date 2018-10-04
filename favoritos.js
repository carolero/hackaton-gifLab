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
      <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div id="card-image" class="card-image">
                <img src="${url}">
              </div>
              <div class="card-content my-text-center">
                <p id="gif-title">${title}</p>
                <br>
                <div class="my-d-flex">
                  <button class="waves-light btn" data-delete-id="${key}" >Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    $(`button[data-delete-id=${key}]`).click(function() {
      $(this).closest('.row').remove().fadeOut('slow');
      database.ref('favorites/'+ USER_ID + "/" + key).remove();
    });
  }

});
