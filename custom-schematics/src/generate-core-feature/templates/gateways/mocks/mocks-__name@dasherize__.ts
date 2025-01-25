import { <%= classify(name) %>, <%= classify(name) %>Interface } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { <%= classify(name) %>Builder } from '@core/<%= dasherize(name) %>/use-cases/<%= dasherize(name) %>.builder';

/**
 * Mocks/simulations de données pour le manipulateur de données (`Mock<%= classify(name) %>Loader`)
 *
 */
 const mocked<%= classify(name) %>List: <%= classify(name) %>Interface[] = [
    { id: '1' }
 ];

export const mocked<%= classify(name) %>1: <%= classify(name) %> = new <%= classify(name) %>Builder()
    .withJsonObj(JSON.parse(JSON.stringify(mocked<%= classify(name) %>List)[0]))
    .build();
