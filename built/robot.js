// excercise 1
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var phraseArray = ["a", "b", "c"];
var randomPhraseArrayIndex = randomIntFromInterval(0, phraseArray.length - 1);
alert(phraseArray[randomPhraseArrayIndex]);
// excercise 2
var firstRobot = {
    name: "First",
    color: "Blue",
    type: "man",
    phrasesFromOtherRobots: [],
};
var secondRobot = {
    name: "Second",
    color: "Red",
    type: "woman",
    phrasesFromOtherRobots: [],
};
function speak(receiver, phrase) {
    receiver.phrasesFromOtherRobots.push(phrase);
}
var phrase = "'Hello ".concat(secondRobot.name, " !'");
speak(secondRobot, phrase);
console.log(secondRobot.phrasesFromOtherRobots);
