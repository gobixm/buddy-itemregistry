import {Gem} from "../src/models/gem";

describe('constructed', () => {
    it('gem info loaded', () => {
        let data = {
            "gemInfo": {
                "bonus": {
                    "name": "+200 к силе",
                    "srcItemId": 130246,
                    "requiredSkillId": 0,
                    "requiredSkillRank": 0,
                    "minLevel": 11,
                    "itemLevel": 1
                },
                "type": {
                    "type": "PRISMATIC"
                },
                "minItemLevel": 680
            }
        };

        const item = new Gem(data);
        expect(item.minItemLevel).toEqual(680);
        expect(item.type).toEqual('PRISMATIC');
        expect(item.bonus.name).toEqual('+200 к силе');
    });
});