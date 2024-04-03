import { AbstractBaseBuilder } from '@core/base/use-cases/base.abstract.builder';
import { User } from '@core/user/domain/models/user.model';

/**
 * La classe `UserBuilder` est un constructeur de l'objet `User`.
 * Elle utilise le pattern Builder pour créer des instances de `User`.
 * Les méthodes communes sont déjà définies dans `AbstractBaseBuilder`.
 */
export class UserBuilder extends AbstractBaseBuilder<User> {
    private _name: string = '';

    public override withJsonObj(json: { [key: string]: unknown }): UserBuilder {
        this._json = json;
        this._name = json['name'] as string;
        return this;
    }

    public build(): User {
        return new User(this._json, this._name);
    }
}
