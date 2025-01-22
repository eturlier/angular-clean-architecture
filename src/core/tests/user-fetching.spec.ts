import { User } from '@core/user/domain/models/user.model';
import { UserHandler } from '@core/user/use-cases/user.handler';
import { UserClient } from '@core/user/domain/clients/user.interface.client';
import { MockUserClient } from '@core/user/gateways/mocks/mock-user.client';
import { mockedUser1, mockedUser2 } from '@core/user/gateways/mocks/mocks-user';

/**
 * Tests pour le gestionnaire de dossiers.
 */
describe('Users handler fetches', () => {
    let users1: User;
    let user2: User;

    beforeEach(() => {
        users1 = mockedUser1;
        user2 = mockedUser2;
    });

    describe('A list', () => {
        it('with zero user if there  is no user in the source', done => {
            const usersHandler: UserHandler = createUserHandler();
            usersHandler.all().subscribe((users: User[]) => {
                verifyUserList(users, []);
                done();
            });
        });

        it('with one user if there is one user in the source', done => {
            const usersHandler: UserHandler = createUserHandler([users1]);
            usersHandler.all().subscribe((users: User[]) => {
                verifyUserList(users, [users1]);
                done();
            });
        });

        it('with two user if there  is two user in the source', done => {
            const usersHandler: UserHandler = createUserHandler([
                users1,
                user2,
            ]);
            usersHandler.all().subscribe((users: User[]) => {
                verifyUserList(users, [users1, user2]);
                done();
            });
        });
    });

    it('A details of one user', done => {
        const usersHandler: UserHandler = createUserHandler([user2]);
        usersHandler.get('2').subscribe((user: User) => {
            verifyOneUser(user, user2);
            done();
        });
    });

    /**
     * Crée un gestionnaire de dossiers.
     * @param {User[]} users - Un tableau de dossiers à utiliser pour le MockUserLoader. Par défaut, c'est un tableau vide.
     * @returns {UserHandler} - Un nouvel objet UserHandler qui utilise le MockUserLoader comme source de dossiers.
     */
    function createUserHandler(users: User[] = []) {
        const usersSource: UserClient = new MockUserClient(users);
        return new UserHandler(usersSource);
    }

    /**
     * Vérifie si la liste des dossiers correspond à la liste attendue.
     * @param {User[]} users - La liste des dossiers à vérifier.
     * @param {User[]} expectedUsers - La liste attendue des dossiers.
     */
    function verifyUserList(users: User[], expectedUsers: User[]) {
        // Vérifie si la longueur de la liste des dossiers correspond à la longueur de la liste attendue
        expect(users.length).toEqual(expectedUsers.length);

        // Pour chaque dossier attendu, vérifie si le dossier correspondant dans la liste à vérifier est égal au dossier attendu
        expectedUsers.forEach((expectedUser, index) => {
            verifyOneUser(users[index], expectedUser);
        });
    }

    /**
     * Vérifie si un dossier correspond au dossier attendu.
     * @param {User} user - Le dossier à vérifier.
     * @param {User} expectedUser - Le dossier attendu.
     */
    function verifyOneUser(user: User, expectedUser: User) {
        // Vérifie si l'ID du dossier correspond à l'ID du dossier attendu
        expect(user?.id).toEqual(expectedUser.id);
    }
});
