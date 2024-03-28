import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { AbstractMockBaseClient } from '@core/base/gateways/mocks/mock-base.abstract.client';
import { <%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/domain/clients/<%= dasherize(name) %>.interface.client';

/**
 * La classe `Mock<%= classify(name) %>Client` est une implémentation de l'interface `<%= classify(name) %>Loader`.
 * Elle est utilisée pour simuler le comportement de `<%= classify(name) %>Loader` dans un environnement mockée ou de développement lorsque l'implémentation via le protocole HTTP n'est pas encore disponible.
 * Les méthodes communes sont déjà définies dans `AbstractMockBaseClient`.
 */
export class Mock<%= classify(name) %>Client
    extends AbstractMockBaseClient<<%= classify(name) %>>
    implements <%= classify(name) %>Client {}
