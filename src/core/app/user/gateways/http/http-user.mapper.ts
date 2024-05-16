import { User } from '@core/user/domain/models/user.model';
import { UserBuilder } from '@core/user/use-cases/user.builder';
import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * Définition de la classe UserFileMapper qui permet de mapper un objet récupéré depuis une requette http en instance de User et inversement
 */
export class UserMapper {
    /**
     * Méthode statique pour mapper un objet KeyValueObject en une instance de User.
     * @param {KeyValueObject} object - L'objet à mapper en User.
     * @returns {User} - Une instance de User initialisée avec les valeurs de l'objet.
     */
    static mapDTOToEntity(object: KeyValueObject): User {
        // Création d'une nouvelle instance de UserBuilder
        // Utilisation de la méthode withJsonObj pour initialiser l'instance avec l'objet json en entrée
        // Penser à modifier le UserBuilder pour overrider cette méthode (withJsonObj) et prendre en compte les champs necessaires pour construire l'instance de User
        // Utilisation de la méthode build pour construire et renvoyer l'instance de User
        return new UserBuilder().withJsonObj(object).build();
    }

    /**
     * Méthode statique pour mapper une instance de User en un objet KeyValueObject.
     * @param {User} entity - L'instance de User à mapper en KeyValueObject.
     * @returns {KeyValueObject} - Un objet KeyValueObject initialisé avec les valeurs de l'instance de User.
     */
    static mapDTOFromEntity(entity: User): KeyValueObject {
        return entity.json;
    }
}
