"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./item");
const _ = require("lodash");
class Damage {
    constructor(data) {
        this.min = data.min;
        this.max = data.max;
        this.exactMin = data.exactMin;
        this.exactMax = data.exactMax;
    }
}
class Weapon extends item_1.Item {
    constructor(originalData) {
        super(originalData);
        if (_.some(originalData.weaponInfo)) {
            this.weaponSpeed = originalData.weaponInfo.weaponSpeed;
            this.dps = originalData.weaponInfo.dps;
            this.damage = new Damage(originalData.weaponInfo.damage);
        }
    }
}
exports.Weapon = Weapon;
//# sourceMappingURL=weapon.js.map