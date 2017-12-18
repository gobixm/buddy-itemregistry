import {BonusSummary} from "./bonus-summary";

export class Item {
    id: number;
    description?: string;
    name?: string;
    icon?: string;
    stackable?: number;
    itemBind?: number;
    bonusStats: any[];
    itemSpells: any[];
    buyPrice: number;
    itemClass: number;
    itemSubClass: number;
    containerSlots: number;
    inventoryType: number;
    equippable: boolean;
    itemLevel: number;
    maxCount: number;
    maxDurability: number;
    minFactionId: number;
    minReputation: number;
    quality: number;
    sellPrice: number;
    requiredSkill: number;
    requiredLevel: number;
    requiredSkillRank: number;
    baseArmor: number;
    hasSockets: false;
    isAuctionable: true;
    armor: number;
    displayInfoId: number;
    nameDescription: string;
    nameDescriptionColor: string;
    upgradable: boolean;
    heroicTooltip: boolean;
    context: string;
    bonusLists: any[];
    availableContexts: string[];
    bonusSummary: BonusSummary;
    artifactId: number;
}

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