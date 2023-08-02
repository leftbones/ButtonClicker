// [ Developer's Note ]
// Each time the Button is clicked, there is a 20% chance that the Face will be swapped.
// Each time the Face is swapped, there is a 5% chance to roll on the Rare Face table.
// This means that the rarest face (1% chance) has a 0.01% chance to appear.
//
// 0.20 (50%) * 0.05 (5%) * 0.01 (1%) = 0.0001 (0.01%)
//
// When the Button is held, the chance to swap the Face is halved, so the rarest face then has a 0.005% chance to appear!

const buttonFaces = [":-)", ":-O", ":-o", ":-B", ":-/", ":-U", ":-(", ":-S", ":-D", ":-V", ":-P", ":-X", ":-L", ":-b", ":-T", ":-I", ":-C", ":-|", ":-$", ":-*", ":-Y", ":-3", ":->", ":-<", ":-]"];

const rareFaces = {
    1.00: "( ͡° ͜ʖ ͡°)",
    1.50: "シ",
    2.50: "face",
    4.00: "._.",
    4.20: "B-)",
    5.00: ": - )",
    5.50: ":)",
    6.66: ">:-)",
    7.77: ":o)",
    8.00: "::::-)",
    9.99: "=-)",
    10.00: "(-:",
    12.00: ":^)",
    15.00: ";-)",
};

// Roll to generate a Rare Face
var getRareFace = function() {
    for (let i in rareFaces) {
        if (roll(i)) {
            theButton.innerHTML = rareFaces[i];
        }
    }

    userStats["Rare Face Rolls"]++;
}

// Randomize the Button's Face
var randomizeFace = function() {
    let swapChance = faceSwapChance;
    if (buttonIsHeld) {
        if (buttonIsScrubbed) swapChance *= scrubFaceSwapMultiplier;
        else swapChance *= heldFaceSwapMultiplier;
    }

    if (roll(swapChance)) {
        if (roll(rareFaceChance)) getRareFace();
        else theButton.innerHTML = buttonFaces[Math.floor(Math.random() * buttonFaces.length)];
    }
}