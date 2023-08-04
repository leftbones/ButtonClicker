class SuperClicker extends Item {
    constructor(name, desc, cost, unlock_req, do_on_unlock, power, multiplier) {
        super(name, desc, cost, unlock_req, do_on_unlock);

        this.power = power;
        this.multiplier = multiplier;
    }

    getTotalClicks(game) {
        return this.owned * this.power * this.multiplier;
    }
}