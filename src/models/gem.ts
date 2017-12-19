import {Item} from "./item";
import {Bonus} from "./bonus";

const example = {
    "gemInfo": {
        "bonus": {},
        "type": {
            "type": "PRISMATIC"
        },
        "minItemLevel": 680
    }
};

export class Gem extends Item {
    bonus: Bonus;
    type: string;
    minItemLevel: string;
}