/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: keyboard.js
 * 
 * Description:
 * This files contains the function that determines the appropriate action for 
 * the key that was pressed. 
 * 
 */

/*Initiate Keyboard listener even handler*/
window.addEventListener("keydown", keyDownEvent, false);
//window.addEventListener("keypress", keyDownEvent, false);

/*Keyboard event handler*/
function keyDownEvent(e) {
    var left = -1,
            right = 1,
            up = -brdCol,
            down = brdCol;
    var avl;    //Non-empty space
    var noBlock;    //Empty Space
    
    //e.preventDefault();   //TESTING!!!! - DISABLED DURING DEVELOPMENT
    
    /*Determine if the game over flag as been set*/
    if (endGameFlag == true || lastKey == e.keyCode) { 
      return false; //TESTING!!!! - DISABLED DURING DEVELOPMENT
    }
    
    //console.log("last key " + lastKey + " keycode " + (e.keyCode));
    
    /*Determine which key is pressed*/
    switch (e.keyCode) {
        case 32:
            // Space key pressed            
            spaceBarKeyEvent();
            
            break;
        case 37:
            // left key pressed
            lastKey = e.keyCode;
            
            leftArrowKeyEvent();
            
            break;
        case 38:
            // up key pressed
            lastKey = e.keyCode;
            upArrowKeyEvent();
            break;
        case 39:
            // right key pressed
            lastKey = e.keyCode;
            //console.log("right key pressed");
            
            rightArrowKeyEvent();
            
            break;
        case 40:
            // down key pressed
            lastKey = e.keyCode;
            downArrowKeyEvent();
            
            break;
        case 68:
            // D key pressed
            //dKeyEvent();
            
            break;
        case 70:
            // F key pressed
            //fKeyEvent();
            
            break;
        case 82:    
            // R Key pressed
            //rKeyEvent();
            
            break;
            
        case 83:
            // S Key pressed
            //sKeyEvent();
            
            break;
    }
}

/*directional movement*/
var move = 1;
var dir = 1;

/*Event when up arrow key is pressed*/
function upArrowKeyEvent() {   
    /*Enable character to jump*/
    if ((character.yPos + character.height) >= character.canvas.height) {
        character.jumping = true; 
    }
    else {
        /*Move character image*/
        character.redraw(character.xPos, character.yPos  - move);
        character.stopWallCollision();
        console.log("HERE" + character.xPos);
        /*Saving character direction*/
        character.dx = 0;
        character.dy = -dir;
        updateCPath();
    }

    /*Update the game window*/
    updateGame();
}

/*Event when down arrow key is pressed*/
function downArrowKeyEvent() {
    /*Move character image*/
    character.redraw(character.xPos, character.yPos  + move);
    character.stopWallCollision();
    
    /*Saving character direction*/
    character.dx = 0;
    character.dy = dir;
    updateCPath();
    
    /*Update the game window*/
    updateGame();
}

/*Event when right arrow key is pressed*/
function rightArrowKeyEvent() {
    /*Move character image*/
    character.redraw(character.xPos + move, character.yPos);
    character.stopWallCollision();
    
    /*Saving character direction*/
    character.dx = dir;
    character.dy = 0;
    updateCPath();
    
    /*Update the game window*/
    updateGame();
}

/*Event when left arrow key is pressed*/
function leftArrowKeyEvent() {
    /*Move character image*/
    console.log(character.xPos);
    character.redraw(character.xPos - move, character.yPos);
    character.stopWallCollision();
    console.log("after " + character.xPos);
    /*Saving character direction*/
    character.dx = -dir;
    character.dy = 0;
    updateCPath();
    
    /*Update the game window*/
    updateGame();
}

/*Event when space bar is pressed*/
function spaceBarKeyEvent() {
    /*Draw the projectile*/
    var newProj = new physics(backgroundImg.canvasName, 10, 10, character.xPos+25, 275);
    newProj.dx = -2;
    newProj.dy = 2;
    newProj.floor = backgroundImg.canvas.height;
    
    projectile.push(newProj);
    updateGame();
}

/*Event when the "s" is pressed*/
function sKeyEvent() {
   var moveVal = 4;
   
   /*Update character state*/
   if (dir == moveVal) {
      if (character.dx % 4 == 0 && character.dx < 0) {
         character.dx /= moveVal;
      }
      else if (character.dy % 4 == 0 && character.dy < 0) {
         character.dy /= moveVal;
      }
      else if (character.dx  == moveVal) {
         character.dx /= moveVal;
      }
      else if (character.dy == moveVal)  {
         character.dy /= moveVal;
      }
   }
   dir = 1;
   
   /*Update character image*/
   character.image = (gameImage.loadedImg["Water"]);
   
   /*Update the character's Path*/
   backgroundImg.strokeStyle = "blue";
   backgroundImg.lineWidth = character.height/2;
}

/*Event when the "d" is pressed*/
function dKeyEvent() {
   var moveVal = 4;

   /*Update character state*/
   if (dir != moveVal) {
      character.dx *= moveVal;
      character.dy *= moveVal;
   }   
   dir = moveVal;
   
   /*Update character image*/
   character.image = (gameImage.loadedImg["Lightning"]);
   
   /*Update the character's Path*/
   backgroundImg.strokeStyle = "yellow";
   backgroundImg.lineWidth = character.height/2;
}

/*Event when the "f" is pressed*/
function fKeyEvent() {
   var moveVal = 4;
   
   /*Update character state*/
   if (dir == moveVal) {
      if (character.dx % 4 == 0 && character.dx < 0) {
         character.dx /= moveVal;
      }
      else if (character.dy % 4 == 0 && character.dy < 0) {
         character.dy /= moveVal;
      }
      else if (character.dx  == moveVal) {
         character.dx /= moveVal;
      }
      else if (character.dy == moveVal)  {
         character.dy /= moveVal;
      }
   }
   dir = 1;
   
   /*Update character image*/
   character.image = (gameImage.loadedImg["Fire"]);
   
   /*Update the character's Path*/
   backgroundImg.strokeStyle = "red";
   backgroundImg.lineWidth = character.height;
}

/*Event when the "r" is pressed*/
function rKeyEvent() {
   /*Determine if it's the player's turn*/
   if (backgroundImg.gameRef.turn == "character" && backgroundImg.gameRef.action == "waitRoll") {
      /*Roll the dice*/
      backgroundImg.gameRef.move = genNumRange(1, 6);
      backgroundImg.gameRef.action = "rollDie";
   }
   //console.log("player = "  + backgroundImg.gameRef.turn + " " + backgroundImg.gameRef.move);
}

/*Return the colour of the character*/
function characterImgColour() {
   if (character.image == gameImage.loadedImg["Fire"]) {
      return "red";
   }
   else if (character.image == gameImage.loadedImg["Lightning"]) {
      return "yellow";
   }
   else if (character.image == gameImage.loadedImg["Water"]) {
      return "blue";
   }
   else if (character.image == gameImage.loadedImg["enemy"]) {
      return "black";
   }
}

/*Return the appropriate line width based on the character colour*/
function characterImgLineWidth(colour) {
   if (colour == "red") {
      return character.height;
   }
   else {
      return character.height/2;
   }
}

/*Save the new turning point of the path*/
function updateCPath() {    
    /*Determine the character's colour*/
    var color;
    color = characterImgColour();
    
    /*Determine the line width based on the colour*/
    var lineWidth;
    lineWidth = characterImgLineWidth(color);
    
    /*Save the point*/
    if (lastKey == 38 || lastKey == 40) { //up or down key - for horizontal movement
       pathC[pathCCount] = {
            x: character.oldPosX + Math.floor(character.width/2), 
            y: character.oldPosY  + Math.floor(character.width/2),
            oX: character.oldPosX, 
            oY: character.oldPosY,
            rbg: color,
            width: lineWidth
       };
    }
    else if (lastKey == 37 || lastKey == 39) {  //left or right key - vertical movement
      pathC[pathCCount] = {
            x: character.oldPosX + Math.floor(character.height/2), 
            y: character.oldPosY + Math.floor(character.height/2),
            oX: character.oldPosX, 
            oY: character.oldPosY,
            rbg: color,
            width: lineWidth
       };
    }
    pathCCount++;
}

/*Return updated x value so the path is centered to the character*/
function centPathX(x) {    
   /*Determine if the character is moving vertically*/
   if (lastKey == 38 || lastKey == 40) {
      x = x + Math.floor(character.width/2);
   }

   return x;
}

/*Return updated y value so the path is centered to the character*/
function centPathY(y) {
   /*Determine if the character is moving horizontally*/
   if (lastKey == 37 || lastKey == 39) {
      y = y + Math.floor(character.height/2);
   }  
   
   return y;
}