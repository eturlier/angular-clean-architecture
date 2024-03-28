import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { <%= classify(name) %>Builder } from '@core/<%= dasherize(name) %>/use-cases/<%= dasherize(name) %>.builder';

/**
 * Mocks/simulations de données pour le manipulateur de données (`Mock<%= classify(name) %>Loader`)
 *
 */

export const mocked<%= classify(name) %>1: <%= classify(name) %> = new <%= classify(name) %>Builder()
    .withObj({ id: '1' })
    .build();
