var commands = ["HELP","SMPT","SMPB","LEDU","LEDD", "SIZU", "SIZD", "CHAR", "ALGL", "ALGR", "ALGC", "ABOT", "HWLD", "COLR", "COLG", "COLB", "COLW", "CLER", "EROR", "UUDDLRLRBA", "BLDR"];
var input = [];
var hold = [];
var maintxt = "";
var entertxt = "";
var func, words, check, terminal, leading, tracking, size, alignment, rcol, gcol, bcol, keys;
var i, j, k, l, m;

function preload(){
  terminal=loadFont('data/FontV6Terminal.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  
  //Text stuff.
  
  textFont(terminal);
  size = 32;
  leading = 32;
  alignment = LEFT;
  rcol = 0;
  gcol = 255;
  bcol = 0;
  check = true;
  maintxt = "> Terminal 10br> A font based on computers.br> Created by baileyldremel.br> Type in your command now.brbrbrbr> Type HELP for help.";
  entertxt="";
}


function draw() {
  background(0);
  fill(rcol, gcol, bcol);
  textSize(size);
  textLeading(leading);
  textAlign(alignment);
  if(check === true){  
    words=maintxt.split('br');
     for(i=0; i<words.length; i++){
       if(frameCount>30*i) {
       text(words[i], 10, 20+(i*leading), width-10, height);
     }
    }
  }
  if(check === false){
    for(j=0; j<25; j++){
      for(k=0; k<words.length; k++){
       if(frameCount>10*k) {
         text(words[k], 32*k, leading*j, width-10, height);
         }
       }
    }
    }
  push();
    push();
      strokeWeight(2);
      stroke(255);
      fill(0);
      rect(-20, height-50, width+30, 80);
    pop();
    textSize(32);
    textAlign(LEFT);
    textLeading(32);
    text(entertxt, 10, height-20);
  pop();
  
  push();
    textSize(24);
    textAlign(RIGHT);
    textLeading(32);
    text("Font size: "+size+"pt. Font leading: "+leading+"pt", width, 30);
  pop();
  
  push();
    textSize(width/2);
    textAlign(CENTER, CENTER);
    text(keys, width/2, height/2);
  pop();
}


function keyTyped(){
  keys = key;
  if(keyCode !== ENTER) {
    
    if(entertxt === "") {
       entertxt = key;
       hold = key;
       
    } else {
     entertxt = entertxt+key; 
     hold = key;
     
    }
    
  }
  if(keyCode === ENTER){
   keys = ""; 
  }
}

function keyPressed(){
 input = [];
 if (keyCode === ENTER) {
   
   frameCount=0;
   var execute = false;
   input = entertxt.toUpperCase();
   
   for(l=0; l<commands.length; l++){
      if(input === commands[l]) {
         check = true;
         func = commands[l];
         //THX to https://www.labnol.org/code/20181-call-javascript-function-by-name. Figured it out!
         this[func]();
         execute = true;
         break;
     }
   }
   if (!execute){
     ERROR(); 
   }
   entertxt = "";
   
 }
 if (keyCode === RIGHT_ARROW) {
   background(0);
   entertxt = "";
 }
 
 if (keyCode === UP_ARROW) {
   entertxt = func;
   console.log(func);
 }
 
 if (keyCode === BACKSPACE){
     entertxt = "";
  }

}

function HELP(){
  maintxt = "> HELP.br> To use this sampler, type in a four letter command then press ENTER and you will receive a response.br> If you wish to enter the same command again, press the up arrow and then enter.br> Here are a list of commands you can execute (PLEASE NOTE: Commands are not case sensetive):br br> HELP - You are here.br> SMPT - Sample text.br> SMPB - Sample Body Copybr> LEDU/LEDD - Changes the leading up and down by 2pt.br> SIZU/SIZD - Point size up and down by 4pt.br> ALGL/ALGC/ALGR - Align left, center and right respectively.br> ABOT - About the typeface.br> COLR/COLG/COLB/COLW - Change colour to red, green blue or white.br> CLER - Clears the screen (not including the info text);";
}

function SMPT(){
  maintxt = "> SAMPLE TEXT br> Currently at "+size+"pt.  br br> The quick brown fox jumps over the lazy dog.";
}

function SMPB(){
  maintxt = "> SAMPLE BODYCOPY br> Currently at "+size+"pt with "+leading+"pt leading. brbr> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

function LEDU(){
  leading = leading + 2;
  maintxt ="> Increasing leading...  br> Leading is now equal to "+leading+"pt";
}

function LEDD(){
  leading = leading - 2;
  maintxt =">Decreasing leading...br>Leading is now equal to "+leading+"pt";
}

function SIZU(){
  size = size + 4;
  leading = size;
  maintxt ="> Increasing pointsize... br> Font is now "+size+"pt. Leading is adjusted accordingly.";
}

function SIZD(){
  size = size - 4;
  leading = size;
  maintxt = "> Decreasing pointsize...br> Font is now "+size+"pt. Leading is adjusted accordingly";
}

function ALGL(){
  alignment = LEFT;
  maintxt ="> Changing text alignment...br> Now aligned to the left.";
}

function ALGC(){
  alignment = CENTER;
  maintxt ="> Changing text alignment...br> Now centrally aligned";
}

function ALGR(){
  alignment = RIGHT;
  maintxt ="> Changing text alignment...br> Now aligned to the right";
}

function ABOT(){
  maintxt ="> ABOUT TERMINAL-10brbr> Terminal-10 was created by Bailey Dremel for the A to the K Studio in 2021.br> The typeface was inspired by the Mike Kellys VR and Nillands typefaces, the computer programming typefaces of old and new, as well computer terminals.";
}

function HWLD(){
 maintxt = "> HELLO WORLDbr> by Louie Zongbrbr> Hello, worldbr> Programmed to work and not to feelbr> Not even sure that this is realbr> Hello, world.brbr> Find by voicebr> Although it sounds like bits and bytesbr> My circuitry is is filled with mitesbr> Hello, worldbrbr> Oh, will I find a lovebr> Oh, or a power plugbr> Oh, digitally isolatedbr> Oh, creator, please don't leave me waiting.brbr> Hello, worldbr > Programmed to work and not to feelbr> Not even sure that this is realbr> Hello, world.br> https://www.youtube.com/watch?v=Yw6u6YkTgQ4";
 window.open("https://www.youtube.com/watch?v=Yw6u6YkTgQ4", "_blank", 'toolbar=0,location=0,menubar=0');
}


function CHAR(){
  maintxt ="> CHARACTERSbrbr> UPPERCASE:br> ABCDEFGHIJKLMNOPQRSTUVWXYZbrbr> Lowercase:br> abcefghijklmnopqrstuvwxyzbrbr> Numbers:br> 0123456789brbr> Other Charactersbr> ! ? @ # $ % ^ & * ( ) { } [ ] + - = \ | / ; : \' \" , . < > ~ ";
}

function COLR(){
  rcol = 255;
  gcol = 0;
  bcol = 0;
  maintxt ="> Text colour changed to:br> RED";
  
}

function COLG(){
  rcol = 0;
  gcol = 255;
  bcol = 0;
  maintxt ="> Text colour changed to:br> GREEN";
  
}

function COLB(){
  rcol = 0;
  gcol = 0;
  bcol = 255;
  maintxt ="> Text colour changed to:br> BLUE";
  
}

function COLW(){
  rcol = 255;
  gcol = 255;
  bcol = 255;
  maintxt ="> Text colour changed to:br> WHITE";
  
}

function CLER(){
 maintxt  = "";
 
}

function UUDDLRLRBA(){
 maintxt = "> Check your console (Ctrl/Cmd + Shift + i)";
 console.log("There's dust in the Gradius cartridge. Blow in the cartridge and try again.");
}

function BLDR(){
 maintxt="> |                    |br> |                    |br> |_ _         _ _|br> |  .   \u005C  /  .  |br> |_ _/    \u005C_ _|br>            /br>         / _ _brbr> baileyldremel 2021";
}
function EROR(){
 alert("Did you expect an error? Not gonna happen! Try something else."); 
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
