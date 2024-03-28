import { User } from '@core/user/domain/models/user.model';
import { AbstractBaseHandler } from '@core/base/use-cases/base.abstract.handler';
import { UserClient } from '@core/user/domain/clients/user.interface.client';

/**
 * La classe `UserHandler` est un gestionnaire qui définit les cas d'utilisation pour les entités.
 * Elle utilise l'interface `UserLoader` pour charger les entités qui sera defini :
 * - via 'UserFactory' par provide sur les composants en ayant besoin dans le dossier ui/
 * - directement dans les test. pour les TU
 * Les méthodes communes sont déjà définies dans `AbstractBaseHandler`.
 */
export class UserHandler extends AbstractBaseHandler<User> {
    constructor(private _userLoaderLoader: UserClient) {
        super(_userLoaderLoader);
    }
}
