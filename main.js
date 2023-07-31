// Random Ideas
// - Chance to swap the Button's Face starts much lower, can be increased by buying certain upgrades
// - Each click rolls a "slot" with a random symbol, various amounts of clicks are rewarded based on matching symbols
// - Encountering a Rare Face gives a short bonus in user(?) clicks depending on the rarity of the Face (thought about awarding a set amount of clicks, but encountering an extremely rare Face early would be far too rewarding)
// - "Black Hole" item that removes clicks and can make your clicks become negative, allowing you to access a "negative store" with special items

// TODO
// - Change all `function() { }` to `() => { }` for readability

// Update the click counter text
var updateClickCounter = function() {
    clickCounter.innerHTML = formatNumber(Number(clicks.toFixed()));

    // updateStore();
    clickerStore.update();
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
    clicks = Decimal.add(clicks, (clickPower * (clickMultiplier * scrubMultiplier) * globalClickMultiplier));

    updateClickCounter();
    randomizeFace();
                
    buttonScrubTimer = buttonScrubRate;

    userStats["Scrub Clicks"]++;
}

// Automatic clicks from store items
var autoClick = function() {
    // for (let i = 0; i < storeItems.length; i++) {
    //     let item = storeItems[i];
    //     if (item.owned > 0) {
    //         clicks = Decimal.add(clicks, item.owned * (item.click_power * item.power_multiplier) * globalClickMultiplier);
    //         userStats["Auto Clicks"]++;
    //     }
    // }

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

    // Fast Updates
    setInterval(() => { checkIfScrubbing(); }, buttonScrubTimeout);

    // Slow Updates
    setInterval(() => { autoClick(); }, 1000);
    setInterval(() => { updateStats(); }, 5000);

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

    // Setup
    // setupStore();
    setupClickerStore();
    setupStats();

    updateClickCounter();
    theButton.innerHTML = buttonFaces[0];
}