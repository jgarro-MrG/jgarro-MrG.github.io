/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
  var KEY2 = {
    W: 87,
    A: 65,
    S: 83,
    D: 68
  };
  var WALL = {
    LEFT: 0,
    RIGHT: $("#board").width(),
    TOP: 0,
    BOTTOM: $("#board").height()
  }

  // Game Item Objects
  var walker = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
  };

  var walker2 = {
    x: 350,
    y: 350,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
  };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    console.log(event.keyCode);
    if (event.keyCode === KEY.LEFT) {
      walker.speedX = -5;
      walker.speedY = 0;
    }
    if (event.keyCode === KEY.RIGHT) {
      walker.speedX = 5;
      walker.speedY = 0;
    }
    if (event.keyCode === KEY.UP) {
      walker.speedX = 0;
      walker.speedY = -5;
    }
    if (event.keyCode === KEY.DOWN) {
      walker.speedX = 0;
      walker.speedY = 5;
    }
    if (event.keyCode === KEY2.A) {
      walker2.speedX = -5;
      walker2.speedY = 0;
    }
    if (event.keyCode === KEY2.D) {
      walker2.speedX = 5;
      walker2.speedY = 0;
    }
    if (event.keyCode === KEY2.W) {
      walker2.speedX = 0;
      walker2.speedY = -5;
    }
    if (event.keyCode === KEY2.S) {
      walker2.speedX = 0;
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    for (i in KEY) {
      if (event.keyCode === KEY[i]) {
        walker.speedX = 0;
        walker.speedY = 0;
      }
    }
    for (i in KEY2) {
      if (event.keyCode === KEY2[i]) {
        walker2.speedX = 0;
        walker2.speedY = 0;
      }
    }
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
    walker2.x += walker2.speedX;
    walker2.y += walker2.speedY;
  }

  function redrawGameItem() {
    
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
    $("#walker2").css("left", walker2.x);
    $("#walker2").css("top", walker2.y);
  }

  function wallCollision() {
    
    if (walker.x < WALL.LEFT) {
      walker.x -= walker.speedX;
    }
    if (walker.y < WALL.TOP) {
      walker.y -= walker.speedY;
    }
    if (walker.x + walker.width >= WALL.RIGHT) {
      walker.x -= walker.speedX;
    }
    if (walker.y + walker.height >= WALL.BOTTOM) {
      walker.y -= walker.speedY;
    }

    if (walker2.x < WALL.LEFT) {
      walker2.x -= walker2.speedX;
    }
    if (walker2.y < WALL.TOP) {
      walker2.y -= walker2.speedY;
    }
    if (walker2.x + walker2.width >= WALL.RIGHT) {
      walker2.x -= walker2.speedX;
    }
    if (walker2.y + walker2.height >= WALL.BOTTOM) {
      walker2.y -= walker2.speedY;
    }

  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
