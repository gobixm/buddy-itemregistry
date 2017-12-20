export class Bonus {

    constructor(data: any) {
        this.name = data.name;
        this.requiredSkillId = data.requiredSkillId;
        this.requiredSkillRank = data.requiredSkillRank;
        this.minLevel = data.minLevel;
        this.itemLevel = data.itemLevel;
    }

    name: string;
    requiredSkillId: number;
    requiredSkillRank: number;
    minLevel: number;
    itemLevel: number;
}