/*
 * File: GraphicsContest.js
 * ------------------------
 * Welcome to Chirp or Treat!
 * Have fun and dress up your bird for Halloween!
 * Mix and match costumes before timer runs out.
 * This program utilizes Stanford University's JavaScript Graphics library.
 */

"use strict";

const GWINDOW_WIDTH = 900;            /* Width of the graphics window      */
const GWINDOW_HEIGHT = 600;           /* Height of the graphics window     */
const HALF_WIDTH = GWINDOW_WIDTH/2;   /* Half of gw Width                  */
const HALF_HEIGHT = GWINDOW_HEIGHT/2; /* Half of gw Height                 */
const BIRD_SIZE = 300;                /* Size of bird image                */
const TIME_STEP = 100;                /* Time step in milliseconds         */
const TOTAL_TIME = 20;                /* Total time of game                */

/**
* Main Function: GraphicsContest()
* --------------------------------
* Implements inner functions that manage game functions
* and combines implementation with outside helper functions that manage game environment
* into the inner function step() to manage game state
*/
function GraphicsContest() {
  let gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT);

  // bird walking cycle
  let walkingCycle = [GImage("leg6.png"), GImage("leg1.png"), GImage("leg2.png"),
    GImage("leg3.png"), GImage("leg4.png"), GImage("leg5.png")];

  // basic bird
  let bird = createBird();

  // head costumes
  let prevHead = null;
  let headCostumes = [GImage("head_clown.png"), GImage("head_witch.png"),
    GImage("head_frankenstein.png"), GImage("head_scarecrow.png"), GImage("head_magician.png")];
  let indexHead = Math.floor(Math.random()*headCostumes.length);

  // body costumes
  let prevBody = null;
  let bodyCostumes = [GImage("body_clown.png"), GImage("body_witch.png"),
    GImage("body_frankenstein.png"), GImage("body_scarecrow.png"), GImage("body_magician.png")];
  let indexBody = Math.floor(Math.random()*bodyCostumes.length);

  // props
  let prevProp = null;
  let props = [GImage("prop_clown.png"), GImage("prop_witch.png"),
    GImage("prop_basket.png"),GImage("prop_bag.png"), GImage("prop_magician.png")];
  let indexProp = Math.floor(Math.random()*props.length);

  // counting variables
  let walkCount = 1;
  let stepCount = 0;
  let timeLeft = TOTAL_TIME;
  let barWidth = 380;

  // buttons
  let startButton = createStartButton("S T A R T");
  let restartButton = createStartButton("RESTART");
  let hatButton = createMainButtons("HAT", "White", "MidnightBlue");
  let costumeButton = createMainButtons("COSTUME", "DarkOrange", "MidnightBlue");
  let propButton = createMainButtons("PROP", "Gold", "MidnightBlue");

  // environment set up
  let bg = createBackground();
  let bgImage = GImage("background.png");
  let bgImage2 = GImage("background.png");
  let timerBar = createTimerBar(timeLeft, barWidth);
  let welcomeLabel = createWelcomeLabel();
  let endLabel = createEndLabel();
  let timer = null;

  /**
  * Inner Function: createBird()
  * --------------------------------
  * creates and returns the bird GCompound
  */
  function createBird() {
    let bird = GCompound();
    bird.add(GImage("wing2.png"), BIRD_SIZE/2, BIRD_SIZE/1.5);
    bird.add(walkingCycle[0], BIRD_SIZE/2, BIRD_SIZE/1.5);
    bird.add(GImage("body.png"), BIRD_SIZE/2, BIRD_SIZE/1.5);
    bird.add(GImage("wing.png"), BIRD_SIZE/2, BIRD_SIZE/1.5);
    bird.add(GImage("head.png"), BIRD_SIZE/2, BIRD_SIZE/1.5);
    return bird;
  }

  /**
  * Inner Function: setUpGame()
  * --------------------------------
  * sets up intial opening card on the graphics window
  */
  function setUpGame() {
    gw.add(bg);
    gw.add(bgImage);
    gw.add(bgImage2, 800, 0);
    gw.add(bird, 0, 15);
    gw.add(startButton, 5*HALF_WIDTH/4, 4*startButton.getHeight());
    gw.add(welcomeLabel, HALF_WIDTH-welcomeLabel.getWidth()/2, 140);
  }

  /**
  * Inner Function: createCostume()
  * ------------------------
  * takes in a costume set of its corresponding array, previous costume, current index, and dimensions,
  * removes previous costume and adds current costume to graphics window,
  * and returns the current costume
  */
  function createCostume(array, prev, index, x, y) {
   if (prev != null) {
     bird.remove(prev);
   }

   bird.add(array[index], x, y);

   return array[index];
  }

 /**
 * Inner Function: setUpButtons()
 * --------------------------------
 * sets up game buttons and initializes game timer
 */
 function setUpButtons() {
   bird.remove(bird.getElement(1));

   gw.add(hatButton, 5*HALF_WIDTH/4, 2.5*hatButton.getHeight());
   gw.add(costumeButton, 5*HALF_WIDTH/4, hatButton.getY() + 1.5*hatButton.getHeight());
   gw.add(propButton, 5*HALF_WIDTH/4, hatButton.getY() + 3*hatButton.getHeight());
   gw.add(timerBar, HALF_WIDTH - timerBar.getWidth()/2, timerBar.getHeight());

   timer = setInterval(step, TIME_STEP);
 }

  /**
  * Inner Function: clickAction()
  * --------------------------------
  * manages button events for start/restart buttons and costume buttons
  */
  let clickAction = function(e) {
    // starts (or restarts) game using the setUpButtons helper function
    if (timer === null) {
      let click = gw.getElementAt(e.getX(), e.getY());

      // Start game if clicked start button
      if (click === startButton) {
        gw.remove(startButton);
        gw.remove(welcomeLabel);

        setUpButtons();
      }

      // Restart game if clicked restart button
      if (click === restartButton) {
        gw.remove(restartButton);
        gw.remove(endLabel);
        gw.remove(bird);
        gw.remove(bgImage);
        gw.remove(bgImage2);

        timeLeft = 20;
        barWidth = 380;
        stepCount = 0;
        walkCount = 1;

        let updateRestartButton = createStartButton("RESTART");
        restartButton = updateRestartButton;

        let newbgImage = GImage("background.png");
        let newbgImage2 = GImage("background.png");
        bgImage = newbgImage;
        bgImage2 = newbgImage2;
        gw.add(bgImage);
        gw.add(bgImage2, 800, 0);

        let new_bird = createBird();
        gw.add(new_bird, 0, 15);
        bird = new_bird;

        let updateTimerBar = createTimerBar(timeLeft, barWidth);
        timerBar = updateTimerBar;

        let updateEndLabel = createEndLabel();
        endLabel = updateEndLabel;

        setUpButtons();
      }

    }

    // manages costume changes
    else {
      if (gw.getElementAt(e.getX(), e.getY()) === hatButton) {
        prevHead = createCostume(headCostumes, prevHead, indexHead, 202, 90);
        indexHead = (indexHead + 1) % headCostumes.length;
      }

      if (gw.getElementAt(e.getX(), e.getY()) === costumeButton) {
        prevBody = createCostume(bodyCostumes, prevBody, indexBody, BIRD_SIZE/2, BIRD_SIZE/1.5);
        indexBody = (indexBody + 1) % bodyCostumes.length;
      }

      if (gw.getElementAt(e.getX(), e.getY()) === propButton) {
        prevProp = createCostume(props, prevProp, indexProp, BIRD_SIZE/2, BIRD_SIZE/1.5);
        indexProp = (indexProp + 1) % props.length;
      }

    }

  };

  /**
  * Inner Function: step()
  * --------------------------------
  * animates the bird, background, and timerBar
  * clears timer once time is up
  */
  function step() {
    if (timeLeft === 0) {
      gw.remove(hatButton);
      gw.remove(costumeButton);
      gw.remove(propButton);
      gw.remove(timerBar);
      gw.add(endLabel, 5*HALF_WIDTH/4, HALF_HEIGHT - endLabel.getHeight());
      gw.add(restartButton, 5*HALF_WIDTH/4, HALF_HEIGHT);
      clearInterval(timer);
      timer = null;
    }

    // timer bar updates every second
    if (stepCount % 10 === 0 && stepCount !== 0) {
      timeLeft--;
      barWidth-= 380/TOTAL_TIME;
      gw.remove(timerBar);
      let updateTimerBar = createTimerBar(timeLeft, barWidth);
      gw.add(updateTimerBar, HALF_WIDTH - updateTimerBar.getWidth()/2, updateTimerBar.getHeight());
      timerBar = updateTimerBar;
    }

    // manage bird walking cycle
    bird.remove(walkingCycle[walkCount-1]);

    if (walkCount > walkingCycle.length - 1) {
      walkCount = 0;
    }

    bird.add(walkingCycle[walkCount], BIRD_SIZE/2, BIRD_SIZE/1.5);

    if (walkCount < 3) {
      bird.translate(0, 2);
    } else {
      bird.translate(0, -2);
    }

    bgImage.translate(-1.5,0);
    bgImage2.translate(-1.5,0);
    walkCount++;
    stepCount++;
  }

  setUpGame();
  gw.addEventListener("click", clickAction);
}

/*
* Helper Functions
* ------------------------
* Helper functions declared outside the main GraphicsContest() function
* to create game environment elements and facilitate with environment set up
*/

/*
* Helper Function: createStartButton
* ------------------------
* creates the start and restart buttons
*/
function createStartButton(message) {
  let startButton = GCompound();

  let button = GRect(200, 75);
  button.setFilled(true);
  button.setFillColor("GoldenRod");

  startButton.add(button);

  let label = GLabel();
  let fontStr = "45px 'Impact'";
  label.setFont(fontStr);
  label.setLabel(message);
  label.setColor("White");
  startButton.add(label, button.getWidth()/2 - label.getWidth()/2, 3*button.getHeight()/4);

  return startButton;
}

/*
* Helper Function: createWelcomeLabel
* ------------------------
* creates welcome label for the game
*/
function createWelcomeLabel() {
  let welcomeLabel = GCompound();

  let label = GLabel();
  let fontStr = "75px 'Impact'";
  label.setFont(fontStr);
  label.setColor("White");
  label.setLabel("CHIRP OR TREAT");
  welcomeLabel.add(label);

  let label2 = GLabel();
  let fontStr2 = "30px 'Courier'";
  label2.setFont(fontStr2);
  label2.setColor("White");
  label2.setLabel("Welcome to");
  welcomeLabel.add(label2, label.getWidth()/2 - label2.getWidth()/2, -label.getHeight());

  let label3 = GLabel();
  let fontStr3 = "25px 'Courier'";
  label3.setFont(fontStr3);
  label3.setColor("White");
  label3.setLabel("Click to Start");
  welcomeLabel.add(label3, label.getWidth()/2 - label3.getWidth()/2, label.getHeight()/2);
  return welcomeLabel;
}

/*
* Helper Function: createEndLabel
* ------------------------
* creates ending messages for the game
*/
function createEndLabel() {
  let endLabel = GCompound();

  let endMessages = ["Nice costume!", "Jazzy outfit!", "Runway ready!", "A showstopper!"];
  let endIndex = Math.floor(Math.random()*endMessages.length);

  let label = GLabel();
  let fontStr = "25px 'Courier'";
  label.setFont(fontStr);
  label.setColor("White");
  label.setLabel(endMessages[endIndex]);
  endLabel.add(label);

  let label2 = GLabel();
  let fontStr2 = "25px 'Courier'";
  label2.setFont(fontStr2);
  label2.setColor("White");
  label2.setLabel("Thanks for");
  endLabel.add(label2, label.getWidth()/2 - label2.getWidth()/2, label.getHeight() );

  let label3 = GLabel();
  let fontStr3 = "25px 'Courier'";
  label3.setFont(fontStr3);
  label3.setColor("White");
  label3.setLabel(" Chirp or Treating!");
  endLabel.add(label3, label.getWidth()/2 - label3.getWidth()/2, 2*label.getHeight());
  return endLabel;
}

/*
* Helper Function: createMainButtons
* ------------------------
* creates the main buttons for the game
*/
function createMainButtons(labelStr, buttonColor, fontColor) {
  let mainButtons = GCompound();

  let button1 = GRect(200, 75);
  button1.setFilled(true);
  button1.setFillColor(buttonColor);
  button1.setColor(buttonColor);
  mainButtons.add(button1);

  let label1 = GLabel();
  let fontStr = "40px 'Impact'";
  label1.setFont(fontStr);
  label1.setColor(fontColor);
  label1.setLabel(labelStr);
  mainButtons.add(label1, button1.getWidth()/2 - label1.getWidth()/2, 7*button1.getHeight()/10);

  return mainButtons;
}

/*
* Helper Function: createTimerBar
* ------------------------
* Creates a timer bar at top of the screen
*/
function createTimerBar(timeLeft, rectWidth) {
  let timerBar = GCompound();

  let label = GLabel();
  let fontStr = "20px 'Courier'";
  label.setFont(fontStr);
  label.setLabel(timeLeft + "s");
  label.setColor("White");

  let timerBase = GRect(400, 40);
  timerBase.setFilled(true);
  timerBase.setFillColor("Black");

  let timerFill = GRect(rectWidth, timerBase.getHeight()-20);
  timerFill.setFilled(true);
  timerFill.setFillColor("DarkSeaGreen");

  timerBar.add(timerBase, 50, 0);
  timerBar.add(label, 0, label.getHeight());
  timerBar.add(timerFill, timerBase.getX()+10, timerBase.getY()+10);

  return timerBar;
}

/*
 * Helper Function: createBackground
 * ------------------------
 * adds background to gw
 */
function createBackground() {
  let bg = GCompound();

  let sky = GRect(GWINDOW_WIDTH, GWINDOW_HEIGHT - GWINDOW_HEIGHT/3);
  sky.setFilled(true);
  sky.setFillColor("MidnightBlue");
  bg.add(sky);

  let ground = GRect(GWINDOW_WIDTH, GWINDOW_HEIGHT/3);
  ground.setFilled(true);
  ground.setFillColor("DarkSeaGreen");
  ground.setColor("DarkSeaGreen");
  bg.add(ground, 0, GWINDOW_HEIGHT - GWINDOW_HEIGHT/3);

  return bg;
}
