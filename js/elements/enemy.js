
var enemy = {
  randomValue: 0,
  updateId: 0,
  getRandom:function() {
    if (game.updateId === enemy.updateId) {
      return enemy.randomValue;
    }
    else {
      enemy.randomValue = Math.random() * 10;
      enemy.updateId = game.updateId;
      return enemy.randomValue;
    }
  },
  list: {},
  create: function(id, x, y, width, height) {
    enemy.list[id] = {
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      backgroundColor:"black",
      image: new Image (),
      enemyCount: null,
      type: "enemy",
      die:function(){
        player.score++;
        var id = this.id;
        var index = game.elements.indexOf(this);
        if (index <= 7) {
          player.powerUp = true
        }
        game.elements.splice(index, 1);
        enemy.list[id] = null;
        delete enemy.list[id];
        if (player.score === 32) {
          game.state = gameStatesEnum.win
        }



      },
      lose:function () {
      },
      move: function () {
                this.enemyCount++
        if (this.enemyCount > 35 && player.powerUp == false){
          if (enemy.getRandom() >= 6.66) {
            this.x += 15
          } 
          else if(enemy.getRandom() <= 3.33){
            this.x -= 15
          }
          else {
            this.y += 15
          }
          this.enemyCount = 0;
        }

        if (this.enemyCount > 15 && player.powerUp == true){
          if (enemy.getRandom() >= 6.66) {
            this.x += 15
          } 
          else if(enemy.getRandom() <= 3.33){
            this.x -= 15
          }
          else {
            this.y += 15
          }
          this.enemyCount = 0;
        }
      },
      transform: function(){
        if (player.powerUp == true) {
          this.image.src = 'sprites/enemy_2.png'
        }
      },

      init: function() {
        this.image.src = 'sprites/enemy.png';
      },
      update: function(){
      this.move();
      this.transform();
      if (this.y >= game.height * 0.9) {
        game.state = gameStatesEnum.over
      }
        
        
      },
      render: function() {
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);  
      }
    };
  }
};