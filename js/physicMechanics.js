/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: physicMechanics.js
 * 
 * Description:
 * This files contains the class and function that enables physics 
 * in the gameplay
 * 
 */
 
physics.prototype = Object.create(imageLib.prototype);
physics.prototype.constructor = physics;

function physics(canvasName, width, height, xPos, yPos) {
    imageLib.call(this, canvasName, width, height, xPos, yPos);
    
    /*Jump Related Variables*/
    this.jumpHeight = 0;
    this.ground = 0;
    this.jumpSpeed = 0;
    this.fallSpeed = 0;
    
    this.character = this.image;
    
    var jumping = false;  
    
    /*Direction Variables*/
    this.dx = 0;
    this.dy = 0;
    
    /*Borders*/
    this.floor = null;
    this.ceiling = null;
    this.rightWall = null;
    this.leftWall = null;
    
    /*State variable*/
    this.state = "";
}

/*Apply jump to the object*/
physics.prototype.jump = function() {
    var i = 0;  //Loop counter
    
    if (this.jumping == true && (this.yPos > this.jumpHeight)) {
        this.yPos -= this.jumpSpeed;
        this.redraw(this.xPos, this.yPos);          
    }
    else {
        this.jumping = false;
        this.gravity();
    }
};

/*Apply gravity on the object*/
physics.prototype.gravity = function() {    
    if (this.yPos < (this.canvas.height - this.height) && (this.yPos <= this.ground)) {
        this.redraw(this.xPos, this.yPos + this.jumpSpeed);
    }
};

/*Determine if the object intersects a line*/
physics.prototype.lineIntersect = function(obstacle) {
}

/*Reflect the object's direction if it hits a path*/
physics.prototype.obstaclebounce = function(obstacle) {
    var x = 0, y = 0;
    
    x = this.xPos;
    y = obstacle.slopeX * x + obstacle.slopeY;
    
    if (Math.ceil(y) == this.yPos || Math.floor(y) == this.yPos || Math.ceil(y-1) == this.yPos || Math.ceil(y+1) == this.yPos || 
            Math.floor(y-1) == this.yPos || Math.floor(y+1) == this.yPos) {
        if (obstacle.slopeX < 0) { 
            this.dx = -this.dx + 1;
            this.dy = -this.dy;
        }
        else {
            this.dx = -this.dx + 1;
            this.dy = -this.dy;
        }
    }    
    
    this.canvasWallBounce();
    
    return false;
};

/*Reflect the movement of the object if it hits the canvas wall*/
physics.prototype.canvasWallBounce = function() {
    if (this.leftWall != null) {
        if (this.xPos < this.leftWall) {
            this.dx = -this.dx;
        }
    }
    if (this.rightWall != null) {
        if (this.xPos > this.rightWall) {
            this.dx = -this.dx;
        }
    }
    if (this.ceiling != null) {
        if (this.yPos < this.ceiling) {
            this.dy = -this.dy;
        }
    }
    if (this.floor != null){
        if (this.yPos > this.floor) {
            this.dy = -this.dy;
        }
    }
};
    
    
/*Returns the value of where the user has collided with the canvas wall*/    
physics.prototype.canvasWallCollision = function() {
    var leftWall = 0;
    var rightWall = this.canvas.width;
    var floor = this.canvas.height;
    var ceiling = 0;
    
    if ( this.xPos < leftWall) {
        return "left";
    }
    else if (this.xPos + this.width > rightWall) {
        return "right";
    } 
    else if (this.yPos < ceiling) {
        return "top";
    }
    else if (this.yPos + this.height > floor) {
        return "bottom";
    }
    
    return "null";
};

/*Prevents the object from going out of the canvas*/
physics.prototype.stopWallCollision = function() {
    var leftWall = 0;
    var rightWall = this.canvas.width;
    var floor = this.canvas.height;
    var ceiling = 0;
    
    if ( this.xPos < leftWall) {
        this.xPos = 0;
    }
    else if (this.xPos + this.width > rightWall) {
        this.xPos = this.canvas.width - this.width;
    } 
    else if (this.yPos < ceiling) {
        this.yPos = 0;
    }
    else if (this.yPos + this.height > floor) {
        this.yPos = this.canvas.height - this.height - 1;
    }
    
    return "null";
};
