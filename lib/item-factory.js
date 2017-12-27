"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./models/item");
const item_class_1 = require("./models/item-class");
const gem_1 = require("./models/gem");
const consumable_1 = require("./models/consumable");
const container_1 = require("./models/container");
const enchant_1 = require("./models/enchant");
const receipt_1 = require("./models/receipt");
const glyph_1 = require("./models/glyph");
const key_1 = require("./models/key");
const armor_1 = require("./models/armor");
const trade_good_1 = require("./models/trade-good");
const weapon_1 = require("./models/weapon");
const misc_1 = require("./models/misc");
const token_1 = require("./models/token");
const log_1 = require("./log");
class ItemFactory {
    static create(json) {
        if (json.itemClass === undefined) {
            log_1.default.error("unknown item class", { item: json });
            throw new Error(`unknown item class for item ${json.id}`);
        }
        let itemClass = json.itemClass;
        switch (itemClass) {
            case item_class_1.ItemClass.Consumable:
                return new consumable_1.Consumable(json);
            case item_class_1.ItemClass.Container:
                return new container_1.Container(json);
            case item_class_1.ItemClass.Weapon:
                return new weapon_1.Weapon(json);
            case item_class_1.ItemClass.Gem:
                return new gem_1.Gem(json);
            case item_class_1.ItemClass.Armor:
                return new armor_1.Armor(json);
            case item_class_1.ItemClass.Enchant:
                return new enchant_1.Enchant(json);
            case item_class_1.ItemClass.Receipt:
                return new receipt_1.Receipt(json);
            case item_class_1.ItemClass.Glyph:
                return new glyph_1.Glyph(json);
            case item_class_1.ItemClass.Key:
                return new key_1.Key(json);
            case item_class_1.ItemClass.Misc:
                return new misc_1.Misc(json);
            case item_class_1.ItemClass.Token:
                return new token_1.Token(json);
            case item_class_1.ItemClass.TradeGoods:
                return new trade_good_1.TradeGood(json);
            default:
                return new item_1.Item(json);
        }
    }
}
exports.ItemFactory = ItemFactory;
//# sourceMappingURL=item-factory.js.map