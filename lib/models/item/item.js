"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Item {
    constructor(originalData) {
        this.originalData = _.cloneDeep(originalData);
        let keys = _.keys(this);
        let data = _.pick(originalData, keys);
        _.assign(this, data);
    }
}
exports.Item = Item;
let example = {
    "id": 130215,
    "description": "",
    "name": "Смертоносный темный янтарь",
    "icon": "inv_jewelcrafting_70_cutgem02_orange",
    "stackable": 200,
    "itemBind": 0,
    "bonusStats": [],
    "itemSpells": [],
    "buyPrice": 0,
    "itemClass": 3,
    "itemSubClass": 5,
    "containerSlots": 0,
    "gemInfo": {
        "bonus": {
            "name": "+100 к показателю критического удара",
            "srcItemId": 130215,
            "requiredSkillId": 0,
            "requiredSkillRank": 0,
            "minLevel": 0,
            "itemLevel": 1
        },
        "type": {
            "type": "PRISMATIC"
        },
        "minItemLevel": 680
    },
    "inventoryType": 0,
    "equippable": false,
    "itemLevel": 101,
    "maxCount": 0,
    "maxDurability": 0,
    "minFactionId": 0,
    "minReputation": 0,
    "quality": 2,
    "sellPrice": 0,
    "requiredSkill": 0,
    "requiredLevel": 1,
    "requiredSkillRank": 0,
    "itemSource": {
        "sourceId": 195848,
        "sourceType": "CREATED_BY_SPELL"
    },
    "baseArmor": 0,
    "hasSockets": false,
    "isAuctionable": true,
    "armor": 0,
    "displayInfoId": 0,
    "nameDescription": "",
    "nameDescriptionColor": "000000",
    "upgradable": true,
    "heroicTooltip": false,
    "context": "",
    "bonusLists": [],
    "availableContexts": [""],
    "bonusSummary": {
        "defaultBonusLists": [],
        "chanceBonusLists": [],
        "bonusChances": []
    },
    "artifactId": 0
};
//# sourceMappingURL=item.js.map