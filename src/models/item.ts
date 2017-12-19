import {BonusSummary} from './bonus-summary';
import * as _ from 'lodash';

export class Item {
    constructor(originalData: any) {
        this.originalData = _.cloneDeep(originalData);
        let keys = _.keys(this);

        let data = _.pick(originalData, keys);
        _.assign(this, data);
    }

    //original data
    originalData: any = {};
    id: number = 0;
    description?: string = undefined;
    name?: string = undefined;
    icon?: string = undefined;
    stackable?: number = undefined;
    itemBind?: number = undefined;
    bonusStats: any[] = [];
    itemSpells: any[] = [];
    buyPrice: number = 0;
    itemClass: number = 0;
    itemSubClass: number = 0;
    containerSlots: number = 0;
    inventoryType: number = 0;
    equippable: boolean = 0;
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
    hasSockets: bool = false;
    isAuctionable: true = true;
    armor: number = 0;
    displayInfoId: number = 0;
    nameDescription: string = '';
    nameDescriptionColor: string = '';
    upgradable: boolean = '';
    heroicTooltip: boolean = '';
    context: string = '';
    bonusLists: any[] = [];
    availableContexts: string[] = [];
    bonusSummary: BonusSummary = undefined;
    artifactId: number = 0;
}