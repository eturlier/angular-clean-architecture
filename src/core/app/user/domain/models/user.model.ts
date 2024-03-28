import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

export class User extends BaseEntity {
    private _name: string;

    constructor(obj: unknown) {
        super(obj);
        this._name = (obj as { name: string })?.name;
    }

    get name(): string {
        return this._name;
    }
}
