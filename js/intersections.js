/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: intersection.js
 * 
 * Description:
 * This files contains the function that determine if any objects in 
 * the game touches.
 * 
 */

// /*Determine if the character intersects any of the lines*/ 
// function characterHitLine() {
   // var i = 0, numPaths;
   // var pX1, pY1, pX2, pY2; //points
    
    // numPaths = pathCCount; 
    // //console.log(character.xPos + " " + character.yPos);
    // //console.log(character.xPos);
    
    // if (numPaths > 0) {
       // /*Go through all the paths*/
       // for (i = 0; i < numPaths - 1; i++) {
           // pX1 = pathC[i].oX;
           // pY1 = pathC[i].oY;
           
           // pX2 = pathC[i+1].oX;
           // pY2 = pathC[i+1].oY;
           
           // /*if (i == 0) {
               // //console.log(pY2 - pY1 + " " + character.yPos);
               // console.log(character.yPos + " " + pY1 + " " + pY2);
            // }*/
           
           // /*Determine if the character's current location hits the line*/
           // //if (pX2 - pX1 == 0 && ((character.xPos >= pX1 && character.xPos <= pX1 + 1) || (character.xPos >= pX2 && character.xPos <= pX2 ))) { //Vertical line with left and right key
           // //if (pX2 - pX1 == 0 && (character.xPos == pX1 || character.xPos + 1 == pX1 || character.xPos == pX2)) {
           // //if (pX2 - pX1 == 0 && ((character.xPos >= pX1 && character.xPos <= pX1 + 1) || (character.xPos >= pX2 && character.xPos <= pX2 ))) { //Vertical line with left and right key
           // if (pX2 - pX1 == 0 && character.xPos == pX1 && character.xPos == pX2) { //Vertical line with left and right key
              // if (pY1 > pY2) {
                 // if (character.yPos >= pY2 && character.yPos <= pY1) {
                     // endGameFlag = true;
                 // }
              // }
              // else if (pY1 < pY2) {
                 // if (character.yPos >= pY1 && character.yPos <= pY2) {
                     // endGameFlag = true;
                 // }
              // }
           // }
           // //else if (pY2 - pY1 == 0 && character.yPos == pY1 || (character.yPos + character.height >= pY1 && character.yPos <= pY1)) { //Horizontal line with up and down key
           // //else if (pY2 - pY1 == 0 && (character.yPos == pY1 || character.yPos - 1 == pY1 || character.yPos == pY2)) { //Horizontal line with up and down key
           // else if (pY2 - pY1 == 0 && character.yPos == pY1 && character.yPos == pY2) { //Horizontal line with up and down key
           // //else if (pY2 - pY1 == 0 && character.yPos == pY1 && character.yPos == pY2) { //Horizontal line with up and down key
               // //console.log("HERE - Y " + character.xPos + "  " + pX1 + " " + pX2);
               // if (pX1 > pX2) {
                    // if (character.xPos >= pX2 && character.xPos <= pX1) {
                        // endGameFlag = true;
                    // }
                 // }
                 // else if (pX1 < pX2) {
                    // if (character.xPos >= pX1 && character.xPos <= pX2) {
                        // endGameFlag = true;
                    // }
                 // }
              
           // }            
       // }
       
    
    // /*
    // if (numPaths > 0) {
       // for (i = 0; i < numPaths - 1; i++) {
           // pX1 = pathC[i].x;
           // pY1 = pathC[i].y;
           
           // pX2 = pathC[i+1].x;
           // pY2 = pathC[i+1].y;
           
           // if (pX2 - pX1 == 0 && character.xPos == pX1 && character.xPos == pX2 && lastKey == 37) { //Vertical line and left key
            // console.log("HERE - X");
              // if (pY1 > pY2) {
                 // if (character.yPos >= pY2 && character.yPos <= pY1) {
                     // endGameFlag = true;
                 // }
              // }
              // else if (pY1 < pY2) {
                 // if (character.yPos >= pY1 && character.yPos <= pY2) {
                     // endGameFlag = true;
                 // }
              // }
           // }
           // else if (pX2 - pX1 == 0 && character.xPos == pX1 && character.xPos == pX2 && lastKey == 39) { //Vertical line and right key
            // console.log("HERE - X");
              // if (pY1 > pY2) {
                 // if (character.yPos >= pY2 && character.yPos <= pY1) {
                     // endGameFlag = true;
                 // }
              // }
              // else if (pY1 < pY2) {
                 // if (character.yPos >= pY1 && character.yPos <= pY2) {
                     // endGameFlag = true;
                 // }
              // }
           // }
           // else if (pY2 - pY1 == 0 && character.yPos == pY1 && character.yPos == pY2 && (lastKey == 38 || lastKey == 40)) { //Horizontal line
               // console.log("HERE - Y");
               // if (pX1 > pX2) {
                    // if (character.xPos >= pX2 && character.xPos <= pX1) {
                        // endGameFlag = true;
                    // }
                 // }
                 // else if (pX1 < pX2) {
                    // if (character.xPos >= pX1 && character.xPos <= pX2) {
                        // endGameFlag = true;
                    // }
                 // }
              
           // }
           // /*Determine if the character's current location hits the line
                      
       // }*/
       
       // /*Draw the current path getting built*/
       // pX1 = pathC[numPaths - 1].x;
       // pY1 = pathC[numPaths - 1].y;

       // pX2 = centPathX(character.xPos);
       // pY2 = centPathY(character.yPos);
    // }
// }

/*Go through every enemy to determine if they have hit a line*/
function enemyHitLine() {
   var i; //loop counter
   var hit; //flag for when the enemy hits another path
   
   /*Go through all enemies*/
   for (i = 0; i < enemy.length; i++) {
      /*Determine if the enemy has hit a player's path*/
      hit = hitLine(enemy[i], character, pathC, pathCCount, 0);
      
      // if (hit == true) {
      // console.log("HERE");
         // findNewDir(enemy[i]);
      // }
      
      /*Determine if the enemy has hit its own path*/
      hit = hitLine(enemy[i], character, pathE, pathECount, 1);
      
      // if (hit == true) {
         // findNewDir(enemy[i]);
      // }
   }
}

/*Determine if the enemy intersects any of the lines*/ 
function hitLine(chara , enemy, path, pathCount, charPath) {
   var i = 0, numPaths;
   var pX1, pY1, pX2, pY2; //points
    
    numPaths = pathCount; 
    
    if (numPaths > 0) {
       /*Go through all the paths*/
       for (i = 0; i < numPaths; i++) {
         if (i < numPaths - 1) {
           pX1 = path[i].oX;
           pY1 = path[i].oY;
           
           pX2 = path[i+1].oX;
           pY2 = path[i+1].oY;
         }
         else if (i <= numPaths - 1 && charPath == 0) {
           pX1 = path[numPaths - 1].x;
           pY1 = path[numPaths - 1].y;

           pX2 = centPathX(enemy.xPos);
           pY2 = centPathY(enemy.yPos);
         }
         else {
            break;
         }
           
           if (pX2 - pX1 == 0) { //Vertical line with character moving left or right direction
              if (pY1 > pY2) {
                 pX1 += path[i].width/2;
                 pX2 -= path[i].width/2;
                 if ((pX1 > chara.xPos) && (pX2 < (chara.xPos + chara.width)) && (pY1 > chara.yPos) && (pY2 < (chara.yPos + chara.height))){
                     endGameFlag = true;
                     console.log("gAME");
                 }
              }
              else if (pY1 < pY2) {
                 pX1 -= path[i].width/2;
                 pX2 += path[i].width/2;
                 if ((pX2 > chara.xPos) && (pX1 < (chara.xPos + chara.width)) && (pY2 > chara.yPos) && (pY1 < (chara.yPos + chara.height))){
                     endGameFlag = true;
                 }
              }
           }
           else if (pY2 - pY1 == 0) { //Horizontal line with character moving up or down direction
               if (pX1 > pX2) {
                    pY1 += path[i].width/2;
                    pY2 -= path[i].width/2;
                    if ((pX1 > chara.xPos) && (pX2 < (chara.xPos + chara.width)) && (pY1 > chara.yPos) && (pY2 < (chara.yPos + chara.height))){
                    console.log("GAME " + pX1 + " " + pX2 + " " +  chara.dx + " " + chara.xPos);
                        endGameFlag = true;
                    }
                 }
                 else if (pX1 < pX2) {
                    pY1 -= path[i].width/2;
                    pY2 += path[i].width/2;
                    if ((pX2 > chara.xPos) && (pX1 < (chara.xPos + chara.width)) && (pY2 > chara.yPos) && (pY1 < (chara.yPos + chara.height))){
                        endGameFlag = true;
                    }
                 }
           }            
       }
    }
    
    /*Determine if the end game flag was set*/
    if (endGameFlag == true) {
      console.log(chara.xPos + " " +  chara.yPos + " " + pX1+ " " + pY1+ " " + pX2+ " " + pY2 );
      return true;
    }
    
    return false;
}


// function hitLine2(character, path, pathCount) {
   // var i = 0, numPaths;
   // var pX1, pY1, pX2, pY2; //points
    
    // numPaths = pathCount; 
    
    // if (numPaths > 0) {
       // /*Go through all the paths*/
       // for (i = 0; i < numPaths - 1; i++) {
           // pX1 = path[i].oX;
           // pY1 = path[i].oY;
           
           // pX2 = path[i+1].oX;
           // pY2 = path[i+1].oY;
           
           // if (pX2 - pX1 == 0 && character.xPos == pX1 && character.xPos == pX2) { //Vertical line with left and right key
              // if (pY1 > pY2) {
                 // if (character.yPos >= pY2 && character.yPos <= pY1) {
                     // endGameFlag = true;
                 // }
              // }
              // else if (pY1 < pY2) {
                 // if (character.yPos >= pY1 && character.yPos <= pY2) {
                     // endGameFlag = true;
                 // }
              // }
           // }
           // else if (pY2 - pY1 == 0 && character.yPos == pY1 && character.yPos == pY2) { //Horizontal line with up and down key
               // if (pX1 > pX2) {
                    // if (character.xPos >= pX2 && character.xPos <= pX1) {
                        // endGameFlag = true;
                    // }
                 // }
                 // else if (pX1 < pX2) {
                    // if (character.xPos >= pX1 && character.xPos <= pX2) {
                        // endGameFlag = true;
                    // }
                 // }
              
           // }            
       // }
       
       // /*Draw the current path getting built*/
       // pX1 = path[numPaths - 1].x;
       // pY1 = path[numPaths - 1].y;

       // pX2 = centPathX(character.xPos);
       // pY2 = centPathY(character.yPos);
    // }
// }

/*Determine if the projectile collided with a wall*/
function checkObstacles() {
    var i = 0, numPro = 0;
    var w = 0, numPaths = 0;
    var e = 0, numEnemy = 0;
    
    numPro = projectile.length;
    numPaths = path.length;
    numEnemy = enemy.length;
    //console.log(i + " " + numPro);
    for (i = 0; i < numPro; i++) {
        //console.log(i + " " + numPro);
        /*Determine if the project collided with a wall*/
        for (w = 0; w < numPaths; w++) {
            projectile[i].obstaclebounce(path[w]);
        }
        
        /*Determine if the projectile collided with an enemy*/
        for (e = 0; e < numEnemy; e++) {
            enemyHit(enemy[e], projectile[i]);
        }
        
        var end = projectile[i].canvasWallCollision();
        
        /*Determine if the projectile hit a wall*/
        if (end == "null") {
            /*Draw projectile*/
            projectile[i].drawProjectile();
        }
        else if (end == "bottom") {
            projectile[i].dy *= -1;
            projectile[i].drawProjectile();
        }
        else if (i >= 0 && numPro > 0){
            /*Remove projectile from the array*/
            projectile.splice(i,1); //Remove one item from the ith position
            numPro -= 1;
            i--;
        }
        else if (i < 0 && numPro <= 0) {
            break;
        }
    }
}

/*Determine if the enemy has been hit and regenerate it*/
function enemyHit(enemy, projectile) {
    touch = enemy.intersect(projectile);
        
    if (touch == true) {
        /*Generate new enemy in the game world*/
        points += 1;
        genNewEnemy(enemy);
        
        return true;
    }
    
    return false;
}

/*Determine if the enemy got hit by a projectile*/
function characterHit() {
    var i = 0, numEnemies = 0;
    var touch;  //loop counter
    
    /*Determine if the projectile collided with the character*/
    numEnemies = enemy.length;
    
    for (i = 0; i < numEnemies; i++) {
        touch = character.intersect(enemy[i]);
    
        /*Determine if the enemy touched the character*/
        if (touch == true ) {
            endGameFlag = true; 
            enemy[i].dx = 0;
            enemy[i].dy = 0;
        } 
    }     
}

function checkIntersection2() {
    var i, touch;  //loop counter
    
    /*Go through all the enemies to see if they intersect*/
    for (i = 0; i< aliens.length; i++) {        
        touch = character.intersect(aliens[i]);
        
        if (touch == true && candyTime() <= 0) {
            endGameFlag = true; 
        }
        else if (touch == true && candyTime() > 0) {
            newAlien(aliens[i]);
            points += 1;
        }
    }
}

function foundCandy() {
    touch = character.intersect(candy);
        
    if (touch == true) {
        /*Generate new candy in the game world*/
        genNewCandy();
        points += 1;
        powerUp = new Date().getTime();
        
        /*Add playtime*/
        //addTime();
    }
    else if (candy.xPos < -50) {
        /*Generate new candy in the game world*/
        genNewCandy();
    }
}

/*Regenerate Alien*/
function newAlien(alien) {
    alien.xPos =  alien.canvas.width + genNumRange(100, 500); 
    alien.yPos = genNumRange(character.jumpHeight, alien.canvas.height-alien.height); 
}

/*Regenerate Candy*/
function genNewCandy() {
    candy.xPos = candy.canvas.width + genNumRange(200, 800); 
    candy.yPos = genNumRange(character.jumpHeight, candy.canvas.height-candy.height); 
}

/*Regenerate Enemy*/
function genNewEnemy(enemy) {
    enemy.yPos = enemy.canvas.height - genNumRange(200, 500); 
    enemy.xPos = genNumRange(25, enemy.canvas.width-enemy.width); 
}