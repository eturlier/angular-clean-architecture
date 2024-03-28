/**
 * Class permettant de définir les information partagé pour une entité.
 */
export abstract class BaseEntity {
    private _id: string;

    constructor(private _obj: unknown) {
        this._id = (_obj as { id: string })?.id;
    }

    get id(): string {
        return this._id;
    }
}
