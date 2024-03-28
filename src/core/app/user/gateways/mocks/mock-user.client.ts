import { User } from '@core/user/domain/models/user.model';
import { AbstractMockBaseClient } from '@core/base/gateways/mocks/mock-base.abstract.client';
import { UserClient } from '@core/user/domain/clients/user.interface.client';

/**
 * La classe `MockUserClient` est une implémentation de l'interface `UserLoader`.
 * Elle est utilisée pour simuler le comportement de `UserLoader` dans un environnement mockée ou de développement lorsque l'implémentation via le protocole HTTP n'est pas encore disponible.
 * Les méthodes communes sont déjà définies dans `AbstractMockBaseClient`.
 */
export class MockUserClient
    extends AbstractMockBaseClient<User>
    implements UserClient {}
