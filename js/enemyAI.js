/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 4 - Element Race
 * Date: 2015/02/08
 * Modified: 2015/02/14
 * 
 * Filename: enemyAI.js
 * 
 * Description:
 * This files contains the functions for the enemy AI and its decision making.
 * 
 */
 
/*Determine which direction the enemy should be going*/
function findNewDir(enemy) {
   /*Save original information*/
   var oriDX = enemy.dx;
   var oriDY = enemy.dy;
   var oriXPos = enemy.xPos;
   var oriYPos = enemy.yPos;
   
   /*Get the enemy direction*/
   var dx = enemy.dx;
   var dy = enemy.dy;
   var xPos = enemy.xPos;
   var yPos = enemy.yPos;
   
   var hit, foundNew;
   var colour = "black";
   var lineWidth = Math.floor(enemy.height/2);
   
   /*Reset game over flag*/
   endGameFlag = false;
   
   /*Determine the direction the enemy is moving*/
   if (dy == 0) { //left or right
      /*Move down*/
      enemy.yPos += enemy.height + enemy.height/2;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);
   //console.log("HERE2 " + hit);
      if (hit == false) {
         /*Update the new direction*/
         enemy.dx = 0;
         enemy.dy = 1;
         console.log("HERE-1");
         foundNew = true;
      } 
      
   console.log("HERE-2");
      if (foundNew == false) {
         /*Reset position to where it was originally*/
         enemy.yPos = oriYPos;
         console.log("HERE - 3");
         /*Move Up*/
         enemy.yPos -= enemy.height + enemy.height/2;
         hit = hitLine(enemy, character, pathC, pathCCount, 0);
         
         if (hit == false) {
            /*Update the new direction*/
            enemy.dx = 0;
            enemy.dy = -1;
            
            foundNew = true;
         }
      }      
   }
   else if (dx == 0) {  //up or down
      /*Move Right*/
      enemy.xPos += enemy.width + enemy.width/2;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);

      if (hit == false) {
         /*Update the new direction*/
         enemy.dx = 1;
         enemy.dy = 0;
         foundNew = true;
      } 
      
      if (foundNew == false) {
         /*Reset position to where it was originally*/
         enemy.xPos = oriXPos;
         
         /*Move Left*/
         enemy.xPos -= enemy.width + enemy.width/2;
         hit = hitLine(enemy, character, pathC, pathCCount, 0);
         
         if (hit == false) {
            /*Update the new direction*/
            enemy.dx = -1;
            enemy.dy = 0;
            
            foundNew = true;
         }
      }  
   }
      
   if (hit == false && foundNew == true) {
      pathE[pathECount] = {
         x: oriXPos + Math.floor(enemy.height/2), 
         y: oriYPos + Math.floor(enemy.height/2),
         oX: oriXPos, 
         oY: oriYPos,
         rbg: colour,
         width: lineWidth
      };
      pathECount++;
   }
   else {
      /*Revert to original position*/
      enemy.xPos = oriXPos;
      enemy.yPos = oriYPos;
   }
}

function enemyPredictPath(enemy) {   
   /*Save original information*/
   var oriDX = enemy.dx;
   var oriDY = enemy.dy;
   var oriXPos = enemy.xPos;
   var oriYPos = enemy.yPos;
   
   /*Get the enemy direction*/
   var dx = enemy.dx + 4;
   var dy = enemy.dy + 4;
   var xPos = enemy.xPos;
   var yPos = enemy.yPos;
    
    var hit;
    
    //console.log("HERE222 - 1 " + hit);
   /*Determine the direction the enemy is moving*/
   if (oriDY == 0 && oriDX > 0) { //Moving Right
      /*Move Right*/
      enemy.xPos += dx;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);
      
      enemy.xPos = oriXPos;  //Revert movement direction
      //console.log("HERE222 - 2" + hit);
      if (hit == true) {         
         /*Update the new direction*/
         findNewDir(enemy);
      } 
   }
   else if (oriDY == 0 && oriDX < 0) { //Moving left
      /*Move Left*/
      enemy.xPos -= dx;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);
      enemy.xPos = oriXPos;  //Revert movement direction
      
      //console.log("HERE2233 " + hit);
      if (hit == true) {
         /*Update the new direction*/
         findNewDir(enemy);
      } 
   }
   else if (oriDY > 0 && oriDX == 0) { //Moving Down
      /*Move Down*/
      enemy.yPos += dy;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);
      enemy.yPos = oriYPos;  //Revert movement direction
      //console.log("HERE22444 " + hit);
      if (hit == true) {
         /*Update the new direction*/
         findNewDir(enemy);
      } 
   }
   else if (oriDY < 0 && oriDX == 0) { //Moving Up
      /*Move Up*/
      enemy.xPos -= dy;
      hit = hitLine(enemy, character, pathC, pathCCount, 0);
      enemy.yPos = oriYPos;  //Revert movement direction
      //console.log("HERE22555 " + hit);
      if (hit == true) {
         /*Update the new direction*/
         findNewDir(enemy);
      } 
   }
}

function enemyPredictWallColl(enemy) {
   //var spaceBuff = 4;
        
   /*Save original information*/
   var oriDX = enemy.dx;
   var oriDY = enemy.dy;
   var oriXPos = enemy.xPos;
   var oriYPos = enemy.yPos;
   
   /*Get the enemy direction*/
   var dx = enemy.dx + 4;
   var dy = enemy.dy + 4;
   var xPos = enemy.xPos;
   var yPos = enemy.yPos;

   var colour = "black";
   var lineWidth = Math.floor(enemy.height/2);
   
   var hit;

   /*Determine the direction the enemy is moving*/
   if (oriDY == 0 && oriDX > 0) { //Moving Right
      /*Move Right*/
      enemy.xPos += dx;

      if (enemy.canvasWallCollision() != "null") {         
         //enemy.xPos = oriXPos;  //Revert movement direction
      
         /*Update the new direction*/
         enemyAvoidWall(enemy);
      } 
   }
   else if (oriDY == 0 && oriDX < 0) { //Moving left
      /*Move Left*/
      enemy.xPos -= dx;

      if (enemy.canvasWallCollision() != null) {
         //enemy.xPos = oriXPos;  //Revert movement direction      
         
         /*Update the new direction*/
         enemyAvoidWall(enemy);
      } 
   }
   else if (oriDY > 0 && oriDX == 0) { //Moving Down
      /*Move Down*/
      enemy.yPos += dy;
      
      if (enemy.canvasWallCollision() != null) {
         //enemy.yPos = oriYPos;  //Revert movement direction
         
         /*Update the new direction*/
         enemyAvoidWall(enemy);
      } 
   }
   else if (oriDY < 0 && oriDX == 0) { //Moving Up
      /*Move Up*/
      enemy.xPos -= dy;
      
      if (enemy.canvasWallCollision() != null) {
         //enemy.yPos = oriYPos;  //Revert movement direction
         
         /*Update the new direction*/
         enemyAvoidWall(enemy);
      } 
   }
   
   if (enemy.canvasWallCollision() != null) {
      pathE[pathECount] = {
            x: oriXPos + Math.floor(enemy.height/2), 
            y: oriYPos + Math.floor(enemy.height/2),
            oX: oriXPos, 
            oY: oriYPos,
            rbg: colour,
            width: lineWidth
         };
         pathECount++;
   }
   else {
      /*Revert movement direction*/
      enemy.xPos = oriXPos;  
      enemy.yPos = oriYPos;  
   }
}
        
function enemyAvoidWall(enemy) {
   var hit = false;
   var choice = genNumRange(1, 2);
   console.log("avoid the walls " + enemy.canvasWallCollision());
   if (enemy.canvasWallCollision() == "right" || enemy.canvasWallCollision() == "left") { //Enemy going to collide to the left or right side of the wall
         /*Randomly choose which direction to go*/
         if (choice == 1) {   //Move up
            enemy.dx = 0;
            enemy.dy = -1;
         }
         else {   //Move down
            enemy.dx = 0;
            enemy.dy = 1;
         }
   }
   else if (enemy.canvasWallCollision() == "bottom" || enemy.canvasWallCollision() == "top") { //Enemy going to collide to the top or bottom side of the wall
         if (choice == 1) {   //Move right
            enemy.dx = 1;
            enemy.dy = 0;
         }
         else {   //Move left
            enemy.dx = -1;
            enemy.dy = 0;
         }
         console.log("HERE at the bottom");
   }
}        

/***BOARD GAME***/
/*Card Selection*/
function wolfSelectChoice() {
   var choice = genNumRange(0, 1);
   
   storyWolf += choice;
   
   /*Update button selection*/
   if (choice == 1) {
      backgroundImg.button["yesButton"].defaultClr = "blue";
   }
   else {
      backgroundImg.button["noButton"].defaultClr = "blue";
   }
}