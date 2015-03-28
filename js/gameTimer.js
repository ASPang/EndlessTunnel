/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: gameTimer.js
 * 
 * Description:
 * This files contains the function that keeps track of the gameplay time.
 * 
 */

var gameTimer;
var startClock;
var endGameFlag = true; //Game isn't running is true
var numGamePlay = 0;
var milSec = 1000;

//var cardUp = 0;
var degrees = 0;

var endingSet = 0;

function menuScreen() {
   backgroundImg.introScreen();
}

/*Start the game when the start button is clicked*/
function startTimer() { 
   var oneSec = 10;
   
   clearInterval(gameTimer);   
   startClock = new Date().getTime();
   
   endGameFlag = false;

//    /*Initiate game*/
    //initGame();
    setupCanvas();
    
   gameTimer = setInterval(function(){updateGame();}, oneSec);  
}


/*Update the game every few milseconds*/
function updateGame() {
    var i;  //Loop counter
    var curColour, curWidth;
    
    /*Clear the canvas*/
    backgroundImg.clearCanvas();
    
    /*Draw the background*/
    backgroundImg.redraw(backgroundImg.xPos, backgroundImg.yPos);
    
    /*Draw the grid*/
    backgroundImg.drawGridLines();
    //backgroundImg.showMazeSpan(); //TESTING!!!!!!!! -- SHOULD BE UNCOMMENTED
    turnBase();
    
    /*Redraw Character path*/    
    
    /*Redraw Enemy path*/
        
    /*Draw gameplay information*/
    // backgroundImg.canvasCtx.fillStyle = "Black";
    // backgroundImg.canvasCtx.font = "bold 16px Arial";
    // backgroundImg.canvasCtx.fillText("Elapse Time: " + points, backgroundImg.canvas.width / 2 - 30, 16);
    
    /*Draw the character*/
    character.redraw(character.xPos, character.yPos);
    
    /*Update Enemy position*/
    // moveEnemies();
        
    /*Draw the Die*/
    
    /*Draw any cards*/
        
    /*Show traps*/
    
    /*Check if the image intersects with anything on the canvas*/
    //checkObstacles();
    //characterHit();
    //updatePath();
    //characterHitLine();
    //console.log("ing game timer " + character.xPos);
    // hitLine(character, enemy[0], pathC, pathCCount, 1);
    
    
    
    /*Determine if the game over flag as been set*/
    if (endGameFlag == true) { 
        clearInterval(gameTimer);
                
        /*Disable all enemies*/
        for (i = 0; i< enemy.length; i++) {                        
            enemy[i].dx = 0;
            enemy[i].dy = 0;
        }
        
        /*Clear all paths*/
        pathCCount = 0;
        pathC = [];
        pathECount = 0;
        pathE = [];
        lastKey = 37;
        
        /*Stop the character from moving*/
        character.dx = 0;
        character.dy = 0;
        
        /*Determine the winner and display story ending*/        

         /*Set up the option for user to start a new game*/
         screenDisplayed = "gameOver";
         backgroundImg.gameOverScreen();
   }
}

/*Update the enemy position on the screen by pixels*/
function moveEnemies() {
    var i;  //Loop Counter
    
    /*Modify every alien image*/
    for (i = 0; i< enemy.length; i++) {            
        /*Determine if enemy hit another path*/
        //enemyPredictPath(enemy[i]);
        
        
        /*Determine if the enemy will hit a wall */
        //enemyPredictWallColl(enemy[i]);
        
        //enemy[i].redraw(enemy[i].xPos + enemy[i].dx , enemy[i].yPos + enemy[i].dy);
        enemy[i].redraw(enemy[i].xPos , enemy[i].yPos );
        
        /*Determine if the alien is off screen
        if ((enemy[i].xPos) < 0) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].xPos + enemy[i].width) > backgroundImg.canvas.width) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].yPos + enemy[i].height) >= backgroundImg.canvas.height) {
            endGameFlag = true;
            enemy[i].dy = 0;
            enemy[i].dx = 0;
        }*/
        if (enemy[i].canvasWallCollision() != "null") {
          endGameFlag = true;
        }
    }
}

function moveAliens(speed) {
    var i;  //Loop counter
    
    /*Modify every alien image*/
    for (i = 0; i< aliens.length; i++) {            
        aliens[i].canvasCtx.globalAlpha = alienVisibility;    
        aliens[i].redraw(aliens[i].xPos - speed, aliens[i].yPos);
        
        /*Determine if the alien is off screen*/
        if ((aliens[i].xPos + aliens[i].width) < 0) {
            newAlien(aliens[i]);
        }        
        
        /*Modify the alien's visibility*/
        if (visible == true) {
            alienVisibility -= 0.001;
        }
        else if (visible == false) { 
            alienVisibility += 0.001;
        }
        
        if (alienVisibility >= 1.0) {
            alienVisibility = 1.0;
            visible = true;
        }
        else if (alienVisibility <= 0.0) {
            alienVisibility = 0.0;
            visible = false;
        }
        aliens[i].canvasCtx.globalAlpha = 1;  
    }
}

function addTime() {
    var countDownTime = 60;
    var sec30 = 30 * milSec; 
    
    /*Add 30 seconds of game play*/
    startClock += sec30;
    
    /*Calculate time lapse*/
    var timeRemaining = Math.round(countDownTime - (new Date().getTime() - startClock) / milSec);
    
    if (timeRemaining > 60) {
        startClock = new Date().getTime(); 
    }
}

function candyTime() {
    var powerRemaining = Math.round(powerUpEnd - (new Date().getTime() - powerUp) / milSec);
    
    if (powerRemaining > 0) {
        backgroundImg.canvasCtx.font = "bold 30px Arial";
        backgroundImg.canvasCtx.fillText("Power Up Activated", 150, 110);
    }
    
    return powerRemaining;
}

/*Fill area*/
function fillArea() {
    backgroundImg.grid[1] = "blue";
}

/*Convert Second to millisecond*/
function convertSecToMilSec(sec) {
    var milSec = 1000;
    
    return sec * milSec;
}

/*Convert millisecond to second*/
function convertMilSecToSec(milSec) {
    var sec = 1000;
    
    return milSec / sec;
}

/*Draw object paths*/
function redrawPaths() {
    var i = 0, numPaths;
    
    numPaths = path.length;
    for (i = 0; i < numPaths; i++) {
        path[i].drawLine();
    }
}

/*Draw Character path*/
function redrawPaths(character, path, curColour, curWidth) {
    var i = 0, numPaths;
    var pX1, pY1, pX2, pY2; //points
    /*var curColour = path.rbg;
    var curWidth = path.lineWidth;*/
    
    numPaths = path.length; //Get the number of paths
    
    if (numPaths > 0) {
       /*Draw all previous paths*/
       for (i = 0; i < numPaths - 1; i++) {
           pX1 = path[i].x;
           pY1 = path[i].y;
           
           pX2 = path[i+1].x;
           pY2 = path[i+1].y;
           
           backgroundImg.strokeStyle = path[i+1].rbg;   //Update the line background
           backgroundImg.lineWidth = path[i+1].width;
           backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       }
       
       /*Draw the current path getting built*/
       pX1 = path[numPaths - 1].x;
       pY1 = path[numPaths - 1].y;

       pX2 = centPathX(character.xPos);
       pY2 = centPathY(character.yPos);
       
       backgroundImg.strokeStyle = curColour; //Update the line background
       backgroundImg.lineWidth = curWidth;
       backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       
       /*Revert the colour back to the original colour*/
       backgroundImg.strokeStyle = "black";
    }
}

/*Clear the canvas of items*/
function clearBoard() {
    var i = 0;
    
    /*Remove all Enemies*/
    for (i = 0; i < enemy.length; i++) {
        enemy.pop();
    }
    
    /*Remove all projectiles*/
    for (i = 0; i < projectile.length; i++) {
        projectile.pop();
    }    
}

/*Determine the current player's turn*/
function turnBase() {
   var game = backgroundImg.gameRef;
   
   /*Determine game action*/
   if (game.action == "waitRoll") {   
      /*Determine who's turn it is*/
      if (game.turn == "character" && game.move == 0) {// && game.preTurn != "character") {  //Player's turn do nothing if the dice hasn't been rolled
         return game.turn;
      }
      else if (game.turn == "wolf" && game.move == 0) {  //Opponent's turn - roll the dice for them
         /*Roll the dice*/
         backgroundImg.gameRef.move = genNumRange(1, 6);
         
         /*Show Roll dice animation*/
         game.action = "rollDie";
      }  
   }

   /*Show rolling die animation*/
   if (game.action == "rollDie") {
      /*Show animation*/
      dice.animateTimer = setInterval("dice.animateImg(\"die\");", 10);  
      dice.redraw(dice.xPos, dice.yPos);
      
      /*Stop animation after 1 seconds*/
      window.setTimeout(function() {
         /*Stop the dice animation*/
         dice.clearAnimateTimer();
         
         /*Show the dice number rolled*/
         dice.image = gameImage.loadedImg["die"+game.move]; //"die"+game.move;
         
         /*Set the flag for next game step*/
         game.action = "pauseDie";
         console.log("Done - roll animation");
      }, 1000);
      
      game.action = "rolling";
      return game.turn;
   }
   else if (game.action == "rolling") {
      /*Show animation*/      
      dice.redraw(dice.xPos, dice.yPos);
   }
   else if (game.action == "pauseDie") {     
      /*Stop animation after 1 seconds*/
      window.setTimeout(function() {
         /*Start moving the game piece*/
         game.action = "move";
      }, 1000);
   }
   
   /*Update character piece*/
   if (game.action == "move") {
      if (game.turn == "character" && game.move > 0) {
         moveCurChar(character);
      }
      else if (game.turn == "wolf" && game.move > 0) {
         moveCurChar(enemy[0]);
      }
   }
   
   /*Reveal card*/
   if (game.action == "showCard") {      
      card.redraw(card.xPos, card.yPos);
      
      /*Start the animation*/      
      card.animateTimer = setInterval("card.animateImg(\"card\");", 10); 
      
      /*Stop animation after 1 second*/
      window.setTimeout(function() {
            /*Stop the card spinning animation*/
            card.clearAnimateTimer();
            
            /*Determine which choice is made*/
            genStory();
            
            /*Show text*/
            game.action = "waitDecision";
            
         }, 1000);
      
      /*If it's the wolf's turn then wait 3 seconds before making a choice*/
      if (game.turn == "wolf") {
         /*Wolf make a choice after 3 seconds*/
         window.setTimeout(function() {               
               /*Determine which choice is made*/
               //wolfSelectChoice();
            }, 3000);
            
         /*Highlight Wolf's choice 2 seconds after selection (5 seconds)*/
         window.setTimeout(function() {               
               /*Revert button colours back to default black*/
               backgroundImg.button["yesButton"].defaultClr = "black";
               backgroundImg.button["noButton"].defaultClr = "black";
               
               /*Show text*/
               game.action = "end";
            }, 5000);
      }
      
      game.action = "cardSpinning";
      console.log("cardSpinning");
   }
   else if (game.action == "waitDecision") {
      /*Show animation*/      
      card.redraw(card.xPos, card.yPos);
      
      /*Show buttons*/
      backgroundImg.showButton("yesButton");
      backgroundImg.showButton("noButton");
   }   
   
   /*Reveal Trap*/
   if (game.action == "showTrap") {     
      /*Generate the trap information*/
      game.move = genNumRange(1, 3);
      
      /*Show Trap information*/     
      trap.image = gameImage.loadedImg["trap"+game.move];
      trap.redraw(trap.xPos, trap.yPos);
      
      /*Stop animation after 2 second*/
      window.setTimeout(function() {
            /*Show text*/
            game.action = "moveBack";
            
         }, 2000);
         
      game.action = "pauseTrap";
      console.log("showing trap");
   }
   else if (game.action == "moveBack") {
      if (game.turn == "character" && game.move > 0) {
         moveCurCharBack(character);
      }
      else if (game.turn == "wolf" && game.move > 0) {
         moveCurCharBack(enemy[0]);
      }
   }   
   
   /*Determine if character is on a special square*/
   if (game.action == "end" && game.move == 0) {
      backgroundImg.nextPlayerTurn();  //Update whom the next player is going to be
      game.action = "waitRoll";
   }   
}

/*Move current character piece on the board*/
function moveCurChar(character) {
   var aryPos;
   var cord = [];
   var i;   //Loop counter
   //console.log("1.roll = " +  characterStop + " " + backgroundImg.gameRef.move);
   /*Determine the character's new area*/
   if (1 == characterStop && backgroundImg.gameRef.move > 0) {
      /*Get the array position*/
      specialSq(character, character.curGridLoc);
      aryPos = character.curGridLoc + character.dx;
      character.curGridLoc = aryPos;
      
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
      
      characterStop = 0;
      
      console.log("STart to move charater " + " " + backgroundImg.gameRef.move + " " + cord[0] + " " + cord[1] + " " +  aryPos + " " +  character.dx + " " );
   }  
   else {
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
   }   
   
   /***MOVE the character***/
   /*Figure out the direction*/   
   var dx = 1;
   var dy = 1;
   
   if (character.dx == 1) {
      dx = 1;
      dy = 0;
   }
   else if (character.dx == (-1)) {
      dx = -1;
      dy = 0;
   }
      
   else if (character.dx < 1) {
      dx = 0;
      dy = -1;
   }
   else if (character.dx > 1) {
      dx = 0;
      dy = 1;
   }
   else {
      dx = 0;
      dy = 0;
   }
   
   if (0 == characterStop && character.xPos == cord[0] && character.yPos == cord[1] ) {      
      characterStop = 1;
      if (backgroundImg.gameRef.move > 0) {  //Move character
         backgroundImg.gameRef.move -= 1;
      } 
   }
   else if (0 == characterStop) {   //Move character
      character.redraw(character.xPos + dx, character.yPos + dy);
   }   
   
   /*Determine if the player's turn has ended*/
   if (characterStop == 1 && backgroundImg.gameRef.move == 0) {  //Determine if the player has landed on a special square
      /*Get the array position*/
      var action = specialSq(character, character.curGridLoc);
         console.log("action " + action);
      if (action == "card") {  //Player has landed on a special square
         backgroundImg.gameRef.action = "showCard";
         cardUp = 1;
      }
      else if (action == "trap") {  //Player has landed on a trap
         backgroundImg.gameRef.action = "showTrap";
      }
      else {   //End player's turn
         backgroundImg.gameRef.action = "end";
      }
   }
}

/*Move current character back on the board*/
function moveCurCharBack(character) {
   var aryPos;
   var cord = [];
   var i;   //Loop counter

   /*Determine the character's new area*/
   if (character.curGridLoc == 32) {
      backgroundImg.gameRef.move = 0;
      characterStop = 1;
   }  
   else if (1 == characterStop && backgroundImg.gameRef.move > 0) {
      /*Get the array position*/
      specialSqBack(character, character.curGridLoc);
      aryPos = character.curGridLoc - character.dx;
      character.curGridLoc = aryPos;
      
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
      
      characterStop = 0;
      
      console.log("STart to move charater " + " " + backgroundImg.gameRef.move + " " + cord[0] + " " + cord[1] + " " +  aryPos + " " +  character.dx + " " );
   }  
   else {
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
   }   
   
   /***MOVE the character***/
   /*Figure out the direction*/   
   var dx = 1;
   var dy = 1;
   
   if (character.dx == 1) {
      dx = -1;
      dy = 0;
   }
   else if (character.dx == (-1)) {
      dx = 1;
      dy = 0;
   }
      
   else if (character.dx < 1) {
      dx = 0;
      dy = 1;
   }
   else if (character.dx > 1) {
      dx = 0;
      dy = -1;
   }
   else {
      dx = 0;
      dy = 0;
   }
   
   if (0 == characterStop && character.xPos == cord[0] && character.yPos == cord[1] ) {      
      characterStop = 1;
      if (backgroundImg.gameRef.move > 0) {  //Move character
         backgroundImg.gameRef.move -= 1;
      } 
   }
   else if (0 == characterStop) {   //Move character
      character.redraw(character.xPos + dx, character.yPos + dy);
   }   
   
   /*Determine if the player's turn has ended*/
   if (characterStop == 1 && backgroundImg.gameRef.move == 0) {  //Determine if the player has landed on a special square
      /*Get the array position*/
      var action = specialSqBack(character, character.curGridLoc);
      
      if (action == "card") {  //Player has landed on a special square
         backgroundImg.gameRef.action = "showCard";
         cardUp = 1;
      }
      else if (action == "trap") {  //Player has landed on a trap
         backgroundImg.gameRef.action = "showTrap";
      }
      else {   //End player's turn
         backgroundImg.gameRef.action = "end";
      }
   }
}

/*Modify game if character lands on a special square*/
function specialSq(character, aryPos) {
   var grid = backgroundImg.grid
   
   /*Determine the appropriate action*/
   if (grid[aryPos] == "right") {  //Directional change - Right
      character.dx = 1;
   }
   else if (grid[aryPos] == "up") { //Directional change - Up
      character.dx = -backgroundImg.gridCol;
   }
   else if (grid[aryPos] == "left") { //Directional change - Left
      character.dx = -1;
   }
   else if (grid[aryPos] == "down") { //Directional change - Down
      character.dx = backgroundImg.gridCol;
   }
   else if (grid[aryPos] == "end") {  //Reached the end
      character.dx = 0;
      backgroundImg.gameRef.winner.push(character);
      endGameFlag = true;  //Set the end game flag
   }
   else if (grid[aryPos] == "card") {  //Card
      return "card";
   }
   else if (grid[aryPos] == "trap") {  //Card
      return "trap";
   }
   
   return "none";
}

/*Special squares when moving backwards*/
function specialSqBack(character, aryPos) {
   var grid = backgroundImg.grid
   
   /*Determine the appropriate action*/
   if (grid[aryPos] == "right") {  //Directional change - Right - go Up
      character.dx = backgroundImg.gridCol;
   }
   else if (grid[aryPos] == "up") { //Directional change - Up - go left
      character.dx = 1;   
   }
   else if (grid[aryPos] == "left") { //Directional change - Left - go down
      character.dx = -backgroundImg.gridCol; 
   }
   else if (grid[aryPos] == "down") { //Directional change - Down - go right
      character.dx = -1; 
   }
   else if (grid[aryPos] == "card") {  //Card
      return "card";
   }
   else if (grid[aryPos] == "trap") {  //Card
      return "trap";
   }
   
   return "none";
}

/*Story generator*/
function genStory() {  
   var story;
   
   if (backgroundImg.gameRef.turn == "wolf")  {
      story = genNumRange(1, 4);
      card.image = gameImage.loadedImg["card"+story];
   }
   else {
      story = genNumRange(5, 9);
      card.image = gameImage.loadedImg["card"+story];
   }
}

function showEndingStory(ending) {
   /*Size of image*/
   var height = 50;
   var width = 50;

   /*Add the character to the canvas*/
   var endingImg = new physics(gameCanvas, width, height, 100, 100);
   
   endingImg.addImg(gameImage.loadedImg[ending]);
}
// /*Generate Red Riding Hood's Story*/
// function genRedStory() {
   // var story = genNumRange(1, 4);
   
   // card.image = gameImage.loadedImg["cardRed"+story];
// }

// /*Generate Wolf's Story*/
// function genWolfStory() {
   // var story = genNumRange(1, 4);
   
   // if (story == 1) {
      
   // }
   // else if (story == 2) {
   // }
   // else if (story == 3) {
   // }
   // else {
   // }
// }



