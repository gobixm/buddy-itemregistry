import * as _ from 'lodash';

export class Spell {

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.castTime = data.castTime;
        this.range = data.range;
        this.cooldown = data.cooldown;
    }

    id: number;
    name: string;
    icon: string;
    description: string;
    castTime: string;
    range: string;
    cooldown: string;
}

export class ItemSpell {

    constructor(data: any) {
        this.spellId = data.spellId;
        this.nCharges = data.nCharges;
        this.consumable = data.consumable;
        this.categoryId = data.categoryId;
        this.trigger = data.trigger;
        if(_.some(data.spell)){
            this.spell = new Spell(data.spell);
        }
    }

    spellId: number;
    spell: Spell;
    nCharges: number;
    consumable: boolean;
    categoryId: number;
    trigger: string;
}