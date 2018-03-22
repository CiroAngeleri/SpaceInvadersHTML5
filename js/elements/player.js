var player = {
  x: 100,
  y: 0,
  width: 45,
  height: 31,
  backgroundColor: "#FAF",
  image: new Image (),
  speed: 3,
  score: 0,
  powerUp: false,
  timeCount: 0,
  bulletCount:0,
  die:function(){
        var index = game.elements.indexOf(this);
        game.elements.splice(index, 1);
        delete player;
        game.state = gameStatesEnum.over
      },
  checkCollsion:function(){
        for (var i = 0; i < game.elements.length; i++) {
          collisionSide = collision.boxesSide(player, game.elements[i]);
          if (game.elements[i].type === "enemy" && collision.boxes(this, game.elements[i])){
            this.die();
            
            return;
          }
          if(collisionSide === 'left' && keyboard.left) {
          //revert left action
          this.x += this.speed;
          }
          else if(collisionSide === 'right' && keyboard.right) {
          //revert right action
          this.x -= this.speed;
          }
        }
    },
  shoot:function () {
    //Si esta activado el powerUp le mando dos balas.
    if ((keyboard.up) && player.timeCount >= 35 && player.powerUp == true) {
      player.bulletCount++
      //ejecuto bullet.create y le paso un id
      bullet.create(player.bulletCount);
      bullet.list[player.bulletCount].init();

      //lo meto al array de elementos del game con su respectivo id
      //game.elements.unshift(bullet.list[player.bulletCount]); si pongo unshift cuando muere un enemy la primera bala pierde el movimiento
      //si pongo push se soluciona
      game.elements.push(bullet.list[player.bulletCount]);

      player.bulletCount++
      //ejecuto bullet.create y le paso un id
      bullet.create(player.bulletCount);
      bullet.list[player.bulletCount].init();

      //lo meto al array de elementos del game con su respectivo id
      //game.elements.unshift(bullet.list[player.bulletCount]); si pongo unshift cuando muere un enemy la primera bala pierde el movimiento
      //si pongo push se soluciona
      game.elements.push(bullet.list[player.bulletCount]);

      player.timeCount = 0;
    }
    //Si NO esta activado el powerUp le mando una bala.
    else if (keyboard.up && player.timeCount >= 35) {
      player.bulletCount++
      //ejecuto bullet.create y le paso un id
      bullet.create(player.bulletCount);
      bullet.list[player.bulletCount].init();

      //lo meto al array de elementos del game con su respectivo id
      //game.elements.unshift(bullet.list[player.bulletCount]); si pongo unshift cuando muere un enemy la primera bala pierde el movimiento
      //si pongo push se soluciona
      game.elements.push(bullet.list[player.bulletCount]);

      player.timeCount = 0;
    }
  },
  move: function() {
    if(keyboard.left) {
      this.x -= this.speed;
      this.image.src = "sprites/ship3_left.png"
    } else if(keyboard.right) {
      this.x += this.speed;
      this.image.src = "sprites/ship3_right.png"
    }
    else{
      this.image.src = 'sprites/ship3.png';
    }
  },
  update: function() {
    player.timeCount++
    this.checkCollsion();
    this.shoot();
    this.move();
  },
  init: function() {
    this.powerUp = false;
    this.y = wall.list['bottom'].y - this.height - 10
    this.image.src = 'sprites/ship3.png';
  },
  render: function() {
    text.draw("Score:"+ player.score, "#fff", 20, null, null, null, 60, 15);
    text.draw("Pulsa P para pausar", "#fff", 20, null, null, null, game.width * 0.30, 15);
    if (player.powerUp == true) {text.draw("Double Shot Activated!", "#3FBF3F", 20, null, null, null, game.width * 0.75, 15);}
    //game.context.fillStyle = this.backgroundColor;
    //game.context.fillRect(this.x, this.y, this.width, this.height);
    game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
};


