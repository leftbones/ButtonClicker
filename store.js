const storePanel = document.getElementById("storeItemsBox");

const buy1Button = document.getElementById("buy1Button");
const buy10Button = document.getElementById("buy10Button");
const buy100Button = document.getElementById("buy100Button");
// const buyMaxButton = document.getElementById("buyMaxButton");

const storeItems = [
    clicker, superClicker
];

var buyAmount = 1;
var buyMaximum = false;

var setStoreBuyAmount = function(n) {
    buy1Button.disabled = false;
    buy10Button.disabled = false;
    buy100Button.disabled = false;
    // buyMaxButton.disabled = false;

    switch(n) {
        case 0:
            buyAmount = 1;
            buyMaximum = false;
            buy1Button.disabled = true;
            break;
        case 1:
            buyAmount = 10;
            buyMaximum = false;
            buy10Button.disabled = true;
            break;
        case 2:
            buyAmount = 100;
            buyMaximum = false;
            buy100Button.disabled = true;
            break;
        // case 3:
        //     buyMaximum = true;
        //     buyMaxButton.disabled = true;
        //     break;
    }

    updateStore();
}

var buyStoreItem = function(item) {
    if (buyMaximum) { 
        while (clicks >= item.cost) {
            clicks = Decimal.sub(clicks, item.cost);
            userStats["Clicks Spent"] += item.cost;

            item.owned++;
            userStats["Items Purchased"]++;

            item.cost = Math.ceil(item.cost * costMultiplier);
            
            let clicksPerSecond = item.owned * (item.click_power * item.power_multiplier);
            if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);

            let itemLabel = document.getElementById("storeItemLabel_" + item.id);
            itemLabel.innerHTML = item.name + " <span style='font-size: 0.75rem;'>(" + formatNumber(item.owned) + ", " + clicksPerSecond + " CPS)</span>";

            let itemButton = document.getElementById("storeItemButton_" + item.id);
            itemButton.innerHTML = formatNumber(item.cost) + "C";

            updateClickCounter();
        }
    } else {
        for (let i = 0; i < buyAmount; i++) {
            if (clicks >= item.cost) {
                clicks = Decimal.sub(clicks, item.cost);
                userStats["Clicks Spent"] += item.cost;

                item.owned++;
                userStats["Items Purchased"]++;

                item.cost = Math.ceil(item.cost * costMultiplier);
                
                let clicksPerSecond = item.owned * (item.click_power * item.power_multiplier);
                if (!Number.isInteger(clicksPerSecond)) clicksPerSecond = clicksPerSecond.toFixed(2);

                let itemLabel = document.getElementById("storeItemLabel_" + item.id);
                itemLabel.innerHTML = item.name + " <span style='font-size: 0.75rem;'>(" + formatNumber(item.owned) + ", " + clicksPerSecond + " CPS)</span>";

                let itemButton = document.getElementById("storeItemButton_" + item.id);
                itemButton.innerHTML = formatNumber(item.cost) + "C";

                updateClickCounter();
            }
        }
    }
}

var updateStore = function() {
    setupStore();

    for (let i = 0; i < storeItems.length; i++) {
        let item = storeItems[i];
        if (item.is_unlocked) {
            let itemButton = document.getElementById("storeItemButton_" + item.id);

            if (buyMaximum) {
                if (clicks >= itemCost) itemButton.disabled = false;
                else itemButton.disabled = true;

                itemButton.innerHTML = item.cost + "C";
            } else {
                if (clicks >= item.cost * buyAmount) itemButton.disabled = false;
                else itemButton.disabled = true;

                itemButton.innerHTML = formatNumber(calculateCost(item, buyAmount)) + "C";
            }
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

            if (buyMaximum) {
                itemButton.innerHTML = item.cost + "C";
            } else {
                itemButton.innerHTML = formatNumber(calculateCost(item, buyAmount)) + "C";
            }

            itemButton.setAttribute("id", "storeItemButton_" + item.id);
            itemButton.addEventListener("click", function() { buyStoreItem(item); }, false);

            itemHbox.appendChild(itemLabel);
            itemHbox.appendChild(itemButton);

            storePanel.appendChild(itemHbox);
        }
    }
}