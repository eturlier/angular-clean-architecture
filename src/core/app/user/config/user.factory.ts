import { UserClient } from '@core/user/domain/clients/user.interface.client';
import { HttpUserClient } from '@core/user/gateways/http/http-user.client';
import { MockUserClient } from '@core/user/gateways/mocks/mock-user.client';
import { mockedUser1, mockedUser2 } from '@core/user/gateways/mocks/mocks-user';
import { environment } from '@environments/environment';

const mocks = [mockedUser1, mockedUser2];

/**
 * Factory pour créer le manipulateur de données
 * Cette class permet de pouvoir configurer la manière dont seront manipulée les données selon l'environnement d'exécution
 * En mode mock pour les tests ou le développement par exemple soit en mode classique via les api.
 */
export class UserFactory {
    static getClient(): UserClient {
        switch (environment.mode) {
            case 'mock': // Version mockée utilisée uniquement si l'on est en mode mock ('npm run start:mock')
                // [TODO] A modifier pour utiliser les mocks
                return new MockUserClient(mocks);
            default:
                return new HttpUserClient();
        }
    }
}
