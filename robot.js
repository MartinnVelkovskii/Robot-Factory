// excercise 1
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let phraseArray = ["a", "b", "c"];
let randomPhraseArrayIndex = randomIntFromInterval(0, phraseArray.length - 1);

alert(phraseArray[randomPhraseArrayIndex]);

// excercise 2

let firstRobot = {
  name: "First",
  color: "Blue",
  type: "man",
  phrasesFromOtherRobots: [],
};
let secondRobot = {
  name: "Second",
  color: "Red",
  type: "woman",
  phrasesFromOtherRobots: [],
};

function speak(receiver, phrase) {
  receiver.phrasesFromOtherRobots.push(phrase);
}

let phrase = `'Hello ${secondRobot.name} !'`;
speak(secondRobot, phrase);
console.log(secondRobot.phrasesFromOtherRobots);
