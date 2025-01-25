import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * La classe `AbstractBaseBuilder` permet d'avoir un constructeur de l'objet `T extends BaseEntity` avec un simple object json.
 * Elle utilise le pattern Builder pour créer des instances de `T extends BaseEntity`.
 */
export abstract class AbstractBaseBuilder<T extends BaseEntity> {
    protected _json: KeyValueObject = {};
    protected _id: string = '';

    /**
     * Initialiser l'instance avec l'objet json en entrée
     * @param {KeyValueObject} json
     * @returns
     */
    public withJsonObj(json: KeyValueObject): this {
        // Si l'objet json est une chaine de caractère, on le transforme en objet
        if (typeof json === 'string') {
            json = { id: json };
        }

        this._json = json;
        this._id = json['id'] as string;
        return this;
    }

    /**
     * Construire et renvoyer l'instance de `T extends BaseEntity`
     */
    abstract build(): T;
}
