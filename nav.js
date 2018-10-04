// $(document).ready(function(){
//     $('.sidenav').sidenav();
//   });

const btnBusca = document.getElementById("btn-busca");
btnBusca.addEventListener("click", trazBusca);

function buscaPalavra(){
  return document.getElementById("campo-busca").value;
}

function erro(){
   console.log("erro");
}

function trazBusca(event){
  event.preventDefault();
  const pegarGif = new XMLHttpRequest();
  pegarGif.open("GET", `http://api.giphy.com/v1/gifs/search?q=${buscaPalavra()}&api_key=rc0vl8oEetDnA6wEuyjXXwtGB99EYxSS&limit=100`);
  pegarGif.onload = showGif;
  pegarGif.onerror = erro;
  pegarGif.send();
}
