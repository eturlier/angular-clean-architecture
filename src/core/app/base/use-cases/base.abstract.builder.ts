import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

/**
 * La classe abstraite `AbstractBaseBuilder` permet d'avoir un constructeur de l'objet `T extends BaseEntity` avec des méthodes partagées.
 * Elle utilise le pattern Builder pour créer des instances de `T extends BaseEntity`.
 */
export abstract class AbstractBaseBuilder<T extends BaseEntity> {
    private _obj: unknown;

    constructor(private factory: (object: unknown) => T) {}

    public withObj(obj: unknown): AbstractBaseBuilder<T> {
        this._obj = obj;
        return this;
    }

    public build(): T {
        return this.factory(this._obj);
    }
}
