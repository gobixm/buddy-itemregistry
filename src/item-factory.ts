import { Item } from "./models/item";
import { ItemClass } from "./models/item-class";
import { Gem } from "./models/gem";
import { Consumable } from "./models/consumable";
import { Container } from "./models/container";
import { Enchant } from "./models/enchant";
import { Receipt } from "./models/receipt";
import { Glyph } from "./models/glyph";
import { Key } from "./models/key";
import { Armor } from "./models/armor";
import { TradeGood } from "./models/trade-good";
import { Weapon } from "./models/weapon";
import { Misc } from "./models/misc";
import { Token } from "./models/token";
import logger from "./log";

export class ItemFactory {
    static create(json: any): Item {
        if (json.itemClass === undefined) {
            logger.error("unknown item class", { item: json });
            throw new Error(`unknown item class for item ${json.id}`);
        }
        let itemClass = json.itemClass as ItemClass;
        switch (itemClass) {
            case ItemClass.Consumable:
                return new Consumable(json);
            case ItemClass.Container:
                return new Container(json);
            case ItemClass.Weapon:
                return new Weapon(json);
            case ItemClass.Gem:
                return new Gem(json);
            case ItemClass.Armor:
                return new Armor(json);
            case ItemClass.Enchant:
                return new Enchant(json);
            case ItemClass.Receipt:
                return new Receipt(json);
            case ItemClass.Glyph:
                return new Glyph(json);
            case ItemClass.Key:
                return new Key(json);
            case ItemClass.Misc:
                return new Misc(json);
            case ItemClass.Token:
                return new Token(json);
            case ItemClass.TradeGoods:
                return new TradeGood(json);
            default:
                return new Item(json);
        }
    }
}
