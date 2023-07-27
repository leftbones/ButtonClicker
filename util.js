// Roll a percent chance out of 100
var roll = function(n) {
    return Math.random() < n / 100;
}

// Format a number string with commas
var formatNumber = function(n) {
    const fn = n;
    return fn.toLocaleString('en-US');
}

// Calculate the total cost of an amount of an item -- TODO: Change this to a formula, this would be hell for large numbers (when using Max buy option)
var calculateCost = function(i, n) {
    return i.cost;
}