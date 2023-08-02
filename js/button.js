// TODO: Change rareFaces dictionary to be `face : chance` so multiple faces can have the same chance
// That involves changing `getRareFace` to do `if (chance(this.rareFaces[i])) return i`

class Button {
    constructor() {
        // Faces
        this.faces = [":-)", ":-O", ":-o", ":-B", ":-/", ":-U", ":-(", ":-S", ":-D", ":-V", ":-P", ":-X", ":-L", ":-b", ":-T", ":-I", ":-C", ":-|", ":-$", ":-*", ":-Y", ":-3", ":->", ":-<", ":-]"];
        this.rareFaces = {
            1.00: "ಠ_ಠ",
            1.50: "シ",
            2.50: "face",
            4.00: "._.",
            4.20: "B-)",
            5.00: ": - )",
            5.50: ":)",
            6.66: ">:-)",
            7.77: ":o)",
            8.00: "::::-)",
            9.99: "=-)",
            10.00: "(-:",
            12.00: ":^)",
            15.00: ";-)",
        };

        // Properties
        this.currentFace = this.faces[0];

        this.faceSwapChance = 20;
        this.rareFaceChance = 5;

        this.faceSwapChanceMultiplier = 1.0;
        this.rareFaceChanceMultiplier = 1.0;
    }

    // Roll for a Rare Face ordered by rarity ascending, return the current Face if all rolls fail
    getRareFace() {
        for (let i in this.rareFaces) {
            if (chance(i)) return this.rareFaces[i];
        }

        return this.currentFace;
    }

    // Roll to randomize the Button Face
    getRandomFace() {
        if (chance(this.faceSwapChance * this.faceSwapChanceMultiplier)) {
            let face = this.currentFace;
            if (chance(this.rareFaceChance * this.rareFaceChanceMultiplier)) face = this.getRareFace();
            else face = this.faces[Math.floor(Math.random() * this.faces.length)];

            this.currentFace = face;
            return this.currentFace;
        }

        return this.currentFace;
    }
}