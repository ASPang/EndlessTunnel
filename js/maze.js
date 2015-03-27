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

/**/
imageLib.prototype.genMaze = function(start, end, numDoors) {
   var i = 0;  //Loop counter
   var row, doorLoc;
      
   /*Generate the first door*/
   doorLoc = this.genMazeDoor(start, end);
   
   /*Generate the first portal*/
   row = this.genMazePortEnd(doorLoc);
   
   /*Generate the other doors*/
   for (i = 0; i < numDoors; i++) {
      console.log("Row = " + row);
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
   this.linkMazeDoors();
   
   /*************TESTING!!!!!!!!!!!!**************/
   console.log("Exit created " + " " + row);
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
   // if (x-1 < 0) {
      if (this.maze.grid[y] >= 0 || y == 0) {
         return this.genMazePortEnd(doorLoc);   //If invalid then generate a different portal location
         
         console.log("SHOULDNT BE HERE " + this.maze.row);
      }
      // return this.genMazePortEnd(doorLoc);   //If invalid then generate a different portal location
   // }
   
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
   
   /*Go through each row*/
   for (y = 0; y < this.maze.row - 2; y++) {    //-2 since you don't want the bottom row
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
      
      console.log("start/end " + start + " " + end);
      /*Join the doors*/
      if ((start >= 0 && end > 0) || (start > 0 && end >= 0)){
         this.createMazeDooorLink(start, end);
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
      }      
   }
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
      this.maze.grid[i] = this.maze.air;
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
   var i;
   
   /*Initial location in the maze*/
   this.maze.curLoc = center;
   this.curGridLoc = Math.floor(this.gridRow * this.gridCol / 2); //Character should always appear at the center of the canvas
   
   /*Save the images*/
   for(i = 0; i < numImg; i++) {
      this.maze.img[i] = img[i];
   }
};

/*Show maze based on current pointer location in the maze grid*/
imageLib.prototype.showMazeSpan = function() {
   var i;
   var sqTotal = this.gridRow * this.gridCol;
   
   /*Draw all tiles to the maze*/
   for(i = 0; i < sqTotal; i++) {
      /*Get the */
      this.maze.view[i];
   }
};