import { HttpClient } from '@angular/common/http';
import { <%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/domain/clients/<%= dasherize(name) %>.interface.client';
import { Http<%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/gateways/http/http-<%= dasherize(name) %>.client';
import { Mock<%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/gateways/mocks/mock-<%= dasherize(name) %>.client';
import { mocked<%= classify(name) %>1 } from '@core/<%= dasherize(name) %>/gateways/mocks/mocks-<%= dasherize(name) %>';
import { environment } from '@environments/environment';

/**
 * Factory pour créer le manipulateur de données
 * Cette class permet de pouvoir configurer la manière dont seront manipulée les données selon l'environnement d'exécution
 * En mode mock pour les tests ou le développement par exemple soit en mode classique via les api.
 */
export class <%= classify(name) %>Factory {
    static getClient(http: HttpClient): <%= classify(name) %>Client {
        switch (environment.mode) {
            case 'mock': // Version mockée utilisée uniquement si l'on est en mode mock ('npm run start:mock')
                // [TODO] A modifier pour utiliser les mocks
                return new Mock<%= classify(name) %>Client([mocked<%= classify(name) %>1]);
            default:
                return new Http<%= classify(name) %>Client(http);
        }
    }
}
