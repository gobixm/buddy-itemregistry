import {Weapon} from "../src/models/weapon";

describe('constructed', () => {
    it('weapon info loaded', () => {
        let data = {
            "weaponInfo": {
                "damage": {
                    "min": 75,
                    "max": 98,
                    "exactMin": 75,
                    "exactMax": 98
                },
                "weaponSpeed": 3.6,
                "dps": 24.027779
            }
        };

        const item = new Weapon(data);
        expect(item.dps).toEqual(24.027779);
        expect(item.damage.exactMin).toEqual(75);
    });
});