"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Spell {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.castTime = data.castTime;
        this.range = data.range;
        this.cooldown = data.cooldown;
    }
}
exports.Spell = Spell;
class ItemSpell {
    constructor(data) {
        this.spellId = data.spellId;
        this.nCharges = data.nCharges;
        this.consumable = data.consumable;
        this.categoryId = data.categoryId;
        this.trigger = data.trigger;
        if (_.some(data.spell)) {
            this.spell = new Spell(data.spell);
        }
    }
}
exports.ItemSpell = ItemSpell;
//# sourceMappingURL=item-spell.js.map