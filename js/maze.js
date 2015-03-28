/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 6 - Tunnels
 * Date: 2015/03/16
 * 
 * Filename: maze.js
 * 
 * Description:
 * This files contains the function to generate a maze within a 1D array.
 * 
 */

/*Generate the maze given a starting and end position*/
imageLib.prototype.genMaze = function(start, end, numDoors) {
   var i = 0;  //Loop counter
   var row, doorLoc, created;
      
   /*Generate the first door*/
   doorLoc = this.genMazeDoor(start, end);
   
   /*Generate the first portal*/
   row = this.genMazePortEnd(doorLoc);
   
   /*Generate the other doors*/
   for (i = 0; i < numDoors; i++) {
      row = row * this.maze.row;
      
      /*Generate a door*/
      doorLoc = this.genMazeDoor(row, row + this.maze.col - 1);
      
      /*Generate the portal*/
      row = this.genMazePortEnd(doorLoc);
   }
   
   /*Set up the last door that'll lead to the exit*/
   row = row * this.maze.row;
   this.setExitRow(row);
   
   /*Connect the portals together*/
   created = this.linkMazeDoors();
   
   /*recreate maze if there's are hanging doors with no paths to it*/
   if(created != 1) {
      this.genMaze(start, end, numDoors);
   }
   
   /*************TESTING!!!!!!!!!!!!**************/
   var line = ""
   for (i = 0; i < 100; i++) {
      line = line + this.maze.grid [i] + ", ";
      if ((((i + 1)) % 10) == 0) {
         console.log(i + "--" + line);
         line = "";
      }
   }
   /*************TESTING!!!!!!!!!!!! - END**************/
};

/*Gerenate the door location in the maze*/
imageLib.prototype.genMazeDoor = function(start, end) {
   var doorLoc;   //Location of the door on the maze
   
   /*Generate a random number for the door */
   doorLoc = genNumRange(start, end);
   
   /*Double check that the value is within column*/
   if (doorLoc > end) {
      console.log("ERROR - Generated value greater then maze size. Regenerating new number");
      return this.genMazeDoor(start, end);
   }
   
   return doorLoc;
};

/*Generate the location of where the door will lead to*/
imageLib.prototype.genMazePortEnd = function(doorLoc) {
   var y, x;   //y is the column, and x is the row
   /*Generate a random number for where the door will lead to*/
   x = genNumRange(0, this.maze.row - 1); //Select a row
   y = genNumRange(x* this.maze.col, x * this.maze.col + this.maze.col - 1); //Select a Row
   
   /*Check that the square location isn't occupied already*/
   if (this.maze.grid[y] >= 0 || y == 0) {
      return this.genMazePortEnd(doorLoc);   //If invalid then generate a different portal location
   }
      
   /*Set up the door and its portal*/
   this.maze.grid[doorLoc] = y;
   this.maze.grid[y] = doorLoc;
   
   return x;   //Return the row
};

/*Create a floor bridge between doors*/
imageLib.prototype.linkMazeDoors = function() {
   var start = -1;   //First door in row flag
   var end = -1;  //last door in row flag
   var x, y;   //Loop counter
   var created = 1;  //Linked maze door successfully
   
   /*Go through each row*/
   for (y = 0; y < this.maze.row - 1; y++) {    //-1 since you don't want the bottom row
      /*Find first door*/
      for (x = 0; x < this.maze.col; x++) {
         if (this.maze.grid[y * this.maze.row + x] >= 0) {   //Found first door
            start = y * this.maze.row + x;
         }
      }
      
      /*Find last door in the row*/
      for (x = this.maze.col - 1; x >= 0 ; x--) {
         if (this.maze.grid[y * this.maze.row + x] >= 0) {   //Found last door
            end = y * this.maze.row + x;
         }
      }
      
      /*Join the doors*/
      if ((start >= 0 && end > 0) || (start > 0 && end >= 0)){
         created = this.createMazeDooorLink(start, end);
         
         /*Determine if doors linked successfully*/
         if (created == 0 && y != 0) {
            return created;
         }
      }
      else {
         start = -1;   //Reset first door in row flag
         end = -1;  //Reset last door in row flag
      }
   }
   
   /*Generate bottom floor*/
   for (x = ((this.maze.row - 1) * this.maze.row); x < (this.maze.row * this.maze.col - 1); x++) {
      if (this.maze.grid[x] == -1) {
         this.maze.grid[x] = -2;
      }
   }
   
   return created;   //Doors linked successfully
};

/*Set the floor tiles*/
imageLib.prototype.createMazeDooorLink = function(start, end) {
   var x, y;   //Loop counter for row and coloumns
   var temp;
   
   if (start > end) {  //Switch start and end if start value is bigger than end
      temp = start;
      start = end;
      end = temp;
   }
   
   for (x = start; x <= end; x++) {
      if (this.maze.grid[x] == -1) {
         this.maze.grid[x] = -2;
      }
      else if (start == end) {
         console.log("ERROR - only one door.");
         return 0;   //Maze not created successfully
      }      
   }
   
   return 1;   //Maze created successfully
};

/*Initialize maze grid given the row and column*/
imageLib.prototype.initializeMazeGrid = function(numXSq, numYSq) {
   var area = numXSq * numYSq;
   
   /*Initialize maze grid*/
   this.setupMazeGrid(area); 
   
   /*Save the maze width and height*/
   this.maze.row = numYSq;
   this.maze.col = numXSq;
};

/*Setup the maze grid given the total number of squares*/
imageLib.prototype.setupMazeGrid = function(numSq) {
   var i = 0;
   
   for (i = 0; i < numSq; i++) {
      this.maze.grid[i] = this.maze.wall;
   }
};

/*Generate an exit*/
imageLib.prototype.setExitRow = function(lastDoor) {
   var doorLoc;
   
   /*Generate a door in the row*/
   doorLoc = this.genMazeDoor(lastDoor, lastDoor + this.maze.col - 1);
   
   /*Generate a portal*/
   this.maze.grid[doorLoc] = 0;
   this.maze.grid[0] = doorLoc;
};

/*Generates a number given a range*/
imageLib.prototype.genNumRange = function(min, max) {
   var num, newMax;
       
   newMax = max - min + 1;
         
   num = Math.floor((Math.random() * newMax) + min);

   return num;
};

/*Create zoomed in version of the maze*/
imageLib.prototype.initMazeSpan = function(center, img, numImg) {
   var i = 0;
   var sqTotal, extra = 2;
   
   /*Initial location in the maze*/
   this.maze.curLoc = center; //Current location within the maze array
   this.curGridLoc = Math.floor(this.gridRow * this.gridCol / 2); //Character should always appear at the center of the canvas
   
   /*Save the images*/
   for(i = 0; i < numImg; i++) {
      this.maze.img[i] = img[i];
   }
   
   /*Initialize grid image array*/
   sqTotal = (this.gridRow+extra) * (this.gridCol+extra);

   for(i = 0; i < sqTotal; i++) {
      this.maze.view.push(i);
      this.maze.view[i] = {
         pos: 0,  //Maze position
         grid: 0,  //Image tile number
         img: "", //Image tile
         x: 0,    //x coordinate
         y: 0,    //y coordinate
         dx: 0,   //x direction
         dy: 0,   //y direction
         width: 0,
         height: 0,
      };
   }

   this.updateMazeSpan();
};

/*Update maze based on current pointer location in the maze grid*/
imageLib.prototype.updateMazeSpan = function() {
   var i = 0, x, y;
   var sqTotal, viewSqTotal, height, width, buffer, extra = 2;
   var loc;
   var viewWidth, viewHeight;
   
   sqTotal = (this.gridRow+extra) * (this.gridCol+extra);
   
   buffer = 1;   //Additional view that the program will look into
   height = (Math.floor(this.gridRow/2) + buffer);// * 2 + 1;
   width = (Math.floor(this.gridCol/2) + buffer);// * 2 + 1;

   /*Get the rows above player*/
   i = 0;
   for(y = height; y > 0; y--) {
      /*Look left of player*/
      for(x = width; x > 0; x--) {
         this.getViewArea(x * -1,y * -1,i);
         i += 1;
      }
      
      /*Look right of player*/
      for(x = 0; x <= width; x++) {
         this.getViewArea(x,y * -1,i);
         i += 1;
      }
   }
   /*Get the rows below player*/
   for(y = 0; y <= height; y++) {
      /*Look left of player*/
      for(x = width; x > 0; x--) {
         this.getViewArea(x * -1,y,i);
         i += 1;
      }
      
      /*Look right of player*/
      for(x = 0; x <= width; x++) {
         this.getViewArea(x,y,i);
         i += 1;
      }
   }
   
   /*Set image location on the canvas*/
   i = 0;
   viewHeight = (this.gridRow+extra) * this.gridSqHeight - this.gridSqHeight;
   viewWidth = (this.gridCol+extra) * this.gridSqWidth - this.gridSqWidth;

   for(y = -this.gridSqHeight; y < viewHeight; y += this.gridSqHeight) {
      for(x = -this.gridSqWidth; x < viewWidth; x += this.gridSqWidth) {
         this.maze.view[i].x = x;
         this.maze.view[i].y = y;
         
         /*Determine if still within the canvas array*/
         if (i < sqTotal) {
            i += 1;
         }
         else {
            break;
         }
      }
   }
   
   /*Draw all tiles to the maze*/
   var modNum = (Math.floor(this.gridCol/2) + buffer) * 2 + 1;
   var image = "";
   for(i = 0; i < sqTotal; i++) {
      /*Go through all the images and sub it in*/
      for (x = 0; x < this.maze.img.length - 1; x += 2) {
         if (this.maze.view[i].grid == this.maze.img[x]) {  //Walls or floors
            this.maze.view[i].img = this.maze.img[x+1];
            break;
         }
         else {   //Other doors
            this.maze.view[i].img = this.maze.img[x+2];
         }
      }
   }

   /*Draw image*/
   this.showMazeSpan();
   
   
   /**********TESTING!!!!!!***********/
   var line = "";
   //var modNum = (Math.floor(this.gridCol/2) + buffer) * 2 + 1;
   
   for(i = 0; i < sqTotal; i++) {
      line = line + this.maze.view[i].grid + ", ";
      if ((((i + 1)) % modNum) == 0) {
         console.log(i + "--" + line);
         line = "";
      }
   }
   
   console.log( "-------------------------" );
   for(i = 0; i < sqTotal; i++) {
      line = line + this.maze.view[i].img + ", ";
      //line = this.maze.view[i].img;
      //console.log(this.maze.view[i].img);
      if ((((i + 1)) % modNum) == 0) {
         //console.log(i + "--" + line);
         line = "";
      }
   }
   /**********TESTING!!!!!!-END***********/
   
   
};

/*Get the grid information around the player*/
imageLib.prototype.getViewArea = function(x, y, i) {
   var loc, viewRow, curRow;
   loc = this.maze.curLoc + this.maze.row * y + x;
   
   /*Determine the row number*/
   viewRow = Math.floor(loc / this.maze.row);   //Row of the grid tile being examined
   curRow = Math.floor((this.maze.curLoc + this.maze.row * y) / this.maze.row);  //Current row on
    
   if(viewRow != curRow) {
      this.maze.view[i].grid = -3;
   }
   else if (loc == 0) { //Draw the exit door
      this.maze.view[i].grid = -4;
   }
   else if (loc >= 0 && loc < this.maze.row * this.maze.col) {
      this.maze.view[i].grid = this.maze.grid[loc];
   }
   else {
      this.maze.view[i].grid = -3;
   }
};

/*Display the maze on canvas*/
imageLib.prototype.showMazeSpan = function() {
   var i;   //Loop counter
   var sqTotal, extra = 2;
   sqTotal = (this.gridRow+extra) * (this.gridCol+extra);
   
   for(i = 0; i < sqTotal; i++) {
      /*Draw image*/
      this.canvasCtx.drawImage(this.maze.view[i].img, this.maze.view[i].x, this.maze.view[i].y,  this.gridSqWidth, this.gridSqHeight);
   }
};

/*Update current position in maze*/
imageLib.prototype.moveMaze = function(dx, dy) {
   var loc, newRow, curRow, newCol, curCol;
   
   /*If moving left or right of the maze*/
   if (dx != 0) {
      /*Determine the row number*/
      curRow = Math.floor(this.maze.curLoc / this.maze.col);
      newRow = Math.floor((this.maze.curLoc + dx) / this.maze.col);
      
      /*Update position only if the new position is still on the same row*/
      if (curRow == newRow) {
         if (this.maze.grid[this.maze.curLoc  + dx] != this.maze.wall) { //Check it doesn't hit a wall
            this.maze.curLoc = this.maze.curLoc + dx;
         }
      }
   }
   
   /*If moving up or down the maze*/
   if (dy != 0) {
      /*Determine the column number*/
      newCol = this.maze.curLoc + (dy * this.maze.row);
      
      /*Update position only if within the grid array boundaries*/
      if ((newCol > 0) && (newCol < this.maze.row * this.maze.col - 1)) {
         if (this.maze.grid[this.maze.curLoc + dy] != this.maze.wall) { //Check it doesn't hit a wall
            this.maze.curLoc = this.maze.curLoc + dy;
         }
      }
   }
   
   /*Update the canvas view of the maze*/
   this.updateMazeSpan();
};

/*Teleport the player to new location*/
imageLib.prototype.mazeDoorTeleport = function() {
   var curPos, newPos;
   
   /*Get the door with the current position of the player*/
   newPos = this.maze.grid[this.maze.curLoc];
   
   /*Determine if it's a door*/
   if (newPos < 0) {
      return 0;
   }
   
   /*Determine if animation of travel is to be shown -- Future implementation*/
      /*Disable keyboard*/
   
   /*Update player current position*/
   this.maze.curLoc = newPos;
   
   /*Update the canvas view of the maze*/
   this.updateMazeSpan();
};