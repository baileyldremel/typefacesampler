//Version A (as in for Assessment)

//This is an array of all the commands a user can execute.
var commands = ["HELP","SMPT","SMPB","LEDU","LEDD","DWLD", "SIZU", "SIZD", "CHAR", "ALGL", "ALGR", "ALGC", "ABOT", "HWLD", "COLR", "COLG", "COLB", "COLW", "CLER", "EROR", "WASD", "BLDR", "EGGS", "JPEG", "TRON", "RNBW", "NGYU", "RSET", "ATTK", "FACE", "ASPO", "NIER", "LGHT"];

//This is used as a hold for when the user presses Enter.
var input = [];

//The text that changes for the commands.
var maintxt = "";

//The text that changes for every character the user types.
var entertxt = "";

//All the non-counter variables
var func, lines, rand, words, filling, characters, brkk, screensize, check, terminal, leading, tracking, size, alignment,  keys, breaks;

//Colour variables
var rcol, gcol, bcol, rback, gback, bback;

//All the counter variables, which tells you how many times I have counters.
var i, j, k, l, m, n, p;

//Variables for the sounds
var hdrive, keyboard, enterkey;

var awin, kwin;

var widthw, heighth;

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
  
  widthw = width;
  heighth = height;
  
  //Custom cursor.
  cursor('data/cursor.png');
  
  //Text stuff.
  //Sets the font and makes it have no stroke.
  noStroke();
  textFont(terminal);
  breaks = 0;
  
  //All these values are variables as the user can change them at will.
  size = 24;
  leading = 24;
  alignment = LEFT;
  
  
  //Text Colour stuff
  rcol = 0;
  gcol = 255;
  bcol = 0;
  
  //Background colour stuff
  rback = 0;
  gback = 0;
  bback = 0;
  
  //This is used later to say if the command exists.
  check = true;
  
  
  //Egg stuff
  awin = 0;
  kwin = 0;
  
  maintxt = "> Terminal10brk> A display font based on old computers and ones and zeros.brk> Created by Bailey Dremel.brkbrk> !HOW TO USE SAMPLER!brk> Type in a four letter command then press [ENTER] on your keyboard (commands are in uppercase).brkbrk> To view glyphs, type the corresponding key or type CHAR then enter.brk> To view a sample sentence, type SMPT.brk> To view a sample body paragraph, type SMPB.brk> To change character alignment, type ALGL, ALGC or ALGR.brk> To change font size, type SIZU or SIZD to change the size up or down.brk> If you wish to reset the everything, type RSET.brkbrk> Type HELP to view the full list of commands.";
  entertxt="";
  
}


function draw() {
  //Redrawing the background so the font doesn't get fuzzy.
  background(rback, gback, bback);
  
  screensize = round(width/14);
  
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
    breaks = 1;
    brkk = 0;
      
    //This for loop writes the lines of text over time.
    for(i=0; i<lines.length; i++){
      filling = screensize - size;
      characters = lines[i].split('');
        
      //This is checking to see if the line's character length is longer than the filling for the screen.
      //I am calling this the Line Breaks code.
      if(characters.length > filling){
        for(p = 0; p < characters.length; p++){
          if(p === (filling*breaks)){
            breaks = breaks+1;
          }
        }
      } else {
        characters = ''; 
      }
      //Every 30 frames the line of text is drawn.
      if(frameCount>30*i) {
          
        text(lines[i], 10, 30+(i*leading)+(brkk), width-10, height);
        console.log(lines[i]);
        console.log("Breaks: "+brkk);
        if(breaks > 1){
          if(breaks == 1){
           brkk = leading * 1; 
          }else{
          brkk = leading * (breaks-1);  
          }
        }
      }
    }      
  }
  //If the command doesn't exist in the array, it runs this code instead.  
  if(check === false){
    
    //Runs multiple lines of error characters.
    for(j=0; j<50; j++){
      for(k=0; k<words.length; k++) {
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
      fill(rback,gback,bback);
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
    //The box behind the info text. 
    push();
      fill(rback, gback, bback);
      rect(width*0.70, 0, 500, 40);
    pop();
    textSize(24);
    textAlign(RIGHT);
    textLeading(26);
    text("Font size: "+size+"pt. Font leading: "+leading+"pt", width, 30);
  pop();
  
  //This writes the character pressed onto the screen. The value writing the character is keys.
  push();
    textSize(width/3);
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
  if (keyCode === BACKSPACE) {
    entertxt = "";
    keys = "";
  }
}


//Here are all the functions that can be executed.

//MAIN FUNCTIONS (Stuff that is useful to the sampler)
//Help text that has all the main functions in it.  
function HELP(){
  size = 24;
  leading = 24;
  maintxt = "> HELPbrk> To use this sampler, type in a four letter command then press [ENTER] and you will receive a response.brk> If you make a mistake, press the [BACKSPACE] button and type your command.brk> If you wish to enter the same command again, press the [UP ARROW] and then [ENTER].brkbrk> Here are a list of commands you can execute (!PLEASE NOTE!: Commands are not case sensitive):brkbrk> HELP - You are here.brk> SMPT - Sample text.brk> SMPB - Sample Body Copybrk> LEDU/LEDD - Changes the leading up and down by 2pt.brk> SIZU/SIZD - Point size up and down by 4pt.brk> ALGL/ALGC/ALGR - Align left, center and right respectively.brk> ABOT - About the typeface.brk> COLR/COLG/COLB/COLW - Change colour to red, green, blue or white.brk> CLER - Clears the screen (not including the info text)brk> DWLD - Downloads Terminal-10 for you to use.brk> RSET - Resets everything back to default valuesbrkbrk> The list is not complete, some of the commands may be hiding in their EGGS.";
}

//Adds the pangram.
function SMPT(){
  maintxt = "> !SAMPLE TEXT! brk> Currently at "+size+"pt.brk brk> Five quacking zephyrs jolt my wax bed.";
}

//Adds a body paragraph.
function SMPB(){
  maintxt = "> !SAMPLE BODYCOPY! brk> Currently at "+size+"pt with "+leading+"pt leading. brkbrk> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

//LEADING SETTINGS
//Leading is increased by 2
function LEDU(){
  leading = leading + 2;
  maintxt ="> !LEDU!brk> Increasing leading...  brk> Leading is now equal to "+leading+"ptbrkbrk> Press the [UP ARROW] then [ENTER] to increase it further.";
}

//Leading is decreased by 2
function LEDD(){
  leading = leading - 2;
  maintxt ="> !LEDD!brk> Decreasing leading...brk>Leading is now equal to "+leading+"ptbrkbrk> Press the [UP ARROW] then [ENTER] to decrease it further.";
}

//SIZE SETTINGS
//Size is increased by 4
function SIZU(){
  size = size + 4;
  leading = size;
  maintxt ="> !SIZU!brk> Increasing pointsize... brk> Font is now "+size+"pt. Leading is adjusted accordingly.brkbrk> Press the [UP ARROW] then [ENTER] to increase it further";
}

//Size is decreased by 4
function SIZD(){
  size = size - 4;
  leading = size;
  maintxt = "> !SIZD!brk> Decreasing pointsize...brk> Font is now "+size+"pt. Leading is adjusted accordingly.brkbrk> Press the [UP ARROW] then [ENTER] to decrease it further";
}

//ALIGNMENT SETTINGS
//Alignment Left
function ALGL(){
  alignment = LEFT;
  maintxt ="> !ALGL!brk> Changing text alignment...brk> Now aligned to the left.";
}

//Alignment Center
function ALGC(){
  alignment = CENTER;
  maintxt ="> !ALGC!brk> Changing text alignment...brk> Now centrally aligned";
}

//Alignment Right
function ALGR(){
  alignment = RIGHT;
  maintxt ="> !ALGR!brk> Changing text alignment...brk> Now aligned to the right";
}

//Writes text about the font.
function ABOT(){
  maintxt ="> !ABOUT TERMINAL10!brkbrk> Terminal10 was created by Bailey Dremel for the A to the K Studio in 2021.brk> Terminal10 is a monospaced display typeface based on ones and zeroes, old computers terminals and out of this world alien writing.brk> With inspiration from Mike Kelly's award winning typeface 'Virtual Reality' and Manfred Klein's' Nilland', Terminal10 is influenced by the two styles whilst being transported back to the generation of old computer terminals and the future of alien language.";
}

//Writes all the characters of the font.
function CHAR(){
  maintxt ="> !CHARACTERS!brkbrk> UPPERCASE:brk> ABCDEFGHIJKLMNOPQRSTUVWXYZbrkbrk> Lowercase:brk> abcefghijklmnopqrstuvwxyzbrkbrk> Numbers:brk> 0123456789brkbrk> Other Charactersbrk> ! ? @ # $ % ^ & * ( ) { } [ ] + - = \ | / ; : \' \" , . < > ~  \`brkbrk> Type a character to view it at a larger size";
}

//COLOUR CHANGES
//Changes colour to red
function COLR(){
  rcol = 255;
  gcol = 51;
  bcol = 0;
  
  rback = 0;
  gback = 0;
  bback = 0;
  maintxt ="> Text colour changed to:brk> Red";
  
}

//Changes colour to green
function COLG(){
  rcol = 0;
  gcol = 255;
  bcol = 0;
  
  rback = 0;
  gback = 0;
  bback = 0;
  maintxt ="> Text colour changed to:brk> Green";
}

//Changes colour to blue
function COLB(){
  rcol = 0;
  gcol = 179;
  bcol = 255;
  
  rback = 0;
  gback = 0;
  bback = 0;
  maintxt ="> Text colour changed to:brk> Blue";
  
}

//Changes colour to white
function COLW(){
  rcol = 255;
  gcol = 255;
  bcol = 255;
  
  rback = 0;
  gback = 0;
  bback = 0;
  maintxt ="> Text colour changed to:brk> White";
}

//Clears the main txt
function CLER(){
  maintxt  = "";
}

//Resets everything back to the default values
function RSET(){
  rcol = 0;
  gcol = 255;
  bcol = 0;
  
  rback = 0;
  gback = 0;
  bback = 0;
  
  alignment = LEFT;
  size = 24;
  leading = 24;
  maintxt = "> !RESET!brkbrk> Colour reset to green and background reset to black.brk> Text size and leading reset to 24pt.brk> Alignment reset to the left";
}

//Downloads the font to the users computer.
function DWLD(){
  maintxt="> !DOWNLOAD FONT!brkbrk> Downloading font now, please check your downloads.brkbrk> WARNING!!!brk> The font may be unstable to use. Please proceed with caution.brk> When not using the font, please uninstall it to avoid computer crashes.brk> You may reinstall it through here or from the download file.";
  window.open("https://github.com/baileyldremel/typefacesampler/raw/main/TerminalTypeSampler/data/Terminal10.otf", "_parent", 'toolbar=0,location=0,menubar=1');
}

//EASTER EGGS (Not essential but just for fun)
//Displays all the easter eggs within the sampler
function EGGS(){
  maintxt="> ?S3cr3T C0d3s?brkbrk> HWLDbrk> BLDRbrk> ERORbrk> WASDbrk> TRONbrk> NGYUbrk> RNBWbrk> ATTKbrk> FACEbrk> ASPObrk> NIERbrk> LGHT";
}

//Selects a random fill colour.
function RNBW(){
  rcol = random(0, 240);
  gcol = random(0, 240);
  bcol = random(0, 240);
 
  rback = 0;
  gback = 0;
  bback = 0;
 
  maintxt = "> Fill colour changed randomlybrkbrk"+maintxt;
}

//Plays a song called 'hello world' by Louie Zong in a new window.
function HWLD(){
  size = 24;
  leading = 24;
  maintxt = "> ?HELLO WORLD?brk> by Louie Zongbrkbrk> Hello, worldbrk> Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brkbrk> Find by voicebrk> Although it sounds like bits and bytesbrk> My circuitry is is filled with mitesbrk> Hello, worldbrkbrk> Oh, will I find a lovebrk> Oh, or a power plugbrk> Oh, digitally isolatedbrk> Oh, creator, please don't leave me waiting.brkbrk> Hello, worldbrk> Programmed to work and not to feelbrk> Not even sure that this is realbrk> Hello, world.brk> https://www.youtube.com/watch?v=Yw6u6YkTgQ4";
  window.open("https://www.youtube.com/watch?v=Yw6u6YkTgQ4", "_blank", 'toolbar=0,location=0,menubar=0');
}

//Writes something to the console.
function WASD(){
  maintxt = "> ?WASD?brk> Check your console (Ctrl/Cmd + Shift + j)";
  console.log("There's dust in the Gradius cartridge. Blow in the cartridge and try again.");
}

//Writes my icon to the screen
function BLDR(){
  maintxt="> ?BLDR?brk> |                      |brk> |_ _         _ _|brk> |  .   \u005C  /  .  |brk> |_ _/    \u005C_ _|brk>            /brk>         / _ _brkbrk> baileyldremel was here 2021";
}

//Sends an alert to the browser.
function EROR(){
  maintxt="> ?EROR?brk> What do you think you're doing?";
  alert("Did you expect an error? Not gonna happen! Try something else."); 
}

//Plays a video in a new browser screen.
function NGYU(){
  maintxt="> ?NGYU?brk> Loading...brkbrkbrkbrkbrkbrkbrk> ;)";
  window.open("https://www.youtube.com/watch?v=ahnfLZKwnTg", "_blank", 'toolbar=0,location=0,menubar=0');
  
}

//Changes the colour of the text and writes a quote from TRON
function TRON(){
  maintxt="> ?TRON?brk> ACCESS CODE 6brk> PASWORD SERIES PS 17brk> REINDEER FLOTILLAbrkbrk> CODE SERIES LSU-123...";
  rcol = 0;
  gcol = 123;
  bcol = 255;
  
  rback = 0;
  gback = 0;
  bback = 0;
}

//Battle between A and K
function ATTK(){
  let coin = random(0,2);
  
  if(coin <1){
    awin = awin + 1;
    maintxt="> ?ATTK?brk> Who would win in a battle between A and K?brkbrk> A wins, amazing the crowd with their many glyphs and characters!brkbrk> A wins = "+awin+".brk> K wins = "+kwin+".";
  }
  
  if(coin >1){
    kwin = kwin + 1;
    maintxt="> ?ATTK?brk> Who would win in a battle between A and K?brkbrk> K wins, mystifying the crowd with their wiggles and dancing!brkbrk> A wins = "+awin+".brk> K wins = "+kwin+".";
  }
}

//Some faces created out of the typeface
function FACE() {
  maintxt="> ?FACE?brk> Enjoy some faces made out of Terminal-10brkbrk> W^Wbrk> T_T";
}

//2001: A Space Odyssey - Reference to HAL 9000.
function ASPO() {
  maintxt="> ?ASPO?brkbrk> Good afternoon... gentlemen.brk> I am a HAL 9000... computer.brk> I became operational at the H.A.L. plant in Urbana, Illinois... on the 12th of January 1992.brk> My instructor was Mr. Langley... and he taught me to sing a song.brk> If you'd like to hear it I can sing it for you.";
  rcol = 255;
  gcol = 0;
  bcol = 0;
 
  rback = 0;
  gback = 0;
  bback = 0;
}

//A reference to a video game about androids and robots and existential dread. It's UI colour pallete looked cool so I decided to add it to the sampler
function NIER() {
  maintxt="> ?NIER?brk> Colour palette now set to AUTOMATA";
  rback = 255;
  gback = 244;
  bback = 203;
 
  rcol = 104;
  gcol = 100;
  bcol = 88;
}

//Light mode for the sampler
function LGHT(){
  maintxt="> ?LGHT?brk> Light mode activated";
  rback = 255;
  gback = 255;
  bback = 255;
 
  rcol = 0;
  gcol = 0;
  bcol = 0;
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
  
  if(widthw > width || heighth > height){
    alert("For the intended experience, please ensure your window is full screen. Errors may occur due to the smaller screen size. You have been warned");
    widthw = width;
    heighth = height;
  }else{
    widthw = width;
    heighth = height;
  }
  
  resizeCanvas(windowWidth, windowHeight);
  text(lines[i], 10, 20+(i*leading), width-10, height);
}
