class Stats {
    constructor(game, element) {
        this.game = game;
        this.element = element;

        this.entries = {
            "Normal Clicks" : 0,
            "Auto Clicks" : 0,
            "Clicks Spent" : 0,
            "Items Purchased" : 0,
            "Upgrades Purchased" : 0,
            "Button Cleanliness" : 0,
            "Faces Collected" : 1,
            "Rare Faces Collected" : 0,
            "Rare Face Rolls" : 0,
            "Trophies Collected" : 0,
            "Secrets Found" : 0
        };

        this.setup();
    }

    update() {
        let i = 0;
        for (let stat in this.entries) {
            let statValue = document.getElementById("userStatValue_" + i);
            statValue.innerHTML = formatNumber(this.entries[stat]);
            i++;
        }
    }

    setup() {
        let i = 0;
        for (let stat in this.entries) {
            let statHbox = document.createElement("div");
            let statLabel = document.createElement("p");
            let statValue = document.createElement("p");

            statHbox.classList.add("hbox");
            statLabel.classList.add("body", "size-5", "margin-0");
            statValue.classList.add("body", "size-5", "text-right", "margin-0");

            statLabel.innerHTML = stat + ": ";

            statValue.innerHTML = this.entries[stat];
            statValue.setAttribute("id", "userStatValue_" + i);

            statHbox.appendChild(statLabel);
            statHbox.appendChild(statValue);

            this.element.appendChild(statHbox);
            i++;
        }
    }
}