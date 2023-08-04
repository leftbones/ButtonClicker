class Clicker extends Item {
    constructor(name, desc, cost, unlock_req, do_on_unlock, power, multiplier) {
        super(name, desc, cost, unlock_req, do_on_unlock);

        this.power = power;
        this.multiplier = multiplier;
    }

    getTotalClicks(game) {
        let multi = this.multiplier;

        // Clicker Bonus I
        if (game.upgradeStore.items["Clicker Bonus I"].owned)
            multi += (0.05 * game.clickerStore.items["Super Clicker"].owned);

        // Clicker Bonus II
        if (game.upgradeStore.items["Clicker Bonus II"].owned)
            multi += (0.05 * game.clickerStore.items["Super Clicker"].owned);

        return this.owned * (this.power * multi);
    }
}