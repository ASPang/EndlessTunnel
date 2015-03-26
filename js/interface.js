
/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 4 - Element Race
 * Date: 2015/02/08
 * Modified: 2015/02/14
 * 
 * Filename: interface.js
 * 
 * Description:
 * This files contains the function that displays different screens of the game.
 * 
 */

 /*Display the Menu Intro Screen*/
 imageLib.prototype.introScreen = function() {
    /*Clear the screen*/
    this.clearCanvas();
    
    /*Add the background*/
    this.canvasCtx.drawImage(this.introImg.image, this.introImg.x, this.introImg.y, this.introImg.width, this.introImg.height);
    
    /*Display the title*/
    this.showTitle();
    
    /*Display buttons*/
    this.showStartButton();    
    //this.showInstructButton();
    
 };
 
 /*Set up the intro menu background*/
 imageLib.prototype.introBackground = function(image, x, y, width, height, repeat) {
   /*Determine if repeat is null*/
   if (repeat == "null" || repeat == null) {
      repeat = "no";
   }
   
   /*Save information about the background image*/
   this.introImg = {
      image: image,
      x: x, 
      y: y,
      width: width,
      height: height,
      repeat: repeat
   }
 }
 
 /*Set up the Logo*/
  imageLib.prototype.setTitleLogo = function(image, x, y, width, height) {  
   /*Save information about the background image*/
   this.introTitle = {
      image: image,
      x: x, 
      y: y,
      width: width,
      height: height,
      repeat: repeat
   }
 }
 
  /*Draw the start button on the canvas*/
 imageLib.prototype.showTitle = function() {
   var newStyle = this.introTitle.font;
   
   this.canvasCtx.font = newStyle;
   this.canvasCtx.fillText(this.introTitle.text, this.introTitle.x, this.introTitle.y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = this.fontDefault;
 };
 
 /*Set up the title with style being passed in as a single string*/
 imageLib.prototype.setTitle = function(text, xPos, yPos, style) {  
   /*Save information about the background image*/
   this.introTitle = {
      text: text,
      x: xPos, 
      y: yPos,
      font: style
   }
 }

/*Set up the title*/ 
imageLib.prototype.setTitle = function(text, xPos, yPos, fontSize, fontWeight, fontStyle) {  
   var style = fontSize + " " + fontWeight + " " + fontStyle;
   
   /*Save information about the background image*/
   this.introTitle = {
      text: text,
      x: xPos, 
      y: yPos,
      font: style,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontStyle: fontStyle
   }
 }
 
 /*Set up the start game button*/
 /*
  * NOTE: need to add defense programming in case any of the parameter is null then it should be the default option
  */
 imageLib.prototype.setStartButton = function(text, xPos, yPos, style) {
   var numButtons = this.button.length;
   var fontStyle = [], width, height;
   
   /*Parse the style string*/
   fontStyle = this.parseFontStyle(style);
   //console.log(fontStyle[0]+ " "  + fontStyle[1]+ " "  + fontStyle[2]); //TESTING!!!!!!!!!!!!!
   
   /*Determine the width and height of the button*/
   this.canvasCtx.font = style; //Temporary apply the style on the canvas
   width = Math.floor(this.canvasCtx.measureText(text).width);
   height =  fontStyle[1].substring(0,fontStyle[1].length-2); //substring(startPosition,length)
   
   /*console.log("wdith " + width + " height " + height); //TESTING!!!!!!!!!!!!!
   console.log(xPos + " " + yPos);*/
   
   /*Save the button properties*/   
   this.button["startButton"] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style,
      fontSize: fontStyle[0],
      fontWeight: fontStyle[1],
      fontStyle: fontStyle[2],
      width: width,
      height: height
   }
   
   /*Save the button name*/
   this.buttonName.push("startButton");
 };
 
 /*Draw the start button on the canvas*/
 imageLib.prototype.showStartButton = function() {
   var oldStyle = this.canvasCtx.font;
   var newStyle = this.button["startButton"].font;
   
   this.canvasCtx.font = newStyle;
   this.canvasCtx.fillText(this.button["startButton"].text, this.button["startButton"].x, this.button["startButton"].y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = oldStyle;
 };
 
 /*Set up the instructions button*/
 /*
  * NOTE: need to add defense programming in case any of the parameter is null then it should be the default option
  */
 imageLib.prototype.setInstructButton = function(text, xPos, yPos, style) {
   var numButtons = this.button.length;
   
   /*Save the button properties*/   
   this.button["startButton"] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style
   }
 };
 
 
 /*Set up the gameOverScreen*/
 imageLib.prototype.gameOverScreen = function() {
   /*Clear the screen*/
    //this.clearCanvas();
    
    /*Add the background*/
    //this.canvasCtx.drawImage(this.introImg.image, this.introImg.x, this.introImg.y, this.introImg.width, this.introImg.height);
    
    /*Display the title*/
    //this.canvasCtx.drawImage(this.introTitle.image, this.introTitle.x, this.introTitle.y, this.introImg.width, this.introImg.height);
    //this.showTitle();
    this.showGameOverMsg();
    
    /*Display buttons*/
    //this.showNewGameButton();    
    //this.showInstructButton();
    this.showButton("newGame");
 };
 
 /*Display the Game Over Messages*/
 imageLib.prototype.showGameOverMsg = function() {
   var i;   //Loop counter
   var numMsg = this.gameOverMessage.length;   //Get the number of messages
   
   for(i = 0; i < numMsg; i++) {
      this.displayText(this.gameOverMessage[i]);
   }
 };
 
 imageLib.prototype.displayText = function(msg) {
   this.canvasCtx.font = msg.font;
   this.canvasCtx.fillStyle = msg.colour;
   this.canvasCtx.fillText(msg.text, msg.x, msg.y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = this.fontDefault;
 };
 
 /*Set up Game Over message*/
 imageLib.prototype.setGameOverMsg = function(text, xPos, yPos, style, colour) {  
   var numMsg = this.gameOverMessage.length;   //Get the next spot in the array
   
   /*Save information about the background image*/
   this.gameOverMessage[numMsg] = {
      text: text,
      x: xPos, 
      y: yPos,
      font: style,
      colour: colour
   }
 };
 
 /*Draw the button on the canvas*/
 imageLib.prototype.showButton = function(buttonName) {
   //var newStyle = this.button[buttonName].font;
   
   this.canvasCtx.fillStyle = this.button[buttonName].defaultClr;
   this.canvasCtx.font = this.button[buttonName].font;
   this.canvasCtx.fillText(this.button[buttonName].text, this.button[buttonName].x, this.button[buttonName].y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = this.fontDefault;
 };
 
 /*Draw the hover version of the button canvas*/
 imageLib.prototype.showHoverButton = function(buttonName) {
   this.canvasCtx.fillStyle = this.button[buttonName].hoverClr;
   this.canvasCtx.font = this.button[buttonName].font;
   this.canvasCtx.fillText(this.button[buttonName].text, this.button[buttonName].x, this.button[buttonName].y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = this.fontDefault;
 };
 
 /*Create the "New Game" button*/
 imageLib.prototype.setNewGameButton = function(text, xPos, yPos, style, colour, hover) {
   var buttonName = "newGame";
   var numButtons = this.button.length;
   var fontStyle = [], width, height;
   
   /*Parse the style string*/
   fontStyle = this.parseFontStyle(style);
   
   /*Determine the width and height of the button*/
   this.canvasCtx.font = style; //Temporary apply the style on the canvas
   width = Math.floor(this.canvasCtx.measureText(text).width);
   height =  fontStyle[1].substring(0,fontStyle[1].length-2); //substring(startPosition,length)
   
   /*Save the button properties*/   
   this.button[buttonName] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style,
      fontSize: fontStyle[0],
      fontWeight: fontStyle[1],
      fontStyle: fontStyle[2],
      width: width,
      height: height,
      defaultClr: colour,
      hoverClr: hover
   };
   
   /*Save the button name*/
   this.buttonName.push(buttonName);
 };
 
 imageLib.prototype.instructionScreen = function() {
 };
 
 imageLib.prototype.creditScreen = function() {
 };
 
 imageLib.prototype.settingScreen = function() {
 };
 
 /*Parses the style string into the font weight, size, and type*/
 imageLib.prototype.parseFontStyle = function(style) {
   var fontStyle = [];
   
   fontStyle = style.split(' ');
   
   return fontStyle;
 };
 
/*Create New Button*/
imageLib.prototype.createNewButton = function(buttonName, text, xPos, yPos, style, colour, hover) {
   //var numButtons = this.button.length;
   var fontStyle = [], width, height;
   
   /*Parse the style string*/
   fontStyle = this.parseFontStyle(style);
   
   /*Determine the width and height of the button*/
   this.canvasCtx.font = style; //Temporary apply the style on the canvas
   width = Math.floor(this.canvasCtx.measureText(text).width);
   height =  fontStyle[1].substring(0,fontStyle[1].length-2); //substring(startPosition,length)
   
   /*Save the button properties*/   
   this.button[buttonName] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style,
      fontSize: fontStyle[0],
      fontWeight: fontStyle[1],
      fontStyle: fontStyle[2],
      width: width,
      height: height,
      defaultClr: colour,
      hoverClr: hover
   };
   
   /*Save the button name*/
   this.buttonName.push(buttonName);
 };
 
 
 
 