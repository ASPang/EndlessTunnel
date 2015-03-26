/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: variableList.js
 * 
 * Description:
 * This files contains the variables within the interlocking block game.
 * 
 */

var c;  //Canvas variable
var ctx;    //Canvas Context
var cBlock;     //Block canvas
var ctxBlock;   //Block context

var gameImage; //Object that'll store all the preloaded images
var imgSrc = ["background",
 "card1", "card2", "card3", "card4",
 "card5", "card6", "card7", "card8",
 "die1", "die2", "die3", "die4", "die5", "die6", 
 "endChar1", "endChar2", "endChar3", "endChar4",
 "endWolf1", "endWolf2", "endWolf3", "endWolf4",
 "trap1", "trap2", "trap3",
 "introMenuBgd", "character", "enemy", "wolf"];   //Name of images
var backgroundImg;  //background image object
var character;  //character image object
var candy;  //candy image object
var aliens = [];
var enemy = [];
var alienVisibility = 1.0;
var visible = true;

var points = 0;
var powerUp = 0;
var powerUpEnd = 7;

/*Obstacles*/
var path = [];
var pathC = [];
var pathE = [];

var pathCCount = 0;
var pathECount = 0;

/*Projectile Information*/
var projectile = [];

/*Interface Information*/
var screenDisplayed = "intro";

/*Grid Variables*/
var gameBoard = []; //Array for the board game
var blockList = [];  //Array for the blocks
var blockImg = []; //Stores all the images

/*Block Game Variables*/
var blockSize = 50; //Blocksize in pixels
var brdCol = 6; //Number of columns
var brdRow = 8; //Number of rows 
var startPos = 46;  //Starting Position
var curPos; //Current position on the board
var oldPos;

var lastKey = 0;
var tempBlkNum; //Might not need
var tempBlkPos;

/*Board Game variables*/
//var card = [];   //Display card
var card;
//var die = [];
var dice;
//var trap = [];   //Display Trap
var trap;
var storyChar = 0;
var storyWolf = 0;

/*Turn Base Variables*/
var characterStop = 1;