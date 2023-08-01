class UpgradeItem extends Item {
    constructor(id, name, desc, cost, unlock_req, do_on_unlock) {
        super(id, name, desc, cost, unlock_req, do_on_unlock);
    }

    updateButton() {
        let itemButton = document.getElementById("storeItemButton_" + this.id);

        if (totalClicks() < this.cost) {
            itemButton.disabled = true;
        } else {
            itemButton.disabled = false;
        }
    }
}

class UpgradeStore extends Store {
    constructor(element) {
        super("Upgrades", element);

        this.items["Click Efficiency I"] =  new UpgradeItem(
            200,
            "Click Efficiency I",
            "The Button and Clickers are twice as effective",
            100,
            function() { return clickerStore.items["Clicker"].owned > 0; },
            function() { clickMultiplier *= 2.0; clickerStore.items["Clicker"].multiplier *= 2.0; }
        );

        this.items["Click Efficiency II"] = new UpgradeItem(
            201,
            "Click Efficiency II",
            "The Button and Clickers are twice as effective",
            500,
            function() { return totalClicks() >= 250 && upgradeStore.items["Click Efficiency I"].owned; },
            function() { clickMultiplier *= 2.0; clickerStore.items["Clicker"].multiplier *= 2.0; }
        );

        this.items["Click Efficiency III"] = new UpgradeItem(
            202,
            "Click Efficiency III",
            "The Button and Clickers are twice as effective",
            1000,
            function() { return totalClicks() >= 500 && upgradeStore.items["Click Efficiency II"].owned; },
            function() { clickMultiplier *= 2.0; clickerStore.items["Clicker"].multiplier *= 2.0; }
        );

        this.items["Click Efficiency IV"] = new UpgradeItem(
            203,
            "Click Efficiency IV",
            "The Button and Clickers are twice as effective",
            2000,
            function() { return totalClicks() >= 1000 && upgradeStore.items["Click Efficiency III"].owned; },
            function() { clickMultiplier *= 2.0; clickerStore.items["Clicker"].multiplier *= 2.0; }
        );
    }

    update() {
        super.update();
        let hide = true;

        for (let i in this.items) {
            let item = this.items[i];

            if (item.unlocked && !item.owned) {
                hide = false;
                item.updateButton();
            }
        }
    }

    buyItem(name) {
        let item = this.items[name];
        if (totalClicks() >= item.cost) {
            super.buyItem(name);
            userStats["Upgrades Purchased"]++;

            item.do_on_buy();

            let storeItem = document.getElementById("storeItem_" + item.id);
            storeItem.remove();

            updateClickCounter();
        }
    }
}