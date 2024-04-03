import { User } from '@core/user/domain/models/user.model';
import { UserBuilder } from '@core/user/use-cases/user.builder';

/**
 * Définition de la classe UserMapper qui permet de mapper un objet récupéré depuis une requette http en instance de User
 */
export class UserMapper {
    // Définition de la méthode statique mapTo
    // Cette méthode prend un objet en entrée et renvoie une instance de User
    static mapTo(object: { [key: string]: unknown }): User {
        // Création d'une nouvelle instance de UserBuilder
        // Utilisation de la méthode withJsonObj pour initialiser l'instance avec l'objet json en entrée
        // Ppenser à modifier le InsuranceFileBuilder pour overrider cette méthode (withJsonObj) et prendre en compte les champs necessaires pour construire l'instance de InsuranceFile
        // Utilisation de la méthode build pour construire et renvoyer l'instance de User
        return new UserBuilder().withJsonObj(object).build();
    }
}
