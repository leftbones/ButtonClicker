const clickerStoreBox = document.getElementById("clickerStoreBox");
var clickerStore = new Store("Clickers", clickerStoreBox);

class Clicker extends Item {
    constructor(guid, name, desc, cost, power, unlock_req) {
        super(guid, name, desc, cost, unlock_req);

        this.power = power;
        this.multi = 1.0;
    }
}

var setupClickerStore = function() {
    clickerStore.addItem("Clicker", new Clicker("clicker", "Clicker", "Clicks the Button once every 10 seocnds", 15, 0.1, () => { return true; }));
    clickerStore.addItem("Super Clicker", new Clicker("superClicker", "Super Clicker", "Clicks the Button once every second", 100, 1, () => { return clicks >= 75; }));

    clickerStore.setup();
}
