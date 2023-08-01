const clickerStoreBox = document.getElementById("clickerStoreBox");
const upgradeStoreBox = document.getElementById("upgradeStoreBox");

var clickerStore;
var upgradeStore;

// Base Item Class
class Item {
    constructor(id, name, desc, cost, unlock_req, do_on_buy) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cost = cost;

        this.unlock_req = unlock_req;
        this.do_on_buy = do_on_buy;

        this.base_cost = cost;
        this.unlocked = false;

        this.owned = 0;
    }

    getClicks() {
        return 0;
    }
}

// Base Store Class
class Store {
    constructor(name, element) {
        this.name = name;
        this.element = element;

        this.items = {};
    }

    update() {
        this.checkUnlocks();
    }

    buyItem(name) {
        let item = this.items[name];
        item.owned++;

        userStats["Clicks Spent"] += item.cost;

        clicks = Decimal.sub(clicks, item.cost)
        item.cost = Math.ceil(item.cost * costMultiplier);
    }

    checkUnlocks() {
        for (let i in this.items) {
            let item = this.items[i];
            if (!item.unlocked && item.unlock_req()) {
                item.unlocked = true;
                console.log("Unlocked " + item.name);

                let itemHbox = document.createElement("div");
                let itemLabel = document.createElement("p");
                let itemButton = document.createElement("button");

                itemHbox.classList.add("hbox");
                itemHbox.setAttribute("id", "storeItem_" + item.id);

                itemLabel.classList.add("body", "size-6", "align-c", "margin-0");
                itemButton.classList.add("button", "size-4");

                itemLabel.innerHTML = item.name;
                itemLabel.setAttribute("id", "storeItemLabel_" + item.id);

                itemButton.innerHTML = formatNumber(calculateCost(item, buyAmount)) + "C";

                itemButton.setAttribute("id", "storeItemButton_" + item.id);
                itemButton.addEventListener("click", () => { this.buyItem(item.name); }, false);

                itemHbox.appendChild(itemLabel);
                itemHbox.appendChild(itemButton);

                this.element.appendChild(itemHbox);                
            }
        }
    }
}