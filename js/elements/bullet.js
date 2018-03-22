var bullet = {
  list: {},
  create: function(id) {
    bullet.list[id] = {
      id: id + 1,
      x:0,
      y: 0,
      width: 3,
      height: 20,
      backgroundColor: 'green',
      image: new Image (),
      timeCount:0,
      checkCollsion:function(){
        for (var i = 0; i < game.elements.length; i++) {
          if (game.elements[i].type === "enemy" && collision.boxes(this, game.elements[i])){
            game.elements[i].die();
            this.die();
            return;
          }
        }
      },
      bulletPosition:  function () {
        //Si el power up no esta activado la pone en el medio del player
        if (player.powerUp == false) {
          return player.x + 20;
        }
        //Si esta activado y la bala es par sale por la derecha.
        if (this.id % 2 == 0 && player.powerUp == true) {
          return player.x + 43;
        }
        //Si esta activado y NO es par sale por la izquierda.
        else{
          return player.x;
        } 
      },
      die:function(){

        var id = this.id;
        var index = game.elements.indexOf(this);
        game.elements.splice(index, 1);
        bullet.list[id] = null;
        delete bullet.list[id];
        this.width = 3;
        this.height = 20;
      },
      init:function() {
        this.x = this.bulletPosition();
        this.y = player.y - 17;
        this.image.src = 'sprites/bullet.png';
      },
      update: function() {
        this.timeCount++;
        if (this.timeCount >= 100) {
          this.die();
        }
        this.checkCollsion();
        this.y -= 5
      },
      render: function() {
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };
  },
  /*init: function() {
        this.x = 
        this.y = player.y - 20
  }*/
};
