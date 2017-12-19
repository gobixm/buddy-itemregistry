import {Item} from "./item";

class Damage {
    min: number;
    max: number;
    exactMin: number;
    exactMax: number;
}

export class Weapon extends Item {
    weaponSpeed: number;
    dps: number;
    damage: Damage;
}

const example = {
    "_id": 25150,
    "id": 25150,
    "disenchantingSkillRank": 275,
    "description": "",
    "name": "Сабля Оплота Чести",
    "icon": "inv_sword_24",
    "stackable": 1,
    "itemBind": 2,
    "bonusStats": [],
    "itemSpells": [],
    "buyPrice": 284687,
    "itemClass": 2,
    "itemSubClass": 7,
    "containerSlots": 0,
    "weaponInfo": {
        "damage": {
            "min": 51,
            "max": 86,
            "exactMin": 51,
            "exactMax": 86
        },
        "weaponSpeed": 2.6,
        "dps": 26.346155
    },
    "inventoryType": 13,
    "equippable": true,
    "itemLevel": 105,
    "maxCount": 0,
    "maxDurability": 75,
    "minFactionId": 0,
    "minReputation": 0,
    "quality": 2,
    "sellPrice": 56937,
    "requiredSkill": 0,
    "requiredLevel": 65,
    "requiredSkillRank": 0,
    "itemSource": {
        "sourceId": 0,
        "sourceType": "NONE"
    },
    "baseArmor": 0,
    "hasSockets": false,
    "isAuctionable": true,
    "armor": 0,
    "displayInfoId": 7485,
    "nameDescription": "",
    "nameDescriptionColor": "000000",
    "upgradable": true,
    "heroicTooltip": false,
    "context": "",
    "bonusLists": [],
    "availableContexts": [
        ""
    ],
    "bonusSummary": {
        "defaultBonusLists": [],
        "chanceBonusLists": [],
        "bonusChances": []
    },
    "artifactId": 0
};