// Copy + Paste template at the bottom

var fasterFingers = {
    id: 0,
    name: "Faster Fingers",
    desc: "The Button and Clickers are twice as effective",
    owned: false,
    cost: 100,
    is_unlocked: false,
    unlock_req: function() { return storeItems[0].owned > 0; },
    apply: function() { storeItems[0].power_multiplier *= 2.0; }
};

var clickyClickers = {
    id: 1,
    name: "clickyClickers",
    desc: "The Button and Clickers are twice as effective",
    owned: false,
    cost: 500,
    is_unlocked: false,
    unlock_req: function() { return upgradeItems[0].owned; },
    apply: function() { storeItems[0].power_multiplier *= 2.0; }
}

// Template
// var upgradeTemplate = {
//     id: 0,
//     name: "",
//     desc: "",
//     owned: false,
//     cost: 0,
//     is_unlocked: false,
//     unlock_req: function() { return true; },
//     apply: function() { return; }
// };