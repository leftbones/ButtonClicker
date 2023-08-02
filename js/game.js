// TODO
// - Reimplement Button scrubbing
// - Reimplement Button Faces

class Game {
    // Elements
    #theButton = document.getElementById("theButton");
    #clickCounter = document.getElementById("clickCounter");

    // Other
    #clicksDecimal = new Decimal(0);

    // Constructor
    constructor() {
        // Core
        this.button = new Button();

        // Properties
        this.clickPower = 1.0;
        this.clickPowerMultiplier = 1.0;

        this.globalClickMultiplier = 1.0;

        // Events
        this.#theButton.addEventListener("click", () => { this.clickButton(); });

        // Intervals
        setInterval(() => { autoClick(); }, 1000);

        // Finish
        this.#clickCounter.innerHTML = 0;
        this.#theButton.innerHTML = this.button.currentFace;
    }

    get clicks() { return Number(this.#clicksDecimal).toFixed(); }
    get clicksFormatted() { return formatNumber(this.clicks); }

    // Click count manipulation
    updateClickCounter() { this.#clickCounter.innerHTML = formatNumber(this.clicks); }
    addClicks(n) { this.#clicksDecimal = Decimal.add(this.#clicksDecimal, n * this.globalClickMultiplier); this.updateClickCounter(); }
    subClicks(n) { this.#clicksDecimal = Decimal.sub(this.#clicksDecimal, n); this.updateClickCounter(); }

    // Button interaction
    setButtonFace(face) { this.#theButton.innerHTML = face; }

    clickButton() {
        this.addClicks(1);
        this.setButtonFace(this.button.getRandomFace());
    }

    autoClick() {

    } 
}