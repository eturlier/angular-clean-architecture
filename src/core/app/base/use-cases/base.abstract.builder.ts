import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * La classe `AbstractBaseBuilder` permet d'avoir un constructeur de l'objet `T extends BaseEntity` avec un simple object json.
 * Elle utilise le pattern Builder pour créer des instances de `T extends BaseEntity`.
 */
export abstract class AbstractBaseBuilder<T extends BaseEntity> {
    protected _json: KeyValueObject = {};
    protected _id: string = '';

    public withJsonObj(json: KeyValueObject): AbstractBaseBuilder<T> {
        this._json = json;
        this._id = json['id'] as string;
        return this;
    }

    abstract build(): T;
}
