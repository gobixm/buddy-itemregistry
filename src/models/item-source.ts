export class ItemSource {
    sourceId: number;
    sourceType: string;

    constructor(itemSource: any) {
        this.sourceId = itemSource.sourceId;
        this.sourceType = itemSource.sourceType;
    }
}

const example = {
    sourceId: 195848,
    sourceType: "CREATED_BY_SPELL"
};
