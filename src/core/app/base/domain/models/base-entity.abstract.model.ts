import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * Class permettant de définir les information partagé pour une entité.
 */
export abstract class BaseEntity {
    constructor(private _json: KeyValueObject) {}

    get json(): KeyValueObject {
        return this._json;
    }

    get id(): string {
        return this._json['id'] as string;
    }

    get isEdited(): boolean {
        return this._json['isEdited'] as boolean;
    }
}
