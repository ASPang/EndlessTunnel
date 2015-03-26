/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 4 - Element Race
 * Date: 2015/02/08
 * Modified: 2015/02/14
 * 
 * Filename: mouse.js
 * 
 * Description:
 * This files contains the function for the mouse.
 * 
 */

/*Mouse Listeners*/
//window.addEventListener("mousemove", on_mousemove, false);   //Modify text when mouse is hovered over
//window.addEventListener("click", mouseClick, false);

function mouseClick(e) {
   var button;
   
   button = mouseLoc(e);
   
   /*Determine the action for the appropriate button*/
   if (button == "startButton" || button == "newGame") { //Start game button
      /*Start the game*/
      startTimer();
      
      /*Update the game screen flag*/
      screenDisplayed = "gameScreen";
   }
   else if (button == "yesButton" && screenDisplayed == "gameScreen") {
      if (backgroundImg.gameRef.turn == "character") {
         storyChar += 1;
      }
      backgroundImg.gameRef.action = "end";
      console.log("clicked - yes");
   }
   else if (button == "noButton" && screenDisplayed == "gameScreen") {
      if (backgroundImg.gameRef.turn == "character") {
         storyChar += 0;
      }
      backgroundImg.gameRef.action = "end";
      console.log("clicked - no");
   }
}
 
/*Determine the current location of the mouse*/
function mouseLoc(e) {
   var x, y;   //Mouse coordinates
   var bX, bY, bHeight, bWidth;  //button variables
   var numButton, i, buttonName, selected = "null"; //Button loop
   
   /*Get the mouse coordinate*/
   x = e.layerX;
   y = e.layerY;
   
   /*Update values to be relative to the canvas*/
   x -= backgroundImg.canvas.offsetLeft;
   y -= backgroundImg.canvas.offsetTop;
  
  //console.log(backgroundImg.buttonName.length + backgroundImg.buttonName[backgroundImg.buttonName.length - 1]);
  /*Determine a button is selected*/
  numButton = backgroundImg.buttonName.length;
  
   for (i = 0; i < numButton; i++) {  
     buttonName = backgroundImg.button[backgroundImg.buttonName[i]]; //backgroundImg.buttonName[i];
     bX = buttonName.x;
     bY = buttonName.y;
     bWidth = buttonName.width;
     bHeight = buttonName.height;
     
     //console.log(x + " " + y + " " + bX + " " + bY);  //TESTING!!!!!!!!!!!
     /*Determine if the button is selected*/
     if(x >= bX  && x <= (bX + bWidth) && y <= bY && y >= (bY-bHeight)){
         //document.body.style.cursor = "pointer";
         console.log("HERE");
         if (screenDisplayed == "intro") {
            backgroundImg.canvasCtx.fillStyle = "blue";
            backgroundImg.showStartButton(); 
            selected = backgroundImg.buttonName[i];
         }
         else if (screenDisplayed == "gameOver") {
            //backgroundImg.canvasCtx.fillStyle = "blue";
            backgroundImg.showHoverButton("newGame"); 
            selected = backgroundImg.buttonName[i];
         }
         else if (screenDisplayed == "gameScreen" && backgroundImg.buttonName[i] != "startButton" && backgroundImg.buttonName[i] != "newGame") {
            //console.log(backgroundImg.buttonName[i]);
            backgroundImg.showHoverButton(backgroundImg.buttonName[i]); 
            selected = backgroundImg.buttonName[i];
         }
     }
     else{
         //document.body.style.cursor = "";
         backgroundImg.canvasCtx.fillStyle = "black";
         //backgroundImg.showStartButton(); 
         if (screenDisplayed == "intro") {
            backgroundImg.introScreen();
         }
         else if (screenDisplayed == "gameOver") {
            backgroundImg.gameOverScreen();
         }
     }
  }
  /*Reset canvas font to default*/
   backgroundImg.canvasCtx.font = backgroundImg.fontDefault;
   
   /*Return the button that was hovered over*/
   return selected;
}
