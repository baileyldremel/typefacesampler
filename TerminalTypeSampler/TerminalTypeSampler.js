//This is an array of all the commands a user can execute.
var commands = ["HELP","SMPT","SMPB","LEDU","LEDD","DWLD", "SIZU", "SIZD", "CHAR", "ALGL", "ALGR", "ALGC", "ABOT", "HWLD", "COLR", "COLG", "COLB", "COLW", "CLER", "EROR", "WASD", "BLDR", "EGGS", "JPEG", "TRON", "RNBW", "NGYU"];

//This is used as a hold for when the user presses Enter.
var input = [];

//The text that changes for the commands.
var maintxt = "";

//The text that changes for every character the user types.
var entertxt = "";

//All the non-counter variables
var func, lines, rand, words, check, terminal, leading, tracking, size, alignment, rcol, gcol, bcol, keys;

//All the counter variables, which tells you how many times I have counters.
var i, j, k, l, m;

//Variables for the sounds
var hdrive, keyboard, enterkey;


//Loads the font and the sounds. 
function preload(){
  terminal=loadFont('data/Terminal10.otf');
  hdrive = loadSound('data/HardDrive.mp3');
  keyboard = loadSound('data/Keyboard.mp3');
  enterkey = loadSound('data/EnterKey.mp3');
 
}

function setup() {
  
  //Sets up the canvas as the window size and sets the background to black.
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  //Text stuff.
  //Sets the font and makes it have no stroke.
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
  
  maintxt = "> Terminal-10brk> A display font based on old computers and ones and zeros.brk> Created by Bailey Dremel.brkbrk> HOW TO USE SAMPLERbrk> Press a four letter command then press ENTER on you keyboard.brkbrk> To view glyphs, type the corresponding key or type CHAR then enter.brk> To view a sample sentence, type SMPT.brk> To view a sample body paragraph, type SMPB.brk> To change character alignment, type ALGL, ALGC or ALGR.brk> To change font size, type SIZU or SIZD to change the size up or down.brkbrk> Type HELP to view the full list of commands.";
  entertxt="";
  

  
}


function draw() {
  
  //This function is supposed to check if a user is on a mobile device. 
  var alertMobile = false;
  if((windowWidth <= 800)&&(windowHeight <= 600)&&(alertMobile === false)) {
    console.log("It's mobile");
    alert("The terminal has detected that you are using a mobile device. This type sampler is intended for desktop use. For the full experience, please use a desktop device"); 
    alertMobile = true;
  }
  
  //Redrawing the background so the font doesn't get fuzzy.
  
  background(0);
  
  //The following are settings that they user can adjust.
  //The adjustments can be done to the fill colour, text size, leading and the alignment.
  fill(rcol, gcol, bcol);
  textSize(size);
  textLeading(leading);
  textAlign(alignment);
  
  
  //This is a check. It's function is to check if a function exists.
  if(check === true){
    
    //Splits the main text into lines. I'm using the characters 'brk' to indicate a break.
    lines=maintxt.split('brk');
    
      //This for loop writes the lines of text over time.
      for(i=0; i<lines.length; i++){
        //Every 30 frames the line of text is drawn.
        if(frameCount>30*i) {
        text(lines[i], 10, 20+(i*leading), width-10, height);
        }
      }
    }
    
  //If the command doesn't exist in the array, it runs this code instead.  
  if(check === false){
    
    //Runs multiple lines of error characters.
    for(j=0; j<(size-6); j++){
      for(k=0; k<words.length; k++){
       if(frameCount>10*k) {
         text(words[k], 32*k, leading*j, width-10, height);
         }
       }
      }
    }
  
  //Anything below here is stuff that doesn't change often and is stable.
  
  //This is for the command line down the bottom of the screen.
  push();
    //This draws the line as well as a black square behind it.
    push();
      strokeWeight(2);
      stroke(255);
      line(0, height-54, width, height-54);
      fill(0);
      noStroke();
      rect(0,height-54,width, height-54);
    pop();
    //This is for the enter text, where the user enters their command. This is not effected by any of the user changes except for colour.
    textSize(32);
    textAlign(LEFT);
    textLeading(32);
    text(entertxt, 10, height-20);
  pop();
  
  //Info text, which sits in the top right corner of the screen.
  push();
    //The black box behind the info text. 
    push();
      strokeWeight(2);
      stroke(0);
      fill(0);
      rect(width*0.74, 0, 400, 40);
    pop();
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
    //Plays a keyboard SFX when typing any key except enter.
    keyboard.play();
    
    //Checks to see if there is a value in entertxt. Without it, it would write 'Undefined' first.
    if(entertxt === "") {
       entertxt = key;
       hold = key;
       //If there is something in there, it just adds to it.
       } else {
       entertxt = entertxt+key; 
       hold = key;
    }
    
  }
  //This code stops the program from writing enter, but plays the enter key SFX.
  if(keyCode === ENTER){
   keys = ""; 
   enterkey.play();
  }
}

function keyPressed(){
  
 //Resets input.
 
 hdrive.stop(); 
 input = [];
 if (keyCode === ENTER) {
   
   
   //Resets frameCount back to zero when the user presses enter.
   frameCount=0;
   
   //Sets execute to false, which also checks to see if the function exists.
   var execute = false;
   
   //This sets the enter text to uppercase as that is what I had written the commands as.
   input = entertxt.toUpperCase();
   
   //So, this line of code goes through every single elements in the commands array.
   for(l=0; l<commands.length; l++){
     
     //This is a check to see if the command matches what the user has input.
      if(input === commands[l]) {
        
        //This sets the command as true, which says that it has found the command
        check = true;
        
        //Sets the current command as the function (or func)
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
   if (!execute) {
     
     //This is a special function that changes the text if the command isn't found.
     ERROR();
     
     //Plays the hard drive SFX
     hdrive.play();
   }
   
   //Blanks entertext.
   entertxt = "";
   
 }
 
 //This function adds the previous function back into the enter text, which can be used for changing the size/leading up or down.
 
 if (keyCode === UP_ARROW) {
   if(func != ""){
     entertxt = func;
   }
 }
 
 //This clears the enter text as well.
 if (keyCode === BACKSPACE){
     entertxt = "";
     keys = "";
  }
}


//Here are all the functions that can be executed.

//MAIN FUNCTIONS (Stuff that is useful to the sampler)
//Help text that has all the main functions in it.  
function HELP(){
  maintxt = "> HELP.brk> To use this sampler, type in a four letter command then press ENTER and you will receive a response.brk> If you make a mistake, press the BACKSPACE button and type your command.brk> If you wish to enter the same command again, press the UP ARROW and then ENTER.brkbrk> Here are a list of commands you can execute (PLEASE NOTE: Commands are not case sensitive):brk brk> HELP - You are here.brk> SMPT - Sample text.brk> SMPB - Sample Body Copybrk> LEDU/LEDD - Changes the leading up and down by 2pt.brk> SIZU/SIZD - Point size up and down by 4pt.brk> ALGL/ALGC/ALGR - Align left, center and right respectively.brk> ABOT - About the typeface.brk> COLR/COLG/COLB/COLW - Change colour to red, green, blue or white.brk> CLER - Clears the screen (not including the info text)brk> DWLD - Downloads Terminal-X for you to use.";
}

//Adds the pangram.
function SMPT(){
  maintxt = "> SAMPLE TEXT brk> Currently at "+size+"pt.brk brk> Five quacking zephyrs jolt my wax bed.";
}

//Adds a body paragraph.
function SMPB(){
  maintxt = "> SAMPLE BODYCOPY brk> Currently at "+size+"pt with "+leading+"pt leading. brkbrk> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

//LEADING SETTINGS
//Leading is increased by 2
function LEDU(){
  leading = leading + 2;
  maintxt ="> Increasing leading...  brk> Leading is now equal to "+leading+"pt";
}

//Leading is decreased by 2
function LEDD(){
  leading = leading - 2;
  maintxt =">Decreasing leading...brk>Leading is now equal to "+leading+"pt";
}

//SIZE SETTINGS
//Size is increased by 4
function SIZU(){
  size = size + 4;
  leading = size;
  maintxt ="> Increasing pointsize... brk> Font is now "+size+"pt. Leading is adjusted accordingly.";
}

//Size is decreased by 4
function SIZD(){
  size = size - 4;
  leading = size;
  maintxt = "> Decreasing pointsize...brk> Font is now "+size+"pt. Leading is adjusted accordingly";
}

//ALIGNMENT SETTINGS
//Alignment Left
function ALGL(){
  alignment = LEFT;
  maintxt ="> Changing text alignment...brk> Now aligned to the left.";
}

//Alignment Center
function ALGC(){
  alignment = CENTER;
  maintxt ="> Changing text alignment...brk> Now centrally aligned";
}

//Alignment Right
function ALGR(){
  alignment = RIGHT;
  maintxt ="> Changing text alignment...brk> Now aligned to the right";
}

//Writes text about the font.
function ABOT(){
  maintxt ="> ABOUT TERMINAL-10brkbrk> Terminal-10 was created by Bailey Dremel for the A to the K Studio in 2021.brk> The typeface was inspired by the Mike Kellys VR and Nillands typefaces,brkthe computer programming typefaces of old and new, as well computer terminals.";
}

//Writes all the characters of the font.
function CHAR(){
  maintxt ="> CHARACTERSbrkbrk> UPPERCASE:brk> ABCDEFGHIJKLMNOPQRSTUVWXYZbrkbrk> Lowercase:brk> abcefghijklmnopqrstuvwxyzbrkbrk> Numbers:brk> 0123456789brkbrk> Other Charactersbrk> ! ? @ # $ % ^ & * ( ) { } [ ] + - = \ | / ; : \' \" , . < > ~  \`";
}

//COLOUR CHANGES
//Changes colour to red
function COLR(){
  rcol = 255;
  gcol = 51;
  bcol = 0;
  maintxt ="> Text colour changed to:brk> RED";
  
}

//Changes colour to green
function COLG(){
  rcol = 0;
  gcol = 255;
  bcol = 0;
  maintxt ="> Text colour changed to:brk> GREEN";
}

//Changes colour to blue
function COLB(){
  rcol = 0;
  gcol = 179;
  bcol = 255;
  maintxt ="> Text colour changed to:brk> BLUE";
  
}

//Changes colour to white
function COLW(){
  rcol = 255;
  gcol = 255;
  bcol = 255;
  maintxt ="> Text colour changed to:brk> WHITE";
}

//Clears the main txt
function CLER(){
 maintxt  = "";
}

//Downloads the font to the users computer.
function DWLD(){
  maintxt="> DOWNLOAD FONTbrkbrk> Downloading font now, please check your downloads.brkbrk> WARNING!!!brk> The font may be unstable to use. Please proceed with caution.brk> When not using the font, please uninstall it to avoid computer crashes.brk> You may reinstall it through here or from the download file.";
  window.open("https://github.com/baileyldremel/typefacesampler/raw/main/TerminalTypeSampler/data/FontV6Terminal.otf", "_parent", 'toolbar=0,location=0,menubar=1');
}

//EASTER EGGS (Not essential but just for fun)
//Displays all the easter eggs within the sampler
function EGGS(){
  maintxt="> S3cr3T C0d3sbrkbrk> HWLDbrk> BLDRbrk> ERORbrk> WASDbrk> TRONbrk> NGYUbrk> RNBW";
}

//Selects a random fill colour.
function RNBW(){
 rcol = random(0, 240);
 gcol = random(0, 240);
 bcol = random(0, 240);
 maintxt = "> Fill colour changed randomlybrkbrk"+maintxt;
}

//Plays a song called 'hello world' by Louie Zong in a new window.
function HWLD(){
 maintxt = "> HELLO WORLDbrk> by Louie Zongbrkbrk> Hello, worldbrk> Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brkbrk> Find by voicebrk> Although it sounds like bits and bytesbrk> My circuitry is is filled with mitesbrk> Hello, worldbrkbrk> Oh, will I find a lovebrk> Oh, or a power plugbrk> Oh, digitally isolatedbrk> Oh, creator, please don't leave me waiting.brkbrk> Hello, worldbrk> Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brk> https://www.youtube.com/watch?v=Yw6u6YkTgQ4";
 window.open("https://www.youtube.com/watch?v=Yw6u6YkTgQ4", "_blank", 'toolbar=0,location=0,menubar=0');
}

//Writes something to the console.
function WASD(){
 maintxt = "> Check your console (Ctrl/Cmd + Shift + j)";
 console.log("There's dust in the Gradius cartridge. Blow in the cartridge and try again.");
}

//Writes my icon to the screen
function BLDR(){
 maintxt="> |                    |brk> |_ _         _ _|brk> |  .   \u005C  /  .  |brk> |_ _/    \u005C_ _|brk>            /brk>         / _ _brkbrk> baileyldremel was here 2021";
}

//Sends an alert to the browser.
function EROR(){
 alert("Did you expect an error? Not gonna happen! Try something else."); 
}

//Plays a video in a new browser screen.
function NGYU(){
  maintxt="> Loading...brkbrkbrkbrkbrkbrkbrk> ;)";
  window.open("https://www.youtube.com/watch?v=ahnfLZKwnTg", "_blank", 'toolbar=0,location=0,menubar=0');
  
}

//Changes the colour of the text and writes a quote from TRON
function TRON(){
  maintxt="> ACCESS CODE 6brk> PASWORD SERIES PS 17brk> REINDEER FLOTILLAbrkbrk> CODE SERIES LSU-123...";
  rcol = 0;
  gcol = 123;
  bcol = 255;
}


//The error function
function ERROR(){
  //Main text is set to nothing and alignment is reset.
  maintxt="";
  alignment = LEFT;
  //This creates random characters that populate the screen.
  for(n = 0; n<(50+size); n++){
   rand = int(random(33, 126));
   letter = char(rand);
   
   //This checks if the maintxt is empty or not and writes text accordingly.
   if(maintxt == ""){
    maintxt = letter;
   } else {
    maintxt = maintxt + letter; 
   }
  }
  
  words=maintxt.split('');
  check = false;
}


//Resized window.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  text(lines[i], 10, 20+(i*leading), width-10, height);
}
