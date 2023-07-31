class Item {
    constructor(guid, name, desc, cost, unlock_req) {
        this.guid = guid;
        this.name = name;
        this.desc = desc;
        this.cost = cost;

        this.unlock_req = unlock_req;

        this.base_cost = cost;
        this.unlocked = false;
        this.owned = 0;
    }
}

class Store {
    constructor(name, element) {
        this.name = name;
        this.element = element;
        this.items = {};
        this.buyAmount = 1;
    }

    setup() {
        for (let i = 0; i < Object.keys(this.items).length; i++) {
            let item = this.items[i];
            if (!item.unlocked && item.unlock_req()) {
                item.unlocked = true;

                var itemHbox = document.createElement("div");
                var itemLabel = document.createElement("p");
                var itemButton = document.createElement("button");

                itemHbox.classList.add("hbox");
                itemLabel.classList.add("body", "size-6", "align-c", "margin-0");
                itemButton.classList.add("button", "size-4");

                itemLabel.innerHTML = item.name;
                itemLabel.setAttribute("id", item.guid + "Label");

                itemButton.innerHTML = formatNumber(calculateCost(item, buyAmount)) + "C";

                itemButton.setAttribute("id", item.guid + "Button");
                itemButton.addEventListener("click", function() { this.buyItem(item); }, false);

                itemHbox.appendChild(itemLabel);
                itemHbox.appendChild(itemButton);

                this.element.appendChild(itemHbox);
            }
        }
    }

    update() {
        this.setup();

        for (let i = 0; i < Object.keys(this.items).length; i++) {
            let item = storeItems[i];
            if (item.unlocked) {
                let itemButton = document.getElementById(item.guid + "Button");

                if (clicks >= item.cost * this.buyAmount) itemButton.disabled = false;
                else itemButton.disabled = true;

                itemButton.innerHTML = formatNumber(calculateCost(item, this.buyAmount)) + "C";
            }
        }
    }

    addItem(name, item) {
        // this.items.put(name, item);
        this.items[name] = item;
    }

    removeItem(name) {
        this.items.delete(name);
    }

    buyItem(name) {
        let item = this.items[name];

        for (let i = 0; i < this.buyAmount; i++) {
            if (clicks < item.cost) break;

            clicks = Decimal.sub(clicks, item.cost);
            item.owned++;

            userStats["Items Purchased"]++;
            userStats["Clicks Spent"] += item.cost;

            item.cost = Math.ceil(item.cost * costMultiplier);

            // Label
            let itemLabel = document.getElementById(item.guid + "Label");
            let clicksPerSecond = item.owned * (item.click_power * item.power_multiplier);
            if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);
            itemLabel.innerHTML = item.name + " <span style='font-size: 0.75rem;'>(" + formatNumber(item.owned) + ", " + clicksPerSecond + " CPS)</span>";

            // Button
            let itemButton = document.getElementById(item.guid + "Button");
            itemButton.innerHTML = formatNumber(item.cost) + "C";

            updateClickCounter();
        }
    }
}