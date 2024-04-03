/**
 * Class permettant de définir les information partagé pour une entité.
 */
export abstract class BaseEntity {
    constructor(private _json: { [key: string]: unknown }) {}

    get json(): { [key: string]: unknown } {
        return this._json;
    }

    get id(): string {
        return this._json['id'] as string;
    }
}
