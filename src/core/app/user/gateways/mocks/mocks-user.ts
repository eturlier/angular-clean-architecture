import { User, UserInterface } from '@core/user/domain/models/user.model';
import { UserBuilder } from '@core/user/use-cases/user.builder';

/**
 * Mocks/simulations de données pour le manipulateur de données (`MockUserLoader`)
 *
 */
const mockedUserList: UserInterface[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
];

export const mockedUser1: User = new UserBuilder()
    .withJsonObj(JSON.parse(JSON.stringify(mockedUserList[0])))
    .build();

export const mockedUser2: User = new UserBuilder()
    .withJsonObj(JSON.parse(JSON.stringify(mockedUserList[1])))
    .build();
