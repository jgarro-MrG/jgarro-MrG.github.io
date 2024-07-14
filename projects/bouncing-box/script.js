(function () {
    "use strict";
    /* global jQuery */

    //////////////////////////////////////////////////////////////////
    /////////////////// SETUP DO NOT DELETE //////////////////////////
    //////////////////////////////////////////////////////////////////

    var box = $(".box"); // reference to the HTML .box element
    var board = $(".board"); // reference to the HTML .board element
    var score = $(".score h1");
    var boardWidth = board.width(); // the maximum X-Coordinate of the screen
    var boardHeight = board.height(); // the maximum Y-Coordinate of the screen\
    
    // Every 50 milliseconds, call the update Function (see below)
    setInterval(update, 50);

    // Every time the box is clicked, call the handleBoxClick Function (see below)
    box.on("click", handleBoxClick);

    // moves the Box to a new position on the screen along the X-Axis
    function moveBoxTo(newPositionX, newPositionY) {
        box.css("left", newPositionX);
        box.css("top", newPositionY);
    }

    // changes the text displayed on the Box
    function changeBoxText(newText) {
        box.text(newText);
    }
    function changeScore(newText) {
        score.text(newText);
    }

    //////////////////////////////////////////////////////////////////
    /////////////////// YOUR CODE BELOW HERE /////////////////////////
    //////////////////////////////////////////////////////////////////

    // TODO 2 - Variable declarations
    var positionX = 0;
    var positionY = 0;
    var speedX = 10;
    var speedY = 3;
    var points = 0;

    /* 
This Function will be called 20 times/second. Each time it is called,
it should move the Box to a new location. If the box drifts off the screen
turn it around! 
*/
    function update() {
        // makes boardWidth responsive
        boardWidth = jQuery(".board").width();
        boardHeight = jQuery(".board").height();
        var boxHasReachedHorizontalEdgeOfScreen = positionX > boardWidth - box.width() || positionX < 0 ;
        var boxHasReachedVerticalEdgeOfScreen = positionY > boardHeight - box.height() || positionY < 0 ;

        // keeps the box bouncing within the board's limits                    
        if (boxHasReachedHorizontalEdgeOfScreen) {
            speedX *= -1;
            //changes backround gradient color
            changeBackgroundGradient();
        }
        
        if (boxHasReachedVerticalEdgeOfScreen) {
            speedY *= -1;
        }
        

        // keeps the box in motion
        positionX = positionX + speedX;
        positionY = positionY + speedY;
        moveBoxTo(positionX, positionY);
    }

    /* 
This Function will be called each time the box is clicked. Each time it is called,
it should increase the points total, increase the speed, and move the box to
the left side of the screen.
*/
    function handleBoxClick() {
        points += 1;
        if (speedX >= 0) {
            speedX += 3;
        } else {
            speedX -= 3;
        }
        speedX *= -1;
        if (speedY >= 0) {
            speedY += 2;
        } else {
            speedY -= 2;
        }

        changeBoxText(points);
        changeScore(points);

        // Reassigning the positionX variable to 0 so that the box will move back to the left side of the screen
        //positionX = 0;
    }

    // array of colors used to generate the gradients
    var colors = [
        "#FF0000",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#FF00FF",
    ];

    // used as indexes to access the array of colors
    var leftStop = 0;
    var rightStop = 1;

    //This function will be called to change the background gradient
    function changeBackgroundGradient() {
        var backgroundGradient =
            'url("img/aldebaran.jpg"), linear-gradient(to right, ' +
            colors[leftStop] +
            ", " +
            colors[rightStop] +
            ")";

        // jQuery to set the backgrount-image property
        $(".board").css("background-image", backgroundGradient);

        //ternary conditionals to rotate throught the gradient color stops
        leftStop < 5 ? leftStop++ : (leftStop = 0);
        rightStop < 5 ? rightStop++ : (rightStop = 0);
    }
})();