/*
  .- Se modifico el css para que entre en pantalla completa
  .- Se eliminan los archivos ball y break porque no los necesitamos
  .- Se controla el window.resize para adaptar el tamaño de la pantalla de forma proporcional
  .- Se pasan los datos DOM del canvas al Game en un objeto
  .- Se crean las carpetas utils y elements para organizar los archivos js
  .- Se modifico la clase keyboard para guardar el estado de cada tecla
  .- Se cambio las referencias al mismo objeto por this
  .- Se actualiza el player para que se mueva en x segun la nueva clase keyboard
  .- Se agrega una funcion init todos los elements para que al crearse una vez iniciado el juego si es necesario
  .- Se agrega un background a las paredes y cambiamos las posiciones para que se vean en la pantalla
  .- Se cambio el metodo boxesSide de la clase collision para que devuelva el lado de boxA y no el de boxB
  .- Se agrego control de pausa al juego y una variable lastStateChange
  .- Se agrego el archivo text para dibujar textos
*/

var resize = function(evt) {
  var canvas = document.getElementById('game');
  var w = window.innerWidth / canvas.width;
  var h = window.innerHeight / canvas.height;
  var scale = Math.min(h, w);
  canvas.style.width = (canvas.width * scale) + 'px';
  canvas.style.height = (canvas.height * scale) + 'px';
};

var load = function() {
  resize();
  document.onkeydown = keyboard.press;
  document.onkeyup = keyboard.release;
  var canvas = document.getElementById('game');
  var data = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop,
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext('2d')
  };
  game.start(data);
};

window.onload = load;
window.onresize = resize;
