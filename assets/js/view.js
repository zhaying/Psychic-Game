var _event = event;
console.log(letter);
var _letter = letter;
console.log("myFunctionARGs: ", _event + "," + _letter);
var x = event.key;
x += event.key;
letter = x;
var currentGuess    = function(letter){
  var theletter = letter;
  theletter += theletter;
  return theletter;
};
console.log("regular",letter);
console.log("large",currentGuess(letter));
return panel.scoring.score = currentGuess(letter);
