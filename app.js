let mistakes = 0; // start the game with 0 mistakes
let currentQuestion = 0; // start at question number 0
let attempts = 0; // start with attempts set to 0
let trophyCount = 0; // Begin with 0 trophies
let roll = 0; // number of consecutively correct answers

/*the following are global varibles called by various functions,
their values change depending on the size of the game i.e.
5x table, 10x table or 12x table*/

let TrophyLim1; //sets thresholds for displaying trophies
let TrophyLim2;
let TrophyLim3;
let TrophyLim4;
let TrophyLim5;
let TrophyLim6;
let TrophyLim7;
let TrophyLim8;
let TrophyLim9;

let rollLim1; // sets threshold for consecutive right answers for awarding trophies.
let rollLim2;
let rollLim3;
let rollLim4;
let rollLim5;
let rollLim6;
let rollLim7;
let rollLim8;
let rollLim9;

let mistakesLim; // threshold for too many mistakes

let attemptsLim; // threshold for removing the "Fifty-Fifty" and "Narrow down" buttons
let gameGridSize; // used in all calcs pertaining to answers.length
let gameRowSize; // used to create the answers array
let gameColumnSize; // as above

let randomSub; // replaces the -0.5 in randomisng the answers grid if required
let NarrowDownSkipper; // determines how many iterations to jump in the narrowDown function.

let answers = []; // global answers array

// blow are used by fiftyFify and checkAnswers to remove clicked answer buttons

let idsArray = []; // creates an array of the button ids on the game board
let answerList = []; // creates an unscrambled answers array mapped to idsArray
let ruseList = []; // used to generate a ruse for the fifty-fifty button later on

//the main play area is hidden prior to game selection
document.getElementById("area-of-play").style.display = "none";
document.getElementById("main-menu").style.display = "none";
document.getElementById("errors").style.display = "none";

// this loads the different times table game areas
document.getElementById("ten-table").addEventListener("click", tenTimesTable);
document.getElementById("five-table").addEventListener("click", fiveTimesTable);
document.getElementById("twelve-table").addEventListener("click", twelveTimesTable);

//this laods the ten times table game
function tenTimesTable() {
  // assign values to global variables
  TrophyLim1 = 3;
  TrophyLim2 = 7;
  TrophyLim3 = 10;
  TrophyLim4 = 15;
  TrophyLim5 = 20;
  TrophyLim6 = 30;
  TrophyLim7 = 50;
  TrophyLim8 = 90;
  TrophyLim9 = 100;

  rollLim1 = 3;
  rollLim2 = 7;
  rollLim3 = 10;
  rollLim4 = 15;
  rollLim5 = 20;
  rollLim6 = 30;
  rollLim7 = 50;
  rollLim8 = 90;
  rollLim9 = 100;

  mistakesLim = 10; // threshold for too many mistakes

  attemptsLim = 5; // max allowable uses of the "Fifty-Fifty" and "Narrow down" buttons
  gameGridSize = 100; // used in all calcs pertaining to  answers.length
  gameRowSize = 10; // used to create the answers array
  gameColumnSize = 10; // as above

  randomSub = 0.5; // replaces the -0.5 in randomisng the answers grid if needed
  NarrowDownSkipper = 10; // determines how many iterations to jump in the narrowDown function

  // sorts out DOM architecture for the ten times table gameboard
  document.getElementById("game-select").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("mission").style.display = "none";
  document.getElementById("area-of-play").style.display = "block";
  document.getElementById("main-menu").style.display = "block";
  document.getElementById("errors").style.display = "block";
  document.getElementById("trophiesID").style.display = "none";
  document.getElementById("row-12").style.display = "none";
  document.getElementById("row-13").style.display = "none";
  document.getElementById("col-12").style.display = "none";
  document.getElementById("col-13").style.display = "none";
  document.getElementById("mistake-count").innerHTML = mistakesLim;
  document.getElementById("attempts-lim").innerHTML = attemptsLim;

  //generates the answers array using the recently assigned variable values
  //note: let answers = [] is now a global variable so it can be used elsewhere
  for (let i = 1; i <= gameRowSize; i++) {
    for (let j = 1; j <= gameColumnSize; j++) {
      answers.push(i * j);
    }
  }

  //scramble the answers array ready for use
  answers = answers.sort(() => Math.random() - randomSub);

  // these two 'for' loops populate the global idsArray & anserList arrays
  for (let i = 1; i <= gameGridSize; i++) {
    idsArray.push(i);
  }

  for (let k = 1; k <= gameRowSize; k++) {
    for (let l = 1; l <= gameColumnSize; l++) {
      answerList.push(k * l);
    }
  }

  // these functions are called during game play
  addEventListeners();
  checkAnswer();
  reset();
}

// used to change DOM architecture for five times table
function removeColsandRows() {
  document.getElementById("main-game").classList.remove("main");
  document.getElementById("main-game").classList.add("fiveX");
  document.getElementById("id-game").classList.add("fiveXbottom");
  document.getElementById("game-cube").classList.remove("main");
  document.getElementById("game-cube").classList.add("fiveMain");
  document.getElementById("col-7").style.display = "none";
  document.getElementById("col-8").style.display = "none";
  document.getElementById("col-9").style.display = "none";
  document.getElementById("col-10").style.display = "none";
  document.getElementById("col-11").style.display = "none";
  document.getElementById("col-12").style.display = "none";
  document.getElementById("col-13").style.display = "none";
  document.getElementById("row-7").style.display = "none";
  document.getElementById("row-8").style.display = "none";
  document.getElementById("row-9").style.display = "none";
  document.getElementById("row-10").style.display = "none";
  document.getElementById("row-11").style.display = "none";
  document.getElementById("row-12").style.display = "none";
  document.getElementById("row-13").style.display = "none";
}

function fiveTimesTable() {
  removeColsandRows(); // from above

  // sorts out DOM architecture for the five times table gameboard
  document.getElementById("game-select").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("mission").style.display = "none";
  document.getElementById("area-of-play").style.display = "block";
  document.getElementById("main-menu").style.display = "block";
  document.getElementById("errors").style.display = "block";
  document.getElementById("trophiesID").style.display = "none";

  TrophyLim1 = 3;
  TrophyLim2 = 6;
  TrophyLim3 = 9;
  TrophyLim4 = 12;
  TrophyLim5 = 15;
  TrophyLim6 = 18;
  TrophyLim7 = 20;
  TrophyLim8 = 22;
  TrophyLim9 = 25;

  rollLim1 = 3;
  rollLim2 = 6;
  rollLim3 = 9;
  rollLim4 = 12;
  rollLim5 = 15;
  rollLim6 = 18;
  rollLim7 = 20;
  rollLim8 = 22;
  rollLim9 = 25;

  mistakesLim = 4; // threshold for too many mistakes
  document.getElementById("mistake-count").innerHTML = mistakesLim;

  attemptsLim = 3; // thresh for the "Fifty-Fifty" and "Narrow down" buttons
  document.getElementById("attempts-lim").innerHTML = attemptsLim;

  gameGridSize = 25; // used in all calcs pertaining to  answers.length
  gameRowSize = 5; // used to create the answers array
  gameColumnSize = 5; // as above

  randomSub = 0.5; // replaces the -0.5 in randomisng the answers grid if required
  NarrowDownSkipper = 5; // determines how many iterations to jump in the narrowDown function

  //generates the answers array using the recently assigned variable values
  for (let i = 1; i <= gameRowSize; i++) {
    for (let j = 1; j <= gameColumnSize; j++) {
      answers.push(i * j);
    }
  }

  //scrambles the answers array ready for use by showQuestion
  answers = answers.sort(() => Math.random() - randomSub);

  // these two 'for' loops populate the global idsArray & anserList arrays
  for (let i = 1; i <= gameGridSize; i++) {
    idsArray.push(i);
  }

  for (let k = 1; k <= gameRowSize; k++) {
    for (let l = 1; l <= gameColumnSize; l++) {
      answerList.push(k * l);
    }
  }

  // clear the game grid and rebuild to a 5by5 square
  let parent = document.getElementById("game-cube");
  empty(parent);

  for (let m = 1; m <= gameGridSize; m++) {
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.classList.add("square");
    parent.appendChild(newDiv);
    let button = document.createElement("BUTTON");
    let buttonText = document.createTextNode("?");
    button.id = m;
    button.classList.add("button");
    button.appendChild(buttonText);
    newDiv.appendChild(button);
  }
  swapOutTrophies();
  addEventListeners();
  checkAnswer();
  reset();
}

// used to change DOM architecture for twelve times table
function addColsandRows() {
  document.getElementById("main-game").classList.remove("main");
  document.getElementById("main-game").classList.add("twelveX");
  document.getElementById("id-game").classList.add("twelveXbottom");
  document.getElementById("game-cube").classList.remove("main");
  document.getElementById("game-cube").classList.add("twelveMain");

  for (let m = 1; m <= gameRowSize; m++) {
    let toprow = document.getElementById("id-game");
    console.log(toprow);
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.classList.add("square");
    let newDivText = document.createTextNode(m);
    newDiv.appendChild(newDivText);
    toprow.appendChild(newDiv);
  }
}

function twelveTimesTable() {
  // sorts out DOM architecture for the five times table gameboard
  addColsandRows();

  document.getElementById("game-select").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("mission").style.display = "none";
  document.getElementById("area-of-play").style.display = "block";
  document.getElementById("main-menu").style.display = "block";
  document.getElementById("errors").style.display = "block";
  document.getElementById("trophiesID").style.display = "none";

  TrophyLim1 = 10;
  TrophyLim2 = 25;
  TrophyLim3 = 40;
  TrophyLim4 = 55;
  TrophyLim5 = 70;
  TrophyLim6 = 85;
  TrophyLim7 = 100;
  TrophyLim8 = 125;
  TrophyLim9 = 144;

  rollLim1 = 10;
  rollLim2 = 25;
  rollLim3 = 40;
  rollLim4 = 55;
  rollLim5 = 70;
  rollLim6 = 85;
  rollLim7 = 100;
  rollLim8 = 125;
  rollLim9 = 144;

  mistakesLim = 12; // threshold for too many mistakes
  document.getElementById("mistake-count").innerHTML = mistakesLim;

  attemptsLim = 7; // thresh for the "Fifty-Fifty" and "Narrow down" buttons
  document.getElementById("attempts-lim").innerHTML = attemptsLim;

  gameGridSize = 144; // used in all calcs pertaining to  answers.length
  gameRowSize = 12; // used to create the answers array
  gameColumnSize = 12; // as above

  randomSub = 0.5; // replaces the -0.5 in randomisng the answers grid if required
  NarrowDownSkipper = 12; // determines how many iterations to jump in the narrowDown function

  //generates the answers array using the recently assigned variable values
  for (let i = 1; i <= gameRowSize; i++) {
    for (let j = 1; j <= gameColumnSize; j++) {
      answers.push(i * j);
    }
  }

  //scrambles the answers array ready for use
  answers = answers.sort(() => Math.random() - randomSub);

  // these two 'for' loops populate the global idsArray & anserList arrays
  for (let i = 1; i <= gameGridSize; i++) {
    idsArray.push(i);
  }

  for (let k = 1; k <= gameRowSize; k++) {
    for (let l = 1; l <= gameColumnSize; l++) {
      answerList.push(k * l);
    }
  }

  // clear the game grid and rebuild to a 12 by 12 square
  let parent = document.getElementById("game-cube");
  empty(parent);

  for (let m = 1; m <= gameGridSize; m++) {
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.classList.add("square");
    parent.appendChild(newDiv);
    let button = document.createElement("BUTTON");
    let buttonText = document.createTextNode("?");
    button.id = m;
    button.classList.add("button");
    button.appendChild(buttonText);
    newDiv.appendChild(button);
  }
  swapOutTrophies();
  addEventListeners();
  checkAnswer();
  reset();
}

// Returns to the main menu on "main menu" button click
document.getElementById("main-menu").addEventListener("click", mainMenu);

function mainMenu() {
  document.getElementById("game-select").style.display = "block";
  document.getElementById("rules").style.display = "block";
  document.getElementById("area-of-play").style.display = "none";
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("errors").style.display = "none";
  location.reload(); // resests window
}

//empty the trophy cabinet at game start
document.getElementById("trophiesID").style.display = "none";
document.getElementById("drumstick").classList.add("invisible");
document.getElementById("balloon").classList.add("invisible");
document.getElementById("certificate").classList.add("invisible");
document.getElementById("wreath").classList.add("invisible");
document.getElementById("badge").classList.add("invisible");
document.getElementById("medal").classList.add("invisible");
document.getElementById("graduate").classList.add("invisible");
document.getElementById("trophy2").classList.add("invisible");
document.getElementById("trophy1").classList.add("invisible");

/* this next function updates the tropy cabinet
it's called by the checkanswer(i) function */

function updateTrophyCount() {
  trophyCount = trophyCount + 1;

  if (trophyCount >= TrophyLim1 && roll >= rollLim1) {
    document.getElementById("trophiesID").style.display = "block";
  }

  if (trophyCount >= TrophyLim1 && roll >= rollLim1) {
    document.getElementById("drumstick").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim2 && roll >= rollLim2) {
    document.getElementById("balloon").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim3 && roll >= rollLim3) {
    document.getElementById("certificate").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim4 && roll >= rollLim4) {
    document.getElementById("wreath").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim5 && roll >= rollLim5) {
    document.getElementById("badge").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim6 && roll >= rollLim6) {
    document.getElementById("medal").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim7 && roll >= rollLim7) {
    document.getElementById("graduate").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim8 && roll >= rollLim8) {
    document.getElementById("trophy2").classList.remove("invisible");
  }

  if (trophyCount >= TrophyLim9 && roll >= rollLim9) {
    document.getElementById("trophy1").classList.remove("invisible");
  }
}

// this function is used by the 5x and 12x table games to load the correct trophy images
function swapOutTrophies() {
  if (gameGridSize == 25) {
    document.getElementById("drumstick").src =
      "./images/5_trophies/5x_drunstick 3.png";
    document.getElementById("balloon").src =
      "./images/5_trophies/5x_baloon 7.png";
    document.getElementById("certificate").src =
      "./images/5_trophies/5x_scholar 10.png";
    document.getElementById("wreath").src =
      "./images/5_trophies/5x_wreath15.png";
    document.getElementById("badge").src = "./images/5_trophies/5x_badge20.png";
    document.getElementById("medal").src = "./images/5_trophies/5x_Medal10.png";
    document.getElementById("graduate").src =
      "./images/5_trophies/5x_Graduate 50.png";
    document.getElementById("trophy2").src =
      "./images/5_trophies/5x_Trophy90.png";
    document.getElementById("trophy1").src =
      "./images/5_trophies/5x_Trophy90.png";
  }

  if (gameGridSize == 144) {
    document.getElementById("drumstick").src =
      "./images/12_trophies/12x_drunstick 3.png";
    document.getElementById("balloon").src =
      "./images/12_trophies/12x_baloon 7.png";
    document.getElementById("certificate").src =
      "./images/12_trophies/12x_scholar 10.png";
    document.getElementById("wreath").src =
      "./images/12_trophies/12x_wreath15.png";
    document.getElementById("badge").src =
      "./images/12_trophies/12x_badge20.png";
    document.getElementById("medal").src =
      "./images/12_trophies/12x_Medal10.png";
    document.getElementById("graduate").src =
      "./images/12_trophies/12x_Graduate 50.png";
    document.getElementById("trophy2").src =
      "./images/12_trophies/12x_Trophy90.png";
    document.getElementById("trophy1").src =
      "./images/12_trophies/12x_Trophy90.png";
  }
}

/* this function updates the "attempts" element with id = "output"; 
it reflects the number of times a player has used the "fifty-fifty"
and the "narrow down" buttons */

function updateAttempts() {
  attempts = attempts + 1;
  document.getElementById("output").innerHTML = attempts;

  /* this removes the "Fifty-Fifty" and "Narrow Down" buttons
after a number uses (assists) set by attemptsLim*/

  if (attempts >= attemptsLim) {
    document.getElementById("Narrow").style.visibility = "hidden";
    document.getElementById("f50-50").style.visibility = "hidden";
  }
}

/* this counts the number of correct answers in a row 
it's called by the checkAnswer and tophyCount functions*/

function updateRoll() {
  roll = roll + 1;
}

//this is an event listener for the "start new game" button
document.getElementById("start-game").addEventListener("click", reset);

/* this function clears the mistakes counter. It is called by the
reset function through the "start new game" button */

function resetMistakes() {
  mistakes = 0;
  document.getElementById("mistakes").innerHTML = mistakes;
}

/* this function  clears the game board during an in-game
reset. An in game reset happens when the player clicks  the
"start new game" button. 
the function is called by the "reset" function below*/

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

/* this is the reset function. it is used to reset all parameters 
on click of the "start new game" button*/

function reset(i) {
  let parent = document.getElementById("game-cube");
  empty(parent);
  document.getElementById("trophiesID").style.display = "none";
  document.getElementById("Narrow").style.visibility = "visible";
  document.getElementById("f50-50").style.visibility = "visible";

  for (let m = 1; m <= gameGridSize; m++) {
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.classList.add("square");
    parent.appendChild(newDiv);
    let button = document.createElement("BUTTON");
    let buttonText = document.createTextNode("?");
    button.id = m;
    button.classList.add("button");
    button.appendChild(buttonText);
    newDiv.appendChild(button);
  }

  attempts = attempts * 0;
  roll = roll * 0;
  document.getElementById("output").innerHTML = attempts;
  addEventListeners(i);
  rebuildArrays();
  trophyCount = 0;
  showQuestion();
  resetMistakes();
}

// re-populates answers, answerList & idsArray on click of the "start new game" button
//called up in the function above
function rebuildArrays() {
  answers.splice(0, answers.length);
  answerList.splice(0, answerList.length);
  idsArray.splice(0, idsArray.length);
  ruseList.splice(0, ruseList.length);

  //repopulate answers array
  for (let i = 1; i <= gameRowSize; i++) {
    for (let j = 1; j <= gameColumnSize; j++) {
      answers.push(i * j);
    }
  }

  //scrambles the answers array ready for use again
  answers = answers.sort(() => Math.random() - randomSub);

  //re-populates the idsArray & anserList arrays again
  for (let i = 1; i <= gameGridSize; i++) {
    idsArray.push(i);
  }

  for (let k = 1; k <= gameRowSize; k++) {
    for (let l = 1; l <= gameColumnSize; l++) {
      answerList.push(k * l);
    }
  }
}

// this function is called every time a student guesses the answer incorrectly
function showMistakes() {
  mistakes = mistakes + 1; // add one to mistakes
  document.getElementById("mistakes").innerHTML = mistakes;
  if (mistakes >= mistakesLim) {
    tooManyMistakes();
  }
  showQuestion();
}

// this function will get the current question from the answers array and show
// it in the id="num" element

function showQuestion() {
  //takes a random questions from the answers array
  currentQuestion = answers[Math.floor(Math.random() * answers.length)];

  //if answers array is empty, this will alert mission accomplished and display a congrats div
  if (currentQuestion == undefined) {
    alert("CONGRATULATIONS CADET! YOU BOSSED THE MISSION!!");
    document.getElementById("num").innerHTML = "nada!!!";
    let parent = document.getElementById("bg-game");
    empty(parent);
    let newDiv = document.createElement("div");
    newDiv.className = "end-game";
    newDiv.classList.add("end-game");
    parent.appendChild(newDiv);
    let newText = document.createTextNode(
      "Return to base Cadet. Mission accomplished"
    );
    newDiv.appendChild(newText);
  } // else it will show question
  else {
    document.getElementById("num").innerHTML = currentQuestion;
  }
}

// this function is called if the player makes too many mistakes
function tooManyMistakes() {
  alert("Oops! That's one too many mistakes Cadet!");
  document.getElementById("num").innerHTML = "Nooooo!!";
  let parent = document.getElementById("bg-game");
  empty(parent);
  let newDiv = document.createElement("div");
  newDiv.className = "too-many-mistakes";
  newDiv.classList.add("too-many-mistakes");
  parent.appendChild(newDiv);
  let newText = document.createTextNode(
    "Too many mistakes Cadet! Let's debrief at base."
  );
  newDiv.appendChild(newText);
}

//event listeners for assist buttons
document.getElementById("f50-50").addEventListener("click", fiftyFifty);
document.getElementById("Narrow").addEventListener("click", narrowDown);

/*this highlights the correct answer and a roose
giving the player a 50/50 chance*/

function fiftyFifty() {
  let a = currentQuestion;
  let b = answerList.indexOf(a); //Index the current question in unscrambled answerList array

  let c = idsArray[b]; // uses the value of above to map & index the ids array

  let option1 = document.getElementById(c); // calls the game button with same id as above
  option1.animate(
    [{ transform: "rotate(360deg)" }], // spins it
    { duration: 600, iterations: 5 }
  );

  option1.animate(
    [
      { opacity: 100, backgroundColor: "crimson", border: "solid 1px" }, // colours it
      { opacity: 0, backgroundColor: "crimson" },
    ],
    2000
  );

  //this if statement ensures the ruse is never the same as c
  for (let i = idsArray[0]; i <= idsArray.length; i++) {
    if (i !== c) {
      ruseList.push(i);
    }
  }

  let ruse = ruseList[0]; // value to use for ruse below in option 2

  let option2 = document.getElementById(ruse); // calls the game button with same id as ruse but not c
  option2.animate(
    [{ transform: "rotate(360deg)" }], // spins it
    { duration: 600, iterations: 5 }
  );

  option2.animate(
    [
      { opacity: 100, backgroundColor: "crimson", border: "solid 1px" }, // colours it
      { opacity: 0, backgroundColor: "crimson" },
    ],
    2000
  );

  ruseList.splice(0, ruseList.length); //empties ruseList array ready for next use

  updateAttempts(); // add one life to the attempts for using this "Fifty-Fity" button
}

/* this function highlights the colmun(s) containing the answer when 
   the "Narrow Down" button is clicked */
function narrowDown() {
  let i = currentQuestion;

  let colArray = []; // array of all possbile columns with the correct answer

  // the following 'for' and 'if' loops will populate colArray above
  for (let col = 1; col <= gameColumnSize; col++) {
    for (let j = 1; j <= gameRowSize; j++) {
      if (j * col == i) {
        colArray.push(col);
      }
    }
  }

  let f = colArray[0]; // select the first 'correct answer' column from colArray
  let h = colArray[1]; // select the second 'correct answer' column from colArray

  //select the html div elemments containing the answer buttons
  let elemArray = document.getElementById("game-cube").childNodes;

  let a = 101; // elemArray above contains the desired childnodes from this index point; instead of empty text nodes

  // for loop to select and highlight the desired column (f) elements in crimson
  for (
    let i = gameRowSize;
    i <= gameGridSize - NarrowDownSkipper;
    i += NarrowDownSkipper
  ) {
    var b;
    b = elemArray[a + i + (f - 1)].style.backgroundColor = "crimson"; // increment through the elements & colour them
    if (b === undefined) {
      break;
    } // stop if no further elements are found - loop keeps falling down wihtout this

    // highlights the first element in the series as the above line skips it
    elemArray[a + (f - 1)].style.backgroundColor = "crimson";
  }

  // for loop to select and highlight the desired column (h) elements in crimson
  for (
    let k = gameRowSize;
    k <= gameGridSize - NarrowDownSkipper;
    k += NarrowDownSkipper
  ) {
    var d;
    d = elemArray[a + k + (h - 1)].style.backgroundColor = "crimson"; // increment through the elements & colour them
    if (d === undefined) {
      break;
    } // stop if no further elements are found - it kept falling down wihtout this

    // highlights the first element in the series as the above line skips it
    elemArray[a + (h - 1)].style.backgroundColor = "crimson";
  }

  updateAttempts();
  setTimeout(resetNarrowDownCol, 3000); // to ensure the colour changes back aftr 5s. see below
}

/* this function resets the game background colour after 5 seconds 
following the narrowDown fucntion above */

function resetNarrowDownCol() {
  let classCall = document.getElementsByClassName("square");
  var l;
  for (l = 0; l < classCall.length; l++) {
    classCall[l].style.backgroundColor = "Darkcyan";
  }
}

setTimeout(resetNarrowDownCol, 5000); // 5-second timer before changing colour back

// This function checks if the player-clicked answer is is correct
function checkAnswer(i) {
  // get the current question
  let question = currentQuestion;
  let w = answers.indexOf(question); //index of currentQuestion in the scrambled answers array; to remove shortly

  // these three lines use the id of the player-clicked button, i, to work out
  // which row and column the button was
  let I = i - 1;
  let row = (I % gameRowSize) + 1;
  let col = Math.floor(I / gameColumnSize) + 1;

  // check if row*col == question
  // if yes the user was correct
  if (row * col == question) {
    document.getElementById(i).parentElement.classList.add("celebrate"); // a spin animation to celebrate the correct answer

    let x = idsArray.indexOf(i); // index of 'i' (button ID) in the idsArray
    answerList.splice(x, 1); //removes the instance of currentQuestion from un-scrambled answers array so it doesn't show up again
    // based on its relative position mapped to idsArray.

    idsArray.splice(x, 1); // removes the button ID located at index 'x' to prevent the fifty-fifty function from using it later
    document.getElementById(i).parentElement.innerHTML = row * col; //show the row*col multiplication in place of the button
    answers.splice(w, 1); //removes the instance of currentQuestion from scrambled answers array so it doesn't show up again

    updateRoll(); // updates number of consecutively correct answers
    ruseList.splice(0, ruseList.length); //clear ruseList, it's rebuilt as needed
    showQuestion(); // show the next question
    updateTrophyCount();
  } else {
    roll = roll * 0;
    showMistakes(); // show the mistakes
  }
}

function addEventListeners() {
  for (let i = 1; i <= gameGridSize; i++) {
    document.getElementById(i).addEventListener("click", function () {
      checkAnswer(i);
    });
  }
}

addEventListeners();
