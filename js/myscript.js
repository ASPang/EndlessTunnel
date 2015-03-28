/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: myscripts.js
 * 
 * Description:
 * This files contains the function that deals with starting the game and
 * updating the game windows.
 * 
 */

/*Start the game once the page has been loaded*/
window.onload = initGame;

/*Initialize the game*/
function initGame() {
    /*Preload images*/
     preloadGameImages();
     
    /*Display the board*/
    setupCanvas();
    
    /*Add mouse event handlers*/
    backgroundImg.canvas.addEventListener("click", mouseClick, false);
    backgroundImg.canvas.addEventListener("mousemove", mouseLoc, false); 
    
    //startTimer();   ///TEST!!!!!!!!!!!!!!!
    
    /*Display the Menu Screen*/
    //backgroundImg.introScreen();
    menuScreen();
}

/*Initialize the canvas*/
function setupCanvas2() {
     /*Setting up the canvas*/
    c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
}

/*Preload all the game images*/
function preloadGameImages() {   
    gameImage = new preloadImages()
    
    /*Add image that needs to be preloaded*/
    for (i = 0; i < imgSrc.length; i++) {
        gameImage.setImageAry(imgSrc[i]);
    }
}

/*Set up the canvas*/
function setupCanvas() {
    var gameCanvas = "gameCanvas";
    var height = 300;   //Height of the area
    var width = 500;    //Width of the area
    var square = 100;   //Size of the square
    var tileBackground = [];  //Tile background images
    
    backgroundImg = new imageLib(gameCanvas, width, height, 0, 0);
    
    /*Add background image to canvas*/
    backgroundImg.addImg(gameImage.loadedImg["background"]);
    
    /*Setup interface screens*/
    setupInterfaces();
    
    /*Initiate grid*/
    backgroundImg.canvasGrid(square);   //Square size
    backgroundImg.gridSqHeight = square;
    backgroundImg.gridSqWidth = square;
    
    /*Generate the tunnel/maze*/
    backgroundImg.initializeMazeGrid(10,10);   //Initialize the grid that's 10x10 squares
    backgroundImg.maze.start = 90;
    backgroundImg.maze.exit = 0;    
    backgroundImg.genMaze(90,99, 5);  //Generate a maze between 90 and 99 with total number of doors
    
    /*Set up background Tiles*/
    tileBackground[0] = -1; //Floor
    tileBackground[1] = gameImage.loadedImg["floor"];
    tileBackground[2] = -2; //wall
    tileBackground[3] = gameImage.loadedImg["wall"];
    tileBackground[4] = 0; //exit
    tileBackground[5] = gameImage.loadedImg["door"];
    tileBackground[6] = -3; //Outside grid/maze
    tileBackground[7] = gameImage.loadedImg["nothing"];   //Other doors
    tileBackground[8] = gameImage.loadedImg["door"];   //Other doors
    backgroundImg.initMazeSpan(90, tileBackground, 9);   //Tile background would be based on grid variables initMazeSpan(center, img, numImg)

    //setupGridSpots();
    
    /*Set up the game ref*/
    // backgroundImg.gameRef.turn = "character";
    // backgroundImg.gameRef.preTurn = "wolf";
    
    // backgroundImg.gameRef.players.push("character");
    // backgroundImg.gameRef.players.push("wolf");
    
    // backgroundImg.gameRef.actionList.push("charRoll");
    
    // backgroundImg.gameRef.action = "waitRoll";
    
    /*Draw the character on the screen*/
    setupCharacter(gameCanvas);
    // addEnemy(gameCanvas);
    
    /*Drawing out paths in the game*/
    
    /*Draw up the cards*/
    
    /*Draw up the dice images*/
    
    /*Draw up trap images*/
}

/*Set up the different interfaces of the game*/
function setupInterfaces() {
   var centerVer, centerHor;

   /*Set up the intro/menu interface*/
   backgroundImg.introBackground(gameImage.loadedImg["introMenuBgd"], 0, 0, 500, 300); //Set up the background
   backgroundImg.setTitle("Endless Tunnels", 70, 100, "bold 50px Arial" );//Set up the title
   backgroundImg.setStartButton("Start", 200, 175, "bold 24px Arial" );  //Set up the start button
   
   /*Set up the Game Over Interface screen*/
   backgroundImg.setGameOverMsg("FINISH", 150, 100, "bold 60px Arial", "red");
   backgroundImg.setNewGameButton("New Game", 175, 250,"bold 30px Arial", "black", "blue");
   
   /*Set up the Pause Game button in the Game Interface*/
   backgroundImg.createNewButton("pauseButton", "|| Pause", 425, 16, "bold 16px Arial", "black", "blue");  //Set up the start button
   backgroundImg.createNewButton("resumeButton", "Resume", 200, 200, "bold 24px Arial", "black", "blue");  //Set up the start button
   
   /*Hide Buttons*/
   backgroundImg.hideButton("pauseButton");
   backgroundImg.hideButton("resumeButton");
}

/*Set up the obstacles for the game*/
function setupObstacles() {
    path[0] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[0].endX = 0,
    path[0].endY = 0;
    path[0].slopeX = 16/13;
    path[0].slopeY = 3410/13;
    path[0].drawLine();

    path[1] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[1].endX = 0; 
    path[1].endY = 0;
    path[1].slopeX = -16/13;
    path[1].slopeY = 3410/13;
    path[1].drawLine();
}

/*Set up the character*/
function setupCharacter(gameCanvas) {
    /*Size of character*/
    var height = 75;
    var width = 75;
    var cord = [], x, y, gridPos;
    
    var colour = "red";
    var lineWidth = height;
    
    var startGridPoint = 7;   //The grid starting point starts at 0
    
    cord = backgroundImg.aryPixelPos(startGridPoint); //Get the pixel location of the starting position
    
    /*Add the character to the canvas*/
    character = new physics(gameCanvas, width, height, cord[0], cord[1]);
    character.oldPosX = cord[0];
    character.oldPosY = cord[1];
    
    /*Save current location on the grid*/
    character.curGridLoc = startGridPoint;
    character.addImg(gameImage.loadedImg["character"]);
    
    /*Character Direction*/
    character.dx = 1;
    character.dy = 0;
}

/*Set up the cards for the board*/
function setupCard(gameCanvas) {
   /*Size of image*/
    var height = 465;
    var width = 415;
    var cord = [], x, y, gridPos;
    var i = 0; //Loop counter
    
    /*Add the card to the canvas*/
    card = new imageLib(gameCanvas, width, height, 200, 10);
    card.oldPosX = 150;
    card.oldPosY = 200;
    
    /*Save current location on the canvas*/
    card.addImg(gameImage.loadedImg["card1"]);
   
    /*Save all frames*/
    card.frameNum = 4;
    card.frameCount = 1;
    
    for (i = 1; i <= card.frameNum; i++) {
       card.frame["card"+i] = {
         image: gameImage.loadedImg["card"+i],
         width: width,
         height: height
       };
    }
}

/*Set up the different card choices*/
function setupCardChoices() {   
   /*Setup Two choices*/
   backgroundImg.createNewButton("yesButton", "Yes", 300, 360,"bold 30px Arial", "black", "blue");
   backgroundImg.createNewButton("noButton", "No", 400, 360,"bold 30px Arial", "black", "blue");
}

function setupCard2(gameCanvas) {
   /*Size of character*/
    var height = 150;
    var width = 150;
    var cord = [], x, y, gridPos;
    var i = 0; //Loop counter
    
    /*Add the card to the canvas*/
    card[0] = new imageLib(gameCanvas, width, height, 150, 200);
    card[0].oldPosX = 150;
    card[0].oldPosY = 200;
    
    /*Save current location on the canvas*/
    card[0].addImg(gameImage.loadedImg["card1"]);
   
    /*Save all frames*/
    card[0].frameNum = 4;
    card[0].frameCount = 1;
    
    //var w = [0, 150, 350, 150, 350];
    //var h = [0, 350, 150, 350, 150];
    var w = [0, 150, 150, 150, 150];
    var h = [0, 150, 150, 150, 150];
    
    for (i = 1; i <= card[0].frameNum; i++) {
       card[0].frame["card"+i] = {
         image: gameImage.loadedImg["card"+i],
         width: w[i],
         height: h[i]
       };
    }
}

/*Set up the cards for the board*/
function setupDiceImg(gameCanvas) {
   /*Size of character*/
    var height = 150;
    var width = 150;
    var cord = [], x, y, gridPos;
    var i = 0; //Loop counter
    
    /*Add the card to the canvas*/
    dice = new imageLib(gameCanvas, width, height, 325, 125);
    dice.oldPosX = 200;
    dice.oldPosY = 200;
    
    /*Save current location on the canvas*/
    dice.addImg(gameImage.loadedImg["die1"]);
   
    /*Save all frames*/
    dice.frameNum = 4;
    dice.frameCount = 1;
    
    var w = [0, 150, 150, 150, 150];
    var h = [0, 150, 150, 150, 150];
    
    for (i = 1; i <= dice.frameNum; i++) {
       dice.frame["die"+i] = {
         image: gameImage.loadedImg["die"+i],
         width: width,
         height: height
       };
    }
}

/*Set up the cards for the board*/
function setupTrapImg(gameCanvas) {
   /*Size of image*/
    var height = 300;
    var width = 300;
    var i = 0; //Loop counter
    
    /*Add the card to the canvas*/
    trap = new imageLib(gameCanvas, width, height, 225, 100);
    trap.oldPosX = 200;
    trap.oldPosY = 200;
    
    /*Save current location on the canvas*/
    trap.addImg(gameImage.loadedImg["trap1"]);
   
    /*Save all frames*/
    trap.frameNum = 3;
    trap.frameCount = 1;
    
    var w = [0, 150, 150, 150, 150];
    var h = [0, 150, 150, 150, 150];
    
    for (i = 1; i <= trap.frameNum; i++) {
       trap.frame["trap"+i] = {
         image: gameImage.loadedImg["trap"+i],
         width: width, 
         height: height
       };
    }
}
/*Set up the enemy*/
function addEnemy(gameCanvas) {
    /*Size of plants
    var height = 40;
    var width = 20;*/
    
    var height = 50;
    var width = 50;
    var colour = "black";
    var lineWidth = Math.floor(15 / 2);
    
    var startGridPoint = 32;
    
    cord = backgroundImg.aryPixelPos(startGridPoint); //Get the pixel location of the starting position 32
        
    /*Setting enemy location*/
    //enemy[0] = new physics(gameCanvas, width, height, 1, 210);
    enemy[0] = new physics(gameCanvas, width, height, cord[0], cord[1]);
    enemy[0].addImg(gameImage.loadedImg["wolf"]);
    
    /*Save current location on the grid*/
    enemy[0].curGridLoc = startGridPoint;
    
    /*Enemy Direction*/
    enemy[0].dx = 1;
    enemy[0].dy = 0;
    
    /*Save enemy initial location*/
    pathE[pathECount] = {
            x: enemy[0].oldPosX + Math.floor(enemy[0].height/2), 
            y: enemy[0].oldPosY + Math.floor(enemy[0].height/2),
            oX: enemy[0].oldPosX, 
            oY: enemy[0].oldPosY,
            rbg: colour,
            width: lineWidth
    };
    
    pathECount++
    
}

function addAliens(gameCanvas) {
    /*Size of aliens*/
    var alienHeight = 50;
    var alienWidth = 50;
    
    /*Add aliens to the canvas*/
    aliens[0] = new physics(gameCanvas, alienWidth, alienHeight, 275, 200);
    aliens[0].addImg(gameImage.loadedImg["alien1"]);
    
    
    aliens[1] = new physics(gameCanvas, alienWidth, alienHeight, 550, 200);
    aliens[1].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[2] = new physics(gameCanvas, alienWidth, alienHeight, 50, 100);
    aliens[2].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[3] = new physics(gameCanvas, alienWidth, alienHeight, 100, 150);
    aliens[3].addImg(gameImage.loadedImg["alien1"]);
}

function addCandy(gameCanvas) {
    /*Size of candy*/
    var width = 50;
    var height = 50;
    
    /*Add aliens to the canvas*/
    candy = new physics(gameCanvas, width, height, 400, 350);
    candy.addImg(gameImage.loadedImg["candy"]);
}

/*Set up the grid*/
function setupGridSpots() {
   /*Direction spots*/
   right = [32, 24, 17];
   up = [39, 30];
   left = [7, 14];
   down = [0, 9];
   
   /*End spot*/
   end = [21];
   
   /*Card spots*/
   card = [2, 6, 22, 23, 28, 34, 38];
   
   /*Trap Spots*/
   trap = [1, 3, 8, 10, 13, 15, 26, 27, 36];
   
   /*Fill grid*/
   fillGrid("right", right);
   fillGrid("up", up);
   fillGrid("left", left);
   fillGrid("down", down);
   
   fillGrid("end", end);
   
   fillGrid("card", card);
   
   fillGrid("trap", trap);
}

function fillGrid(msg, ary) {
   var i, aryLen, val; 
   var grid = backgroundImg.grid;   
   
   /*Determine the number of squares in the grid*/
   aryLen = ary.length;
   
   for (i = 0; i < aryLen; i++) {
      val = ary[i];
      grid[val] = msg;
   }
}



