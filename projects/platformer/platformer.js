$(function () {
    // initialize canvas and context when able to
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("load", loadJson);

    function setup() {
        if (firstTimeSetup) {
            halleImage = document.getElementById("player");
            projectileImage = document.getElementById("projectile");
            cannonImage = document.getElementById("cannon");
            $(document).on("keydown", handleKeyDown);
            $(document).on("keyup", handleKeyUp);
            firstTimeSetup = false;
            //start game
            setInterval(main, 1000 / frameRate);
        }
        //create walls
        createPlatform(-50, -50, canvas.width + 100, 50); //top
        createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
        createPlatform(-50, -50, 50, canvas.height + 500); //bottom
        createPlatform(canvas.width, -50, 50, canvas.height + 100);

        /**
         * Uncomment the loops below to add a "grid" to your platformer game's screen
         * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
         * This can give you a better idea of where to create new platforms
         * Comment the lines out to remove the grid
         */
/* 
        for (let i = 100; i < canvas.width; i += 100) {
           createPlatform(i, canvas.height, -1, -canvas.height);
        }
        for (let i = 100; i < canvas.height; i += 100) {
           createPlatform(canvas.width, i, -canvas.width, -1);
        }
 */
        /////////////////////////////////////////////////
        //////////ONLY CHANGE BELOW THIS POINT///////////
        /////////////////////////////////////////////////

        // TODO 1
        // Create platforms
        // You must decide the x position, y position, width, and height of the platforms
        // example usage: createPlatform(x,y,width,height)

        createPlatform(200, 650, 100, 100);
        createPlatform(400, 550, 100, 100);
        createPlatform(500, 550, 400, 100);
        createPlatform(1000, 550, 200, 100);
        createPlatform(100, 450, 400, 100);
        createPlatform(1100, 450, 100, 100);
        createPlatform(1300, 350, 100, 300);
        createPlatform(600, 350, 300, 100);
        createPlatform(100, 250, 600, 100);
        createPlatform(800, 250, 100, 100);
        createPlatform(1000, 250, 200, 100);
        createPlatform(100, 150, 100, 100);
        createPlatform(300, 150, 100, 100);
        createPlatform(500, 150, 100, 100);
        createPlatform(900, 50, 100, 100);
        createPlatform(200, 0, 100, 50);
        createPlatform(400, 0, 100, 50);
        createPlatform(900, 0, 100, 50);

        // TODO 2
        // Create collectables
        // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
        // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
        // example usage: createCollectable(type, x, y, gravity, bounce)

        createCollectable("steve", 130, 90, 0, 0);
        createCollectable("steve", 1230, 90, 0, 0);
        createCollectable("steve", 730, 290, 0, 0);
        createCollectable("steve", 930, 290, 0, 0);
        createCollectable("steve", 130, 390, 0, 0);
        createCollectable("steve", 1330, 690, 0, 0.5);

        // TODO 3
        // Create cannons
        // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
        // Your wall choices are: 'top' 'left' 'right' and 'bottom'
        // example usage: createCannon(side, position, delay, width, height)

        createCannon("left", 40, 5000);
        createCannon("left", 340, 4000);
        createCannon("left", 540, 5000);
        createCannon("top", 410, 3000);
        createCannon("top", 610, 2000);
        createCannon("top", 810, 1500);
        createCannon("top", 1410, 1000);
        createCannon("right", 360, 10000);
        createCannon("bottom", 890, 4000);
        createCannon("bottom", 1190, 3000);

        /////////////////////////////////////////////////
        //////////ONLY CHANGE ABOVE THIS POINT///////////
        /////////////////////////////////////////////////
    }

    registerSetup(setup);
});
