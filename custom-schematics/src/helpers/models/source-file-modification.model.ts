export class SourceFileModification {
    index: number;
    toAdd?: any;

    constructor(index: number, toAdd?: any) {
        this.index = index;
        this.toAdd = toAdd;
    }
}
