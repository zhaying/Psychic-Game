// FILE: game.js
// DESC: Write out the html to the page and have a user guess against a random
//       created letters.

// BGN VARIABLES
var game      = { version:  "v0.1"   };
var developer = {    name: "zhaying" };
var wins            = 0;
var losses          = 0;
var maxGuesses      = 9;
var livesLeft       = 0;
var letter          = "_";
var aiGuess         = "";
  var count = 0;
var panel   = {
    title: "Guess what letter I'm thinking of ",
    scoring: [
              {"title": "Wins: ", "score": wins},
              {"title": "Losses: ", "score": losses},
              {"title": "Guesses Left: ", "score": maxGuesses},
              {"title": "Your Guesses so far: ", "score": letter}
             ]
};

var footer = {    desc: "Written by: " };
// END VARIABLES

// BGN FUNCTIONS----------------------------------------------------------------
var aiCharGenerator = function(){
  //VARIABLES
  var arrayOfKeyCodes = [];

  // GRAB ALL THE AVAILABLE KEYCODES FROM keyCodes object stored in keyCodes.js
  for (var property in keyCodes) { //for 1
      var keyboardKey = keyCodes[property];
      arrayOfKeyCodes.push(keyboardKey);
  }//END for 1

  //TEST array creation
  //console.log("arrayOfKeyCodes:",arrayOfKeyCodes);

  var randomKeyCode = arrayOfKeyCodes[
    Math.floor(Math.random() * arrayOfKeyCodes.length)
  ];
return randomKeyCode;
  //TEST randomKeyCode
  //console.log("Random",randomKeyCode);

}//END aiCharGenerator
aiGuess = aiCharGenerator();
//dconsole.log(aiGuess);

var addToGuesses = function(event) {
    panel.scoring[3].score = event.key;
    var newLeter  = panel.scoring[3].score;
    letter    += newLeter+ '&nbsp;';

}//END addToGuesses


var removeFromGuesses = function(count) {
  livesLeft = maxGuesses - count;
  _left = document.getElementById("s-2");
  _left.innerHTML = livesLeft;

}//END removeFromGuesses
var resetGuesses = function(){
  var guesses = document.getElementById("s-3") ;
  _maxGuesses = document.getElementById("s-2");
  _maxGuesses.innerHTML = maxGuesses;
  guesses.innerHTML = "_";
  guesses.style.textDecoration = "none";
  guesses.style.color = "black";
}

var userGuessesString = function(event) {

  addToGuesses(event);
  var guesses = document.getElementById("s-3") ;
  count += 1;
  removeFromGuesses(count);
  //console.log("count:",count);

  if(count < maxGuesses && aiGuess !== event.keyCode ){

    guesses.innerHTML = letter;
    guesses.style.textDecoration = "underline";

  } else if (count < maxGuesses && aiGuess == event.keyCode){
    //VARIABLES
    aiGuess = aiCharGenerator();
    //console.log(aiGuess);
    letter      = "_";
    count       = 0;
    maxGuesses  = 9;

    wins        = wins + 1;
    // reset change html
    _wins = document.getElementById("s-0");
    _wins.innerHTML = wins;
    resetGuesses();

  } else {
    console.log("Resetting Game!");
    //VARIABLES
    aiGuess = aiCharGenerator();
    //console.log(aiGuess);
    letter      = "_";
    count       = 0;
    maxGuesses  = 9;
  //  guesses
    // change losses only if a loss
    if (aiGuess !== event.keyCode){
          losses      = losses + 1;
          _losses = document.getElementById("s-1");
          _losses.innerHTML = losses;
    }
    // reset change html
    resetGuesses();

  }//END if else

}//END userGuessesString

// END FUNCTIONS----------------------------------------------------------------

// FIND AND APPEND DATA TO THE HTML TAG SECTION
var htmlSection = document.querySelector('section');

  for (var property in panel) { //Loop through panel object
    if( property == 'title' ) { //Check for object key title

      // CREATE AND APPEND a paragraph with text
      var para        = document.createElement('p');
      var node        = document.createTextNode(panel[property]);
      para.appendChild(node);
      htmlSection.appendChild(para);

    }//END if

    if( property == 'scoring') { // Check the property for an array to grab the scoring options
      var para        = document.createElement('p');
      var node        = document.createTextNode(panel[property]);

      // VARIABLES
      var scoringArray = panel[property];

      for (i = 0; i < scoringArray.length; i++) { // Loop through the array and create a p element with test from the scoring array
        var _title = scoringArray[i].title;
        var _score = scoringArray[i].score;
        var _paraId = "p-" + i;
        var _spanId = "s-" + i;
        // CREATE p and the text of

        var span = document.createElement('span');
        span.setAttribute("id", _spanId);

        para = document.createElement('p');
        para.setAttribute("id", _paraId);

        paraNode = document.createTextNode( _title);
        spanNode = document.createTextNode( _score);

        // APPEND TO DOM
        span.appendChild(spanNode);
        para.appendChild(paraNode);
        para.appendChild(span);
        htmlSection.appendChild(para);

      }//END for

    }//END if
  } //END for in

// QUERY THE DOM for the p tag inside of a footer tag
var htmlFooter = document.querySelector('footer>p');
htmlFooter.innerHTML = footer.desc + developer.name;
//END OF FILE
