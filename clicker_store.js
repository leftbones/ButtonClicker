class ClickerItem extends Item {
    constructor(id, name, desc, cost, unlock_req, do_on_unlock, power, multiplier) {
        super(id, name, desc, cost, unlock_req, do_on_unlock);

        this.power = power;
        this.multiplier = multiplier;
    }

    getClicks() {
        return this.owned * (this.power * this.multiplier) * globalClickMultiplier;
    }
    
    updateLabel() {
        let itemLabel = document.getElementById("storeItemLabel_" + this.id);

        let clicksPerSecond = this.getClicks();
        if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);

        itemLabel.innerHTML = this.name + " <span style='font-size: 0.75rem;'>(" + formatNumber(this.owned) + ", " + clicksPerSecond + " CPS)</span>";
    }

    updateButton() {
        let itemButton = document.getElementById("storeItemButton_" + this.id);
        itemButton.innerHTML = formatNumber(this.cost) + "C";

        if (totalClicks() < this.cost) {
            itemButton.disabled = true;
        } else {
            itemButton.disabled = false;
        }
    }
}

class ClickerStore extends Store {
    constructor(element) {
        super("Clickers", element);

        this.items["Clicker"] =  new ClickerItem(
            100,
            "Clicker",
            "Clicks the Button 1 time every 10 seconds",
            15,
            function() { return true; },
            function() { return; },
            0.1,
            1.0
        );

        this.items["Super Clicker"] = new ClickerItem(
            101,
            "Super Clicker",
            "Clicks the Button 1 time every second",
            100,
            function() { return totalClicks() >= 75 && clickerStore.items["Clicker"].owned > 0; },
            function() { return; },
            1.0,
            1.0
        );
    }

    update() {
        super.update();

        for (let i in this.items) {
            let item = this.items[i];

            if (item.unlocked) {
                if (item.owned > 0) item.updateLabel();
                item.updateButton();
            }
        }
    }

    buyItem(name) {
        if (totalClicks() >= this.items[name].cost) {
            super.buyItem(name);
            userStats["Items Purchased"]++;

            updateClickCounter();
        }
    }
}