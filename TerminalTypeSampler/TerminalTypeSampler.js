//This is an array of all the commands a user can execute.
var commands = ["HELP","SMPT","SMPB","LEDU","LEDD", "SIZU", "SIZD", "CHAR", "ALGL", "ALGR", "ALGC", "ABOT", "HWLD", "COLR", "COLG", "COLB", "COLW", "CLER", "EROR", "WASD", "BLDR", "EGGS"];
//This is used as a hold for when the user presses Enter.
var input = [];
//The text that changes for the commands.
var maintxt = "";
//The text that changes for every character the user types.
var entertxt = "";
//All the non-counter variables
var func, words, check, terminal, leading, tracking, size, alignment, rcol, gcol, bcol, keys;
//All the counter variables, which tells you how many times I have counters.
var i, j, k, l, m;

//Loads the font.
function preload(){
  terminal=loadFont('data/FontV6Terminal.otf');
}

//Sets up everything
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  //Text stuff.
  noStroke();
  textFont(terminal);
  //All these values are variables as the user can change them at will.
  size = 32;
  leading = 32;
  alignment = LEFT;
  //Colour stuff
  rcol = 0;
  gcol = 255;
  bcol = 0;
  //This is used later to say if the command exists.
  check = true;
  
  maintxt = "> Terminal 10brk> A font based on computers.brk> Created by baileyldremel.brk> Type in your command now.brkbrkbrkbrk> Type HELP for help.";
  entertxt="";
}


function draw() {
  //Redrawing the background.
  background(0);
  //The following are settings that they user can adjust.
  //Filling the text with the green colour.
  fill(rcol, gcol, bcol);
  textSize(size);
  textLeading(leading);
  textAlign(alignment);
  
  //This is a check. It's function is to check if a function exists.
  if(check === true){
    //Splits the main text into lines. I'm using the characters 'brk' to indicate a break.
    
    words=maintxt.split('brk');
      //This for loop writes the lines of text over time.
      
      for(i=0; i<words.length; i++){
        if(frameCount>30*i) {
        text(words[i], 10, 20+(i*leading), width-10, height);
        }
      }
    }
    
  //If the command doesn't exist, it runs this code instead.  
  if(check === false){
    
    //Runs 25 lines of the same thing, which is the error text.
    for(j=0; j<25; j++){
      for(k=0; k<words.length; k++){
       if(frameCount>10*k) {
         text(words[k], 32*k, leading*j, width-10, height);
         }
       }
      }
    }
  
  //This is for the command line down the bottom of the screen.
  push();
    //This bit of the code is for the line, which is techincally a box but you can only see the top line.
    push();
      strokeWeight(2);
      stroke(255);
      fill(0);
      rect(-20, height-50, width+30, 80);
    pop();
    //This is for the enter text, where the user enters their command.
    textSize(32);
    textAlign(LEFT);
    textLeading(32);
    text(entertxt, 10, height-20);
  pop();
  
  //Info text, which sits in the top right corner of the screen.
  push();
    textSize(24);
    textAlign(RIGHT);
    textLeading(32);
    text("Font size: "+size+"pt. Font leading: "+leading+"pt", width, 30);
  pop();
  
  //This writes the character pressed onto the screen. The value writing the character is keys.
  push();
    textSize(width/2);
    textAlign(CENTER, CENTER);
    text(keys, width/2, height/2);
  pop();
  
}


function keyTyped(){
  
  //For writing the character to the screen.
  keys = key;
  
  //If the key is NOT enter, it runs the main part of the program.
  if(keyCode !== ENTER) {
    
    //Checks to see if there is a value in enter text. Without it, it would write 'Undefined' first.
    
    if(entertxt === "") {
       entertxt = key;
       hold = key;
       } else {
       entertxt = entertxt+key; 
       hold = key;
    }
  }
  //This code stops the program from writing enter.
  if(keyCode === ENTER){
   keys = ""; 
  }
}

function keyPressed(){
 //Resets input. 
 input = [];
 if (keyCode === ENTER) {
   
   frameCount=0;
   //Sets execute to false.
   var execute = false;
   input = entertxt.toUpperCase();
   
   for(l=0; l<commands.length; l++){
      if(input === commands[l]) {
         check = true;
         func = commands[l];
         //THX to https://www.labnol.org/code/20181-call-javascript-function-by-name. Figured it out!
         //This function grabs the command and executes the function. AKA Run this function.
         this[func]();
         //Sets execute to true
         execute = true;
         //Whenever I code, I always seem to add a break. This is a break, which breaks the code and is cool. 
         break;
     }
   }
   //If execute is still false.
   if (!execute){
     //This is a special function that changes the text.
     ERROR(); 
   }
   //Blanks entertext.
   entertxt = "";
   
 }
 
 //This function adds the previous function back into the enter text, which can be used.
 if (keyCode === UP_ARROW) {
   entertxt = func;
 }
 
 //This clears the enter text as well.
 if (keyCode === BACKSPACE){
     entertxt = "";
  }

}


//Here are all the functions that can be executed.

//Help text that has 
function HELP(){
  maintxt = "> HELP.brk> To use this sampler, type in a four letter command then press ENTER and you will receive a response.brk> If you wish to enter the same command again, press the up arrow and then enter.brk> Here are a list of commands you can execute (PLEASE NOTE: Commands are not case sensetive):brk brk> HELP - You are here.brk> SMPT - Sample text.brk> SMPB - Sample Body Copybrk> LEDU/LEDD - Changes the leading up and down by 2pt.brk> SIZU/SIZD - Point size up and down by 4pt.brk> ALGL/ALGC/ALGR - Align left, center and right respectively.brk> ABOT - About the typeface.brk> COLR/COLG/COLB/COLW - Change colour to red, green blue or white.brk> CLER - Clears the screen (not including the info text);";
}

function SMPT(){
  maintxt = "> SAMPLE TEXT brk> Currently at "+size+"pt.brk brk> Five quacking zephyrs jolt my wax bed.";
}

function SMPB(){
  maintxt = "> SAMPLE BODYCOPY brk> Currently at "+size+"pt with "+leading+"pt leading. brkbrk> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

function LEDU(){
  leading = leading + 2;
  maintxt ="> Increasing leading...  brk> Leading is now equal to "+leading+"pt";
}

function LEDD(){
  leading = leading - 2;
  maintxt =">Decreasing leading...brk>Leading is now equal to "+leading+"pt";
}

function SIZU(){
  size = size + 4;
  leading = size;
  maintxt ="> Increasing pointsize... brk> Font is now "+size+"pt. Leading is adjusted accordingly.";
}

function SIZD(){
  size = size - 4;
  leading = size;
  maintxt = "> Decreasing pointsize...brk> Font is now "+size+"pt. Leading is adjusted accordingly";
}

function ALGL(){
  alignment = LEFT;
  maintxt ="> Changing text alignment...brk> Now aligned to the left.";
}

function ALGC(){
  alignment = CENTER;
  maintxt ="> Changing text alignment...brk> Now centrally aligned";
}

function ALGR(){
  alignment = RIGHT;
  maintxt ="> Changing text alignment...brk> Now aligned to the right";
}

function ABOT(){
  maintxt ="> ABOUT TERMINAL-10brkbrk> Terminal-10 was created by Bailey Dremel for the A to the K Studio in 2021.brk> The typeface was inspired by the Mike Kellys VR and Nillands typefaces, the computer programming typefaces of old and new, as well computer terminals.";
}

function HWLD(){
 maintxt = "> HELLO WORLDbrk> by Louie Zongbrkbrk> Hello, worldbrk> Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brkbrk> Find by voicebrk> Although it sounds like bits and bytesbrk> My circuitry is is filled with mitesbrk> Hello, worldbrkbrk> Oh, will I find a lovebrk> Oh, or a power plugbrk> Oh, digitally isolatedbrk> Oh, creator, please don't leave me waiting.brkbrk> Hello, worldbrk > Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brk> https://www.youtube.com/watch?v=Yw6u6YkTgQ4";
 window.open("https://www.youtube.com/watch?v=Yw6u6YkTgQ4", "_blank", 'toolbar=0,location=0,menubar=0');
}


function CHAR(){
  maintxt ="> CHARACTERSbrkbrk> UPPERCASE:brk> ABCDEFGHIJKLMNOPQRSTUVWXYZbrkbrk> Lowercase:brk> abcefghijklmnopqrstuvwxyzbrkbrk> Numbers:brk> 0123456789brkbrk> Other Charactersbrk> ! ? @ # $ % ^ & * ( ) { } [ ] + - = \ | / ; : \' \" , . < > ~ ";
}

function COLR(){
  rcol = 255;
  gcol = 0;
  bcol = 0;
  maintxt ="> Text colour changed to:brk> RED";
  
}

function COLG(){
  rcol = 0;
  gcol = 255;
  bcol = 0;
  maintxt ="> Text colour changed to:brk> GREEN";
  
}

function COLB(){
  rcol = 0;
  gcol = 0;
  bcol = 255;
  maintxt ="> Text colour changed to:brk> BLUE";
  
}

function COLW(){
  rcol = 255;
  gcol = 255;
  bcol = 255;
  maintxt ="> Text colour changed to:brk> WHITE";
  
}

function CLER(){
 maintxt  = "";
 
}

function WASD(){
 maintxt = "> Check your console (Ctrl/Cmd + Shift + i)";
 console.log("There's dust in the Gradius cartridge. Blow in the cartridge and try again.");
}

function BLDR(){
 maintxt="> |                    |brk> |_ _         _ _|brk> |  .   \u005C  /  .  |brk> |_ _/    \u005C_ _|brk>            /brk>         / _ _brkbrk> baileyldremel was here 2021";
}
function EROR(){
 alert("Did you expect an error? Not gonna happen! Try something else."); 
}

function EGGS(){
  maintxt="> S3cr3T C0d3sbrkbrk> HWLDbrk> BLDRbrk> ERORbrk> WASD";
}

function ERROR(){
  maintxt="ERRORCOMMANDNOTFOUNDERRORCOMMANDNOTFOUNDERRORCOMMANDNOTFOUND";
  words=maintxt.split('');
  check = false;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  text(words[i], 10, 20+(i*leading), width-10, height);
}