import {Item} from "./item";
import * as _ from "lodash";

class Damage {

    constructor(data: any) {
        this.min = data.min;
        this.max = data.max;
        this.exactMin = data.exactMin;
        this.exactMax = data.exactMax;
    }

    min: number;
    max: number;
    exactMin: number;
    exactMax: number;
}

export class Weapon extends Item {
    constructor(originalData: any) {
        super(originalData);

        if (_.some(originalData.weaponInfo)) {
            this.weaponSpeed = originalData.weaponInfo.weaponSpeed;
            this.dps = originalData.weaponInfo.dps;
            this.damage = new Damage(originalData.weaponInfo.damage);
        }
    }

    weaponSpeed: number;
    dps: number;
    damage: Damage;
}