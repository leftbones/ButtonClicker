// Random Ideas
// - Swipe/move the mouse horizontally on the button to click rapidly
// - Each click rolls a "slot" with a random symbol, various amounts of clicks are rewarded based on matching symbols

const clickCounter = document.getElementById("clickCounter");
const theButton = document.getElementById("theButton");

const buttonFaces = [":-)", ":-O", ":-B", ":-/", ":-U", ":-(", ":-S", ":-D", ":-V", ":-P", ":-X", ":-L", ":-b", ":-T", ":-I", ":-C", ":-|", ":-$", ":-*", ":-Y", ":-3", ":->", ":-<", ":-]"];
const rareFaces = [";-)", "(-:", ":^)", "face", "B-)", ": - )", "::::-)", "._.", "( ͡° ͜ʖ ͡°)"];

var clicks = 0.0;
var clickPower = 1.0;
var clickMultiplier = 1.0;

var autoClickPower = 0.0;
var autoClickMultiplier = 1.0;

// Randomize the Button's face
var randomizeFace = function() {
    theButton.innerHTML = buttonFaces[Math.floor(Math.random() * buttonFaces.length)];
}

// Update the click counter text
var updateClickCounter = function() {
    clickCounter.innerHTML = clicks.toFixed(2);
}

// Setup the game (called on page load)
var Setup = function() {
    // setInterval(AutoClick, 1000);

    updateClickCounter();
    randomizeFace();
}

// User clicks the Button
var UserClick = function() {
    clicks += clickPower * clickMultiplier;

    updateClickCounter();
    randomizeFace();
}

// AutoClicker clicks the Button
var AutoClick = function() {
    clicks += autoClickPower * autoClickMultiplier;
    updateClickCounter();
}