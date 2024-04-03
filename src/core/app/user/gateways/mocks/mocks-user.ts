import { User } from '@core/user/domain/models/user.model';
import { UserBuilder } from '@core/user/use-cases/user.builder';

/**
 * Mocks/simulations de données pour le manipulateur de données (`MockUserLoader`)
 *
 */

export const mockedUser1: User = new UserBuilder()
    .withJsonObj({ id: '1', name: 'User 1' })
    .build();

export const mockedUser2: User = new UserBuilder()
    .withJsonObj({ id: '2', name: 'User 2' })
    .build();

export const mockedUser3: User = new UserBuilder()
    .withJsonObj({ id: '3', name: 'User 3' })
    .build();
