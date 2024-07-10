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

        // for (let i = 100; i < canvas.width; i += 100) {
        //   createPlatform(i, canvas.height, -1, -canvas.height);
        // }
        // for (let i = 100; i < canvas.height; i += 100) {
        //   createPlatform(canvas.width, i, -canvas.width, -1);
        // }

        /////////////////////////////////////////////////
        //////////ONLY CHANGE BELOW THIS POINT///////////
        /////////////////////////////////////////////////

        // TODO 1
        // Create platforms
        // You must decide the x position, y position, width, and height of the platforms
        // example usage: createPlatform(x,y,width,height)

        createPlatform((canvas.width * 3) / 12, canvas.height * 0.85, 100, 15);
        createPlatform((canvas.width * 6) / 12, canvas.height * 0.85, 100, 15);
        createPlatform((canvas.width * 9) / 12, canvas.height * 0.85, 100, 15);

        createPlatform((canvas.width * 1.5) / 12, canvas.height * 0.7, 90, 15);
        createPlatform((canvas.width * 4.5) / 12, canvas.height * 0.7, 90, 15);
        createPlatform((canvas.width * 7.5) / 12, canvas.height * 0.7, 90, 15);
        createPlatform((canvas.width * 10.5) / 12, canvas.height * 0.7, 90, 15);

        createPlatform((canvas.width * 2.5) / 12, canvas.height * 0.55, 80, 15);
        createPlatform((canvas.width * 5.5) / 12, canvas.height * 0.55, 80, 15);
        createPlatform((canvas.width * 8.5) / 12, canvas.height * 0.55, 80, 15);

        createPlatform((canvas.width * 1) / 12, canvas.height * 0.4, 70, 15);
        createPlatform((canvas.width * 4) / 12, canvas.height * 0.4, 70, 15);
        createPlatform((canvas.width * 7) / 12, canvas.height * 0.4, 70, 15);
        createPlatform((canvas.width * 10) / 12, canvas.height * 0.4, 70, 15);

        createPlatform((canvas.width * 2) / 12, canvas.height * 0.3, 60, 15);
        createPlatform((canvas.width * 5) / 12, canvas.height * 0.3, 60, 15);
        createPlatform((canvas.width * 8) / 12, canvas.height * 0.3, 60, 15);

        createPlatform((canvas.width * 0.5) / 12, canvas.height * 0.2, 50, 15);
        createPlatform((canvas.width * 3.5) / 12, canvas.height * 0.2, 50, 15);
        createPlatform((canvas.width * 6.5) / 12, canvas.height * 0.2, 50, 15);
        createPlatform((canvas.width * 9.5) / 12, canvas.height * 0.2, 50, 15);

        // TODO 2
        // Create collectables
        // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
        // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
        // example usage: createCollectable(type, x, y, gravity, bounce)

        createCollectable(
            "steve",
            canvas.width * 0.25,
            canvas.height * 0.25,
            20,
            0.5
        );
        createCollectable(
            "grace",
            canvas.width * 0.50,
            canvas.height * 0.50,
            20,
            0.5
        );
        createCollectable(
            "database",
            canvas.width * Math.random(),
            canvas.height * Math.random(),
            20,
            0.5
        );
        createCollectable(
            "max",
            canvas.width * 0.75,
            canvas.height * 0.75,
            20,
            0.5
        );
        createCollectable(
            "kennedi",
            canvas.width * Math.random(),
            canvas.height * Math.random(),
            20,
            0.5
        );

        // TODO 3
        // Create cannons
        // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
        // Your wall choices are: 'top' 'left' 'right' and 'bottom'
        // example usage: createCannon(side, position, delay, width, height)

        createCannon("right", canvas.height * 0.20, 3000);
        createCannon("right", canvas.height * 0.60, 1000);
        createCannon("left", canvas.height * 0.70, 2000);
        createCannon("left", canvas.height * 0.20, 5000);
        createCannon("top", canvas.width * 0.20, 4000);
        createCannon("top", canvas.width * 0.40, 6000);
        createCannon("top", canvas.width * 0.60, 8000);
        createCannon("top", canvas.width * 0.80, 10000);

        /////////////////////////////////////////////////
        //////////ONLY CHANGE ABOVE THIS POINT///////////
        /////////////////////////////////////////////////
    }

    registerSetup(setup);
});
