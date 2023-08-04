class ClickerStore extends Store {
    constructor(game, element) {
        super(game, element);

        this.items["Clicker"] =  new Clicker(
            "Clicker",
            "Clicks the Button 1 time every 10 seconds",
            15,
            function() { return true; },
            function() { return; },
            0.1,
            1.0
        );

        this.items["Super Clicker"] = new SuperClicker(
            "Super Clicker",
            "Clicks the Button 1 time every second",
            100,
            function() { return game.clicks >= 100 && game.clickerStore.items["Clicker"].owned > 0; },
            function() { return; },
            1.0,
            1.0
        );
    }

    updateItemLabel(item) {
        let itemLabel = document.getElementById("storeItemLabel_" + item.id);

        let clicksPerSecond = item.getTotalClicks(this.game);
        if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);

        itemLabel.innerHTML = item.name + " <span style='font-size: 0.75rem;'>(" + formatNumber(item.owned) + ", " + clicksPerSecond + " CPS)</span>";
    }

    updateItemButton(item) {
        let itemButton = document.getElementById("storeItemButton_" + item.id);
        itemButton.innerHTML = formatNumber(item.cost) + "C";

        if (this.game.clicks < item.cost) {
            itemButton.disabled = true;
        } else {
            itemButton.disabled = false;
        }
    }

    update() {
        super.update();

        for (let i in this.items) {
            let item = this.items[i];

            if (item.unlocked) {
                if (item.owned > 0) this.updateItemLabel(item);
                this.updateItemButton(item);
            }
        }
    }

    buyItem(item) {
        if (this.game.clicks >= item.cost) {
            super.buyItem(item);

            this.game.updateClickCounter();
        }
    }

    getItemClicksPerSecond(item) {
        return item.owned * item.power * item.multiplier * this.game.globalClickMultiplier;
    }
}