import { BonusSummary } from "./bonus-summary";
import * as _ from "lodash";
import { ItemSource } from "./item-source";
import { ItemClass } from "./item-class";
import { ItemSpell } from "./item-spell";

export class Item {
    constructor(originalData: any) {
        this.originalData = _.cloneDeep(originalData);
        this._type = originalData.itemClass;

        let keys = _.keys(this);

        let data = _.pick(originalData, keys);
        _.assign(this, data);
        if (originalData.itemSource) {
            this.itemSource = new ItemSource(originalData.itemSource);
        }
        if (_.some(originalData.itemSpells)) {
            this.itemSpells = _.map(
                originalData.itemSpells,
                itemSpell => new ItemSpell(itemSpell)
            );
        }
    }

    //original data
    originalData: any;
    _type: ItemClass;

    bonusSummary?: BonusSummary;
    itemSource?: ItemSource;

    id: number = 0;
    description?: string = undefined;
    name?: string = undefined;
    icon?: string = undefined;
    stackable?: number = undefined;
    itemBind?: number = undefined;
    bonusStats: any[];
    itemSpells: ItemSpell[];
    buyPrice: number = 0;
    itemClass: number = 0;
    itemSubClass: number = 0;
    containerSlots: number = 0;
    inventoryType: number = 0;
    equippable: boolean = false;
    itemLevel: number = 0;
    maxCount: number = 0;
    maxDurability: number = 0;
    minFactionId: number = 0;
    minReputation: number = 0;
    quality: number = 0;
    sellPrice: number = 0;
    requiredSkill: number = 0;
    requiredLevel: number = 0;
    requiredSkillRank: number = 0;
    baseArmor: number = 0;
    hasSockets: boolean = false;
    isAuctionable: true = true;
    armor: number = 0;
    displayInfoId: number = 0;
    nameDescription: string = "";
    nameDescriptionColor: string = "";
    upgradable: boolean = false;
    heroicTooltip: boolean = false;
    context: string = "";
    bonusLists: any[];
    availableContexts: string[] = [];
    artifactId: number = 0;
}
