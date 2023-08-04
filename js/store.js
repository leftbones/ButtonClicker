// Base Item Class
class Item {
    constructor(name, desc, cost, unlock_req, do_on_buy) {
        this.id = getGUID();
        this.name = name;
        this.desc = desc;
        this.cost = cost;

        this.unlock_req = unlock_req;
        this.do_on_buy = do_on_buy;

        this.base_cost = cost;
        this.unlocked = false;

        this.owned = 0;
    }
}

// Base Store Class
class Store {
    constructor(game, element) {
        this.game = game;
        this.element = element;

        this.items = {};
    }

    update() {
        this.checkUnlocks();
    }

    buyItem(item) {
        item.owned++;

        this.game.subClicks(item.cost);
        item.cost = Math.ceil(item.cost * this.game.itemCostMultiplier);
    }

    checkUnlocks() {
        for (let i in this.items) {
            let item = this.items[i];
            if (!item.unlocked && item.unlock_req()) {
                item.unlocked = true;

                let itemHbox = document.createElement("div");
                let itemLabel = document.createElement("p");
                let itemButton = document.createElement("button");

                itemHbox.classList.add("hbox");
                itemHbox.setAttribute("id", "storeItem_" + item.id);

                itemLabel.classList.add("body", "size-6", "align-c", "margin-0");
                itemButton.classList.add("button", "size-4");

                itemLabel.innerHTML = item.name;
                itemLabel.setAttribute("id", "storeItemLabel_" + item.id);

                itemButton.innerHTML = formatNumber(item.cost) + "C";

                itemButton.setAttribute("id", "storeItemButton_" + item.id);
                itemButton.addEventListener("click", () => { this.buyItem(item); }, false);

                itemHbox.appendChild(itemLabel);
                itemHbox.appendChild(itemButton);

                this.element.appendChild(itemHbox);                
            }
        }
    }
}