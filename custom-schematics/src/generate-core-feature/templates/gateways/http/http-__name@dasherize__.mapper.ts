import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { <%= classify(name) %>Builder } from '@core/<%= dasherize(name) %>/use-cases/<%= dasherize(name) %>.builder';
import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * Définition de la classe <%= classify(name) %>FileMapper qui permet de mapper un objet récupéré depuis une requette http en instance de <%= classify(name) %> et inversement
 */
export class <%= classify(name) %>Mapper {
    /**
     * Méthode statique pour mapper un objet KeyValueObject en une instance de <%= classify(name) %>.
     * @param {KeyValueObject} object - L'objet à mapper en <%= classify(name) %>.
     * @returns {<%= classify(name) %>} - Une instance de <%= classify(name) %> initialisée avec les valeurs de l'objet.
     */
    static mapDTOToEntity(object: KeyValueObject): <%= classify(name) %> {
        // Création d'une nouvelle instance de <%= classify(name) %>Builder
        // Utilisation de la méthode withJsonObj pour initialiser l'instance avec l'objet json en entrée
        // Penser à modifier le <%= classify(name) %>Builder pour overrider cette méthode (withJsonObj) et prendre en compte les champs necessaires pour construire l'instance de <%= classify(name) %>
        // Utilisation de la méthode build pour construire et renvoyer l'instance de <%= classify(name) %>
        return new <%= classify(name) %>Builder().withJsonObj(object).build();
    }

    /**
     * Méthode statique pour mapper une instance de <%= classify(name) %> en un objet KeyValueObject.
     * @param {<%= classify(name) %>} entity - L'instance de <%= classify(name) %> à mapper en KeyValueObject.
     * @returns {KeyValueObject} - Un objet KeyValueObject initialisé avec les valeurs de l'instance de <%= classify(name) %>.
     */
    static mapDTOFromEntity(entity: <%= classify(name) %>): KeyValueObject {
        return entity.json;
    }
}
