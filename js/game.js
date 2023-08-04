// TODO
// - Reimplement Button scrubbing
// - Reimplement Button Faces

class Game {
    // Elements
    #theButton = document.getElementById("theButton");
    #clickCounter = document.getElementById("clickCounter");
    #clickerStoreBox = document.getElementById("clickerStoreBox");
    #upgradeStoreBox = document.getElementById("upgradeStoreBox");
    #userStatsBox = document.getElementById("userStatsBox");
    #cheatAdd10Button = document.getElementById("cheatAdd10");
    #cheatAdd100Button = document.getElementById("cheatAdd100");
    #cheatAdd1000Button = document.getElementById("cheatAdd1000");
    #cheatAdd10000Button = document.getElementById("cheatAdd10000");

    // Intervals
    #buttonHeldInterval;

    // Other
    #clicksDecimal = new Decimal(0);

    // Constructor
    constructor() {
        this.#theButton.innerHTML = "x_x"; // If this face appears, something is broken

        // Core
        this.button = new Button(this, this.#theButton);
        this.secrets = new Secrets(this);
        this.stats = new Stats(this, this.#userStatsBox);
        this.clickerStore = new ClickerStore(this, this.#clickerStoreBox);
        this.upgradeStore = new UpgradeStore(this, this.#upgradeStoreBox);

        // Properties
        this.clickPower = 1.0;
        this.buttonHeldRepeatRate = 50;

        // Flags
        this.buttonIsHeld = false;
        this.buttonIsScrubbed = false;

        this.cheatsEnabled = false;

        // Multipliers
        this.globalClickMultiplier = 1.0;
        this.clickPowerMultiplier = 1.0;
        this.itemCostMultiplier = 1.1;

        // Events
        this.#theButton.addEventListener("click", () => { this.clickButton(); });

        this.#theButton.addEventListener("mousedown", () => {
            this.buttonIsHeld = true;
            this.#buttonHeldInterval = setInterval(() => { this.clickButton(); }, this.buttonHeldRepeatRate);
        });

        document.addEventListener("mouseup", () => {
            this.buttonIsHeld = false;
            clearInterval(this.#buttonHeldInterval);
        });

        // Intervals
        setInterval(() => { this.stats.update(); }, 2500);
        setInterval(() => { this.autoClick(); }, 1000);

        setInterval(() => { this.clickerStore.update(); }, 50);
        setInterval(() => { this.upgradeStore.update(); }, 50);

        // Cheats
        this.#cheatAdd10Button.addEventListener("click", () => { this.addClicks(10); });
        this.#cheatAdd100Button.addEventListener("click", () => { this.addClicks(100); });
        this.#cheatAdd1000Button.addEventListener("click", () => { this.addClicks(1000); });
        this.#cheatAdd10000Button.addEventListener("click", () => { this.addClicks(10000); });

        // Finish
        this.#clickCounter.innerHTML = 0;
        this.#theButton.innerHTML = this.button.currentFace;
    }

    get clicks() { return Number(this.#clicksDecimal.toFixed()); }
    get clicksFormatted() { return formatNumber(this.clicks); }

    // Click count manipulation
    updateClickCounter() { this.#clickCounter.innerHTML = this.clicksFormatted; }
    addClicks(n) { this.#clicksDecimal = Decimal.add(this.#clicksDecimal, n * this.globalClickMultiplier); this.updateClickCounter(); }
    subClicks(n) { this.#clicksDecimal = Decimal.sub(this.#clicksDecimal, n); this.updateClickCounter(); }

    clickButton() {
        let multi = this.clickPowerMultiplier;

        // Clicker Bonus I
        if (this.upgradeStore.items["Clicker Bonus I"].owned)
            multi += (0.05 * this.clickerStore.items["Super Clicker"].owned);

        // Clicker Bonus II
        if (this.upgradeStore.items["Clicker Bonus II"].owned)
            multi += (0.05 * this.clickerStore.items["Super Clicker"].owned);

        let clicks = this.clickPower * multi;

        this.addClicks(clicks);
        this.button.faceRoll();

        this.stats.entries["Normal Clicks"] += clicks;
    }

    autoClick() {
        for (let i in this.clickerStore.items) {
            let item = this.clickerStore.items[i];
            if (item.owned) {
                let clicks = item.getTotalClicks(this);

                this.addClicks(clicks);
                this.stats.entries["Auto Clicks"] += clicks;
            }
        }
    } 
}