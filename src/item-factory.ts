import {Item} from "./models/item";
import {ItemClass} from "./models/item-class";
import {Gem} from "./models/gem";

export class ItemFactory {
    static create(json: any): Item {
        if (!json.itemClass) {
            throw new Error(`unknown item class for item ${json.id}`);
        }
        let itemClass = json.itemClass as ItemClass;
        switch (itemClass) {
            case ItemClass.Gem:
                return new Gem(json);
            default:
                return new Item(json);
        }
    }
}