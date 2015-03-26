/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 2 - Visibility (Candy 4 Aliens)
 * Date: 2015/01/14
 * Modified: 2015/01/27
 * 
 * Filename: blockPieces.js
 * 
 * Description:
 * This files contains the function that generates the blocks for the canvas and
 * determines if the curosor can go to a specific area in the game window.
 * 
 */


var preloadImages = function () {
    this.loadedImg = {}; //Stores all the images
    this.imgPath = "img/";  //Image location
    this.numImgLoaded = 0;  //Number of images loaded
    this.fileExtension = ".png";    //Image file extension
};

preloadImages.prototype.setImagePath = function(newPath) {
    this.imgPath = newPath;
};

preloadImages.prototype.imageLoc = function(image) {
    var imageLoc = this.imgPath + image + this.fileExtension;
    
    return imageLoc;
};


preloadImages.prototype.setImageAry = function(image) {
    this.loadedImg[image] = new Image();
    this.loadedImg[image].onload = function() {};

    this.loadedImg[image].src = this.imageLoc(image);
    this.numImgLoaded++;
};


/*Generates a number depending on the range*/
function genNumRange(min, max) {
    var num, newMax;
    
    newMax = max - min + 1;
            
    num = Math.floor((Math.random() * newMax) + min);
    
    return num;
}










///*Generates a new block*/
//function genBlock(){
//    var type;
//    
//    /*Generate a new block type (corner, striaght, cross, three)*/
//    type = genNumRange(1, 4); 
//
//    /*Generate a new block for that particular type*/
//    switch (type) {
//        case 1: 
//            //Straight
//            type = genNumRange(16, 17);   //Math.floor((Math.random() * 2) + 16);
//            break;
//        case 2:
//            type = genNumRange(11, 14)    //Math.floor((Math.random() * 4) + 11); 
//            break;
//        case 3:
//            type = genNumRange(21, 24)    //Math.floor((Math.random() * 4) + 21); 
//            break;
//        case 4:
//            type = 20;
//            break;
//    }
//
//    return type;
//}
//
//
///*Generate the first set of blocks*/
//function getBlockList() {
//    var i;
//    
//    /*Get the first set of blocks*/
//    for (i = 0; i < brdCol; i++) {
//        blockList[i] = genBlock();
//    }
//    
//    /*Set the first temporary position*/
//    tempBlkPos = curPos + 1;
//}
//
///*Update Block List*/
//function updateBlockList() {
//    var a = 0, b = 1;
//    
//    /*Shift blocks by one square*/
//    for (a = 0; a < brdCol -1; a++) {
//        blockList[a] = blockList[a+1];
//    }
//    
//    /*Get a new block*/
//    blockList[brdCol - 1] = genBlock();
//    
//    /*Clear off canvas*/
//    ctxBlock.clearRect(0, 0, canvasWidth(), canvasHeight());
//    
//    /*Display new block list*/
//    displayBlockList();
//}
//
///*Display the available blocks*/
//function displayBlockList() {
//    var i, yPos = 0, xPos = 0; 
//    
//    for (i = brdCol-1; i >= 0; i--) {
//        ctxBlock.drawImage(blockImg[blockList[i]], xPos, yPos, blockSize, blockSize);
//        xPos += blockSize;
//    }
//}
//
///*Determine if a block can be connected*/
//function avlBlock() {
//    var left = -1,
//            right = 1,
//            up = -brdCol,
//            down = brdCol;
//    var blockType;
//    var space, check;
//    var keyRight = 39, keyLeft = 37, keyUp = 38, keyDown = 40;
//    
//    /*Get the type of block*/
//    blockType = gameBoard[curPos];
//    
//    /*Determine available shape*/
//    /*Check down*/
//    if(keyDown == lastKey) { 
//        if (downBlock(blockType) == true) {
//            /*Check down*/
//            if (upBlock(blockList[0]) == true) {
//                return true;
//            }
//
//        }   
//    }
//    
//    /*Check Right*/
//    if(keyRight == lastKey) { 
//        if (rightBlock(blockType) == true) {
//            /*Check left*/
//            if (leftBlock(blockList[0]) == true) {
//                return true;
//            }
//        }
//    }
//
//    /*Check Up*/
//    if(keyUp == lastKey) { 
//        if (upBlock(blockType) == true) {
//             /*Check the possible new block*/
//             if (downBlock(blockList[0]) == true) {
//                 /*The blocks can link*/
//                 return true;
//             }
//        }
//    }
//    
//    /*Check Left*/
//    if(keyLeft == lastKey) { 
//        if (blockType == 13 || blockType == 14 || blockType == 17 || blockType == 20
//                || blockType == 22 || blockType == 23 || blockType == 24) {
//            /*Check Right*/
//            //check = curPos + left;
//            if (rightBlock(blockList[0]) == true) {
//                return true;
//            }
//        }
//    }
//    
//    return false;
//}
//
//function blockImg(block) {
//    var image;
//    
//    //image = "img/" + block + ".png";
//    image = blockImg[block].src;
//    
//    return image;
//}
//

//function initImageObj() {
//    blockImg[11] = new Image();
//}

/*function setImageAry() {
    var imgNum = [11, 12, 13, 14, 16, 17, 20, 21, 22, 23, 24];
    var loadedImages = 0;

        
    for (var i in imgNum) {
        blockImg[imgNum[i]] = new Image();
        blockImg[imgNum[i]].onload = function() {
            if(++loadedImages >= imgNum.length) {
              //alert("ERROR loading image." + imgNum.length);
            }
          };
          
        blockImg[imgNum[i]].src = imageLoc(imgNum[i]);
    }
}

function imageLoc(blkNum) {
    var imageLoc = "img/blocks/" + blkNum + ".png";
    
    return imageLoc;
}

function areaCovered() {
    var area = 0, pos = 0;
    var numSq = brdCol * brdRow + 1;
     
    for (pos = 0; pos < numSq; pos++) {
        if (gameBoard[pos] != 0) {
            area++;
        }
    }
    
    return area;
}*/