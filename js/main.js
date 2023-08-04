var GUID = 0;
var getGUID = function() {
    GUID++;
    return GUID;
}

document.addEventListener("DOMContentLoaded", () => {
    console.clear();
    var game = new Game();
});