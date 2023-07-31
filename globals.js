var clickCounter = document.getElementById("clickCounter");
var theButton = document.getElementById("theButton");

var buyAmount = 1;

var costMultiplier = 1.1;

var faceSwapChance = 20;
var rareFaceChance = 10;

var heldFaceSwapMultiplier = 0.5;
var scrubFaceSwapMultiplier = 0.25;

var clicks = new Decimal(0);
var clickPower = 1.0;
var clickMultiplier = 1.0;

var scrubMultiplier = 0.5;

var globalClickMultiplier = 1.0;

var buttonIsHeld = false;
var buttonRepeatRate = 500;
var buttonHeldInterval;

var buttonIsScrubbed = false;
var buttonScrubRate = 5;
var buttonScrubTimer = buttonScrubRate;
var buttonScrubTimerLast = 0;
var buttonScrubTimeout = 100;

// Statistics
var userStats = {
    "Normal Clicks" : 0,
    "Scrub Clicks" : 0,
    "Auto Clicks" : 0,
    "Clicks Spent" : 0,
    "Items Purchased" : 0,
    "Upgrades Purchased" : 0,
    "Faces Collected" : 0,
    "Rare Faces Collected" : 0,
    "Rare Face Rolls" : 0,
    "Trophies Collected" : 0,
    "Secrets Found" : 0
};