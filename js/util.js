// Get the result of a percent chance out of 100
var chance = function(n) {
    return Math.random() < n / 100;
}

// Format a number as a string with commas
var formatNumber = function(n) {
    return n.toLocaleString("en-US");
}