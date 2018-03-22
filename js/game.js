/*                                 DOCUMENTACION DEL PROCESO
-Se comenzo a trabar con el proyecto base recomendado por el profesor.
-Se creo un bucle for para "spawnear" al grupo de enemigos.
-Se centro al grupo de enemigos.

*/

var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#333',
  context: null,
  state: null,
  lastStateChange: 30,
  updateId: 0,
  elements: [],
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
    wall.create('top', 0, -980, this.width, 1000);
    wall.create('bottom', 0, this.height-20, this.width, 1000);
    wall.create('left', -980, 0, 1000, this.height);
    wall.create('right', this.width-20, 0, 1000, this.height);
    //crear grupo de enemigos
    //--------------------------------------------------------
    var i, j, id, blockWidth, blockHeight, rows, columns, centerX;
    centerX = this.width / 3.2
    rows = 8;
    columns = 4;
    blockWidth = 45;
    blockHeight = 31;
    for (i = 0; i < columns; i++) { //filas
      for (j = 0; j < rows; j++) { //ladrillos por fila
        id = 'block'+j+i;
        enemy.create(id, j * blockWidth + centerX, i * blockHeight + 30, blockWidth - 10, blockHeight - 10);
        this.elements.push(enemy.list[id]);
      }
    }
    //------------------------------------------------------------------
    this.elements.push(wall.list.top);
    this.elements.push(wall.list.bottom);
    this.elements.push(wall.list.left);
    this.elements.push(wall.list.right);
    this.elements.push(time);
    this.elements.push(player);
    //inicializo
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].init();
    }
    setInterval(this.update.bind(this), 1000/60);
  },
  pause: function() {
    if(this.state === gameStatesEnum.pause) {
      this.state = gameStatesEnum.playing;
    } else if(this.state === gameStatesEnum.playing) {
      this.state = gameStatesEnum.pause;
    }
    this.lastStateChange = 0;
  },
  win: function() {},
  over: function() {},
  update: function() {
    this.updateId++;
    ++this.lastStateChange;
    if(this.state === gameStatesEnum.playing) {
      //hago update de todos los objetos del juego
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update();
      }
    }
    if(keyboard.p && this.lastStateChange > 30) {
      this.pause();
    }
    //llamo al render global
    this.render();
  },
  render: function() {
    if(this.state === gameStatesEnum.playing) {
      //limpio la pantalla
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(this.x, this.y, this.width, this.height);
      //llamo a render de todos los objetos del juego
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].render();
      }
    } else {
      this.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
      this.context.fillRect(this.x, this.y, this.width, this.height);
      switch(this.state) {
        case gameStatesEnum.pause:
          text.draw('Pausa', '#fff');
          break;
        case gameStatesEnum.over:
          text.draw("Game Over", "#fff");
          break;
        case gameStatesEnum.win:
          text.draw("You win!", "#fff");
          break;

      }
    }
  }
};

var gameStatesEnum = {
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o'
};
