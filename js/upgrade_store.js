class UpgradeItem extends Item {
    constructor(name, desc, cost, unlock_req, do_on_unlock) {
        super(name, desc, cost, unlock_req, do_on_unlock);
    }
}

class UpgradeStore extends Store {
    #upgradeStorePanel = document.getElementById("upgradeStorePanel");
    #purchasedUpgradesBox = document.getElementById("purchasedUpgradesBox");

    constructor(game, element) {
        super(game, element);

        this.purchasedUpgrades = [];

        //
        // Clickers
        this.items["Click Efficiency I"] =  new UpgradeItem(
            "Click Efficiency I",
            "The Button and Clickers are twice as effective",
            100,
            function() { return game.clickerStore.items["Clicker"].owned > 0; },
            function() { game.clickPowerMultiplier *= 2.0; game.clickerStore.items["Clicker"].multiplier *= 2.0; }
        );

        this.items["Click Efficiency II"] = new UpgradeItem(
            "Click Efficiency II",
            "The Button and Clickers are twice as effective",
            500,
            function() { return game.clickerStore.items["Clicker"].owned >= 10 && game.upgradeStore.items["Click Efficiency I"].owned; },
            function() { game.clickPowerMultiplier *= 2.0; game.clickerStore.items["Clicker"].power *= 2.0; }
        );

        this.items["Click Efficiency III"] = new UpgradeItem(
            "Click Efficiency III",
            "The Button and Clickers are twice as effective",
            2500,
            function() { return game.clickerStore.items["Clicker"].owned >= 25 && game.upgradeStore.items["Click Efficiency II"].owned; },
            function() { game.clickPowerMultiplier *= 2.0; game.clickerStore.items["Clicker"].power *= 2.0; }
        );

        this.items["Clicker Bonus I"] = new UpgradeItem(
            "Clicker Bonus I",
            "The Button and Clickers gain 5% CPS for each non-Clicker item owned",
            5000,
            function() { return game.clickerStore.items["Clicker"].owned >= 25; },
            function() { return; }
        )

        this.items["Click Efficiency IV"] = new UpgradeItem(
            "Click Efficiency IV",
            "The Button and Clickers are twice as effective",
            10000,
            function() { return game.clickerStore.items["Clicker"].owned >= 50 && game.upgradeStore.items["Click Efficiency III"].owned; },
            function() { game.clickPowerMultiplier *= 2.0; game.clickerStore.items["Clicker"].power *= 2.0; }
        );

        this.items["Clicker Bonus II"] = new UpgradeItem(
            "Clicker Bonus II",
            "The Button and Clickers gain 5% CPS for each non-Clicker item owned",
            15000,
            function() { return game.clickerStore.items["Clicker"].owned >= 100; },
            function() { return; }
        )

        //
        // Super Clickers
        this.items["Super Clicker Doubler I"] = new UpgradeItem(
            "Super Clicker Doubler I",
            "Super Clickers are twice as effective",
            1000,
            function() { return game.clickerStore.items["Super Clicker"].owned > 0; },
            function() { game.clickerStore.items["Super Clicker"].multiplier *= 2.0; }
        )

        this.items["Super Clicker Doubler II"] = new UpgradeItem(
            "Super Clicker Doubler II",
            "Super Clickers are twice as effective",
            5000,
            function() { return game.clickerStore.items["Super Clicker"].owned >= 10; },
            function() { game.clickerStore.items["Super Clicker"].multiplier *= 2.0; }
        )
    }

    updateItemButton(item) {
        let itemButton = document.getElementById("storeItemButton_" + item.id);

        if (this.game.clicks < item.cost) {
            itemButton.disabled = true;
        } else {
            itemButton.disabled = false;
        }
    }

    update() {
        super.update();
        let hide = true;

        for (let i in this.items) {
            let item = this.items[i];

            if (item.unlocked && !item.owned) {
                hide = false;
                this.updateItemButton(item);
            }
        }

        if (hide) this.#upgradeStorePanel.style.display = "none";
        else this.#upgradeStorePanel.style.display = "flex";
    }

    buyItem(item) {
        if (this.game.clicks >= item.cost) {
            super.buyItem(item);

            item.do_on_buy();

            let storeItem = document.getElementById("storeItem_" + item.id);
            storeItem.remove();

            this.game.updateClickCounter();

            this.game.stats.entries["Upgrades Purchased"]++;
        }
    }
}