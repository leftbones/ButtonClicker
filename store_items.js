// Copy + Paste template at the bottom

var clicker = {
    id: 1,                                                      // Item ID number
    name: "Clicker",                                            // Display name
    desc: "Clicks the Button 1 time every 10 seconds",          // Description
    owned: 0,                                                   // Number owned by the player
    cost: 15,                                                   // Current cost to buy
    base_cost: 15,                                              // Base cost (at 0 owned)
    cost_multiplier: 1.0,                                       // Current cost multiplier
    cost_increase_multiplier: 1.1,                              // Cost increase multiplier when purchased
    click_power: 0.1,                                           // Clicks per interval
    power_multiplier: 1.0,                                      // Clicks per interval multiplier
    is_unlocked: false,                                         // If the item is able to be purchased
    unlock_req: function() { return true; },                    // Requirement to be unlocked
};

var superClicker = {
    id: 2,
    name: "Super Clicker",
    desc: "Clicks the Button 1 time every second",
    owned: 0,
    cost: 100,
    base_cost: 100,
    cost_multiplier: 1.0,
    cost_increase_multiplier: 1.1,
    click_power: 1.0,
    power_multiplier: 1.0,
    is_unlocked: false,
    unlock_req: function() { return clicks >= 75; },
};

// Template
// var itemTemplate = {
//     id: 0,
//     name: "",
//     desc: "",
//     owned: 0,
//     cost: 0,
//     base_cost: 0,
//     cost_multiplier: 0,
//     cost_increase_multiplier: 1.0,
//     click_power: 0.0,
//     power_multiplier: 1.0,
//     is_unlocked: false,
//     unlock_req: function() { return true; },
// };