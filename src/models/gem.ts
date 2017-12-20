import {Item} from "./item";
import {Bonus} from "./bonus";

export class Gem extends Item {

    constructor(originalData: any) {
        super(originalData);
        this.minItemLevel = originalData.gemInfo.minItemLevel;
        this.type = originalData.gemInfo.type.type;
        this.bonus = new Bonus(originalData.gemInfo.bonus);
    }

    bonus: Bonus;
    type: string;
    minItemLevel: string;
}