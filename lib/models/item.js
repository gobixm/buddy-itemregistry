"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const item_source_1 = require("./item-source");
const item_spell_1 = require("./item-spell");
class Item {
    constructor(originalData) {
        this.id = 0;
        this.description = undefined;
        this.name = undefined;
        this.icon = undefined;
        this.stackable = undefined;
        this.itemBind = undefined;
        this.buyPrice = 0;
        this.itemClass = 0;
        this.itemSubClass = 0;
        this.containerSlots = 0;
        this.inventoryType = 0;
        this.equippable = false;
        this.itemLevel = 0;
        this.maxCount = 0;
        this.maxDurability = 0;
        this.minFactionId = 0;
        this.minReputation = 0;
        this.quality = 0;
        this.sellPrice = 0;
        this.requiredSkill = 0;
        this.requiredLevel = 0;
        this.requiredSkillRank = 0;
        this.baseArmor = 0;
        this.hasSockets = false;
        this.isAuctionable = true;
        this.armor = 0;
        this.displayInfoId = 0;
        this.nameDescription = "";
        this.nameDescriptionColor = "";
        this.upgradable = false;
        this.heroicTooltip = false;
        this.context = "";
        this.availableContexts = [];
        this.artifactId = 0;
        this.originalData = _.cloneDeep(originalData);
        this._type = originalData.itemClass;
        let keys = _.keys(this);
        let data = _.pick(originalData, keys);
        _.assign(this, data);
        if (originalData.itemSource) {
            this.itemSource = new item_source_1.ItemSource(originalData.itemSource);
        }
        if (_.some(originalData.itemSpells)) {
            this.itemSpells = _.map(originalData.itemSpells, itemSpell => new item_spell_1.ItemSpell(itemSpell));
        }
    }
}
exports.Item = Item;
//# sourceMappingURL=item.js.map