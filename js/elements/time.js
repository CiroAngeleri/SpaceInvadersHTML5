var time = {
  x: 0,
  y: 0,
  width: 45,
  height: 31,
  backgroundColor: "#FAF",
  text: 35,
  count: 0,
  update: function() {
    time.count++
    if (time.count >= 60) {
    	time.text -= 1;
    	time.count = 0;
    }
    if (time.text <= 0) {
    	game.state = gameStatesEnum.over
    }
  },
  init: function() {
  },
  render: function() {
    text.draw(time.text, "#fff", 20, null, null, null, game.width / 2, 15);
  }
};