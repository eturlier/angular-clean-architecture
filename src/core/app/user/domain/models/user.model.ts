import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

export class User extends BaseEntity {
    constructor(
        _json: { [key: string]: unknown },
        private _name: string
    ) {
        super(_json);
    }

    get name(): string {
        return this._name;
    }
}
