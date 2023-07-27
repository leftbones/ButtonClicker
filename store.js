const storePanel = document.getElementById("storeItemsBox");

const storeItems = [
    clicker, superClicker
];

var buyAmount = 1;

var buyStoreItem = function(item) {
    for (let i = 0; i < buyAmount; i++) {
        if (clicks >= item.cost) {
            clicks = Decimal.sub(clicks, item.cost);
            userStats["Clicks Spent"] += item.cost;

            item.owned++;
            userStats["Items Purchased"]++;

            item.cost = Math.ceil(item.cost * item.cost_increase_multiplier);
            
            let clicksPerSecond = item.owned * (item.click_power * item.power_multiplier);
            if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);

            let itemLabel = document.getElementById("storeItemLabel_" + item.id);
            itemLabel.innerHTML = item.name + " <span style='font-size: 0.75rem;'>(" + item.owned + ", " + clicksPerSecond + " CPS)</span>";

            let itemButton = document.getElementById("storeItemButton_" + item.id);
            itemButton.innerHTML = item.cost + "C";

            updateClickCounter();
        }
    }
}

var updateStore = function() {
    setupStore();

    for (let i = 0; i < storeItems.length; i++) {
        let item = storeItems[i];
        if (item.is_unlocked) {
            let itemButton = document.getElementById("storeItemButton_" + item.id);

            if (clicks >= item.cost * buyAmount) itemButton.disabled = false;
            else itemButton.disabled = true;
        }
    }
}

var setupStore = function() {
    for (let i = 0; i < storeItems.length; i++) {
        let item = storeItems[i];
        if (!item.is_unlocked && item.unlock_req()) {
            item.is_unlocked = true;

            var itemHbox = document.createElement("div");
            var itemLabel = document.createElement("p");
            var itemButton = document.createElement("button");

            itemHbox.classList.add("hbox");
            itemLabel.classList.add("body", "size-6", "align-c", "margin-0");
            itemButton.classList.add("button", "size-4");

            itemLabel.innerHTML = item.name;
            itemLabel.setAttribute("id", "storeItemLabel_" + item.id);

            itemButton.innerHTML = item.cost + "C";
            itemButton.setAttribute("id", "storeItemButton_" + item.id);
            itemButton.addEventListener("click", function() { buyStoreItem(item); }, false);

            itemHbox.appendChild(itemLabel);
            itemHbox.appendChild(itemButton);

            storePanel.appendChild(itemHbox);
        }
    }
}