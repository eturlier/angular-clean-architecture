import { User } from '@core/user/domain/models/user.model';
import { AbstractBaseBuilder } from '@core/base/use-cases/base.abstract.builder';

/**
 * La classe `UserBuilder` est un constructeur de l'objet `User`.
 * Elle utilise le pattern Builder pour créer des instances de `User`.
 * Les méthodes communes sont déjà définies dans `AbstractBaseBuilder`.
 */
export class UserBuilder extends AbstractBaseBuilder<User> {
    constructor() {
        super((obj: unknown) => new User(obj));
    }
}
