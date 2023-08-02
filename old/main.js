// Random Ideas
// - Chance to swap the Button's Face starts much lower, can be increased by buying certain upgrades
// - Each click rolls a "slot" with a random symbol, various amounts of clicks are rewarded based on matching symbols
// - Encountering a Rare Face gives a short bonus in user(?) clicks depending on the rarity of the Face (thought about awarding a set amount of clicks, but encountering an extremely rare Face early would be far too rewarding)
// - "Black Hole" item that removes clicks and can make your clicks become negative, allowing you to access a "negative store" with special items

// TODO
// - Change all `function() { }` to `() => { }` for readability

// Get the current clicks counter value as a number
var totalClicks = function() {
    return Number(clicks.toFixed());
}

// Update the click counter text
var updateClickCounter = function() {
    clickCounter.innerHTML = formatNumber(Number(clicks.toFixed()));

    clickerStore.update();
    upgradeStore.update();
}

// User clicks the Button
var userClick = function() {
    clicks = Decimal.add(clicks, (clickPower * clickMultiplier) * globalClickMultiplier);

    updateClickCounter();
    randomizeFace();

    userStats["Normal Clicks"]++;
}

// User clicks by "scrubbing" the Button
var scrubClick = function() {
    let scrubClicks = clickPower * clickMultiplier * scrubMultiplier * globalClickMultiplier;
    clicks = Decimal.add(clicks, scrubClicks);

    updateClickCounter();
    randomizeFace();
                
    buttonScrubTimer = buttonScrubRate;

    userStats["Scrub Clicks"] += scrubClicks;
}

// Automatic clicks from store items
var autoClick = function() {
    for (let i in clickerStore.items) {
        let item = clickerStore.items[i];
        if (item.owned > 0) {
            let itemClicks = item.getClicks();
            clicks = Decimal.add(clicks, itemClicks);
            userStats["Auto Clicks"] += itemClicks;
        }
    }

    updateClickCounter();
}

// Check if the user is still scrubbing the Button
var checkIfScrubbing = function() {
    if (buttonScrubTimer == buttonScrubTimerLast) buttonIsScrubbed = false;
    else buttonIsScrubbed = true;

    buttonScrubTimerLast = buttonScrubTimer;
}

// Setup the game (called on page load)
var Setup = function() {
    console.clear();
    theButton.innerHTML = "x_x" // If this face appears, something is broken

    // Fast Updates
    setInterval(() => { checkIfScrubbing(); }, buttonScrubTimeout);

    // Slow Updates
    setInterval(() => { autoClick(); }, 1000);
    setInterval(() => { updateStats(); }, 2500);

    // Button Events
    document.addEventListener("mouseup", () => {
        buttonIsHeld = false;
        buttonScrubTimer = buttonScrubRate;
        clearInterval(buttonHeldInterval);
    });

    theButton.addEventListener("click", userClick);

    theButton.addEventListener("mousedown", () => {
        buttonIsHeld = true;
        buttonHeldInterval = setInterval(() => {
            userClick();
        }, buttonRepeatRate);
    });

    theButton.addEventListener("mousemove", () => {
        if (buttonIsHeld) {
            if (buttonScrubTimer == 0) scrubClick();
            else buttonScrubTimer--;
        }
    });

    // Store Setup
    clickerStore = new ClickerStore(clickerStoreBox);
    upgradeStore = new UpgradeStore(upgradeStoreBox);

    // Misc Setup
    setupStats();

    updateClickCounter();
    theButton.innerHTML = buttonFaces[0];
}