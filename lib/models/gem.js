"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./item");
const bonus_1 = require("./bonus");
class Gem extends item_1.Item {
    constructor(originalData) {
        super(originalData);
        this.minItemLevel = originalData.gemInfo.minItemLevel;
        this.type = originalData.gemInfo.type.type;
        this.bonus = new bonus_1.Bonus(originalData.gemInfo.bonus);
    }
}
exports.Gem = Gem;
//# sourceMappingURL=gem.js.map