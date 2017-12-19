import {Item} from "../src/models/item";

describe('item constructed', () => {
    it('from json', () => {
        let data = {
            "_id": 142117,
            "id": 142117,
            "description": "",
            "name": "Зелье длительной силы",
            "icon": "trade_alchemy_dpotion_a28",
            "stackable": 100,
            "itemBind": 0,
            "bonusStats": [],
            "itemSpells": [
                {
                    "spellId": 229206,
                    "spell": {
                        "id": 229206,
                        "name": "Зелье длительной силы",
                        "icon": "trade_alchemy_dpotion_a28",
                        "description": "При выпивании повышает все характеристики на 2 500 на 1 мин.",
                        "castTime": "Мгновенное применение",
                        "cooldown": "Время восстановления: 1 сек."
                    },
                    "nCharges": 1,
                    "consumable": true,
                    "categoryId": 4,
                    "trigger": "ON_USE"
                }
            ],
            "buyPrice": 20000,
            "itemClass": 0,
            "itemSubClass": 1,
            "containerSlots": 0,
            "inventoryType": 0,
            "equippable": false,
            "itemLevel": 110,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 1,
            "sellPrice": 5000,
            "requiredSkill": 0,
            "requiredLevel": 100,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 229220,
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

        const item = new Item(data);
        expect(item.originalData).toEqual(data);
        expect(item.id).toEqual(data.id);
        expect(item.sellPrice).toEqual(data.sellPrice);
        expect((item as any)._id).toBeUndefined();
    });

});