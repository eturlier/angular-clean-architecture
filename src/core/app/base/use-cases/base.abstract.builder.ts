import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

/**
 * La classe `AbstractBaseBuilder` permet d'avoir un constructeur de l'objet `T extends BaseEntity` avec un simple object json.
 * Elle utilise le pattern Builder pour créer des instances de `T extends BaseEntity`.
 */
export abstract class AbstractBaseBuilder<T extends BaseEntity> {
    protected _json: { [key: string]: unknown } = {};

    public withJsonObj(json: {
        [key: string]: unknown;
    }): AbstractBaseBuilder<T> {
        this._json = json;
        return this;
    }

    abstract build(): T;
}
