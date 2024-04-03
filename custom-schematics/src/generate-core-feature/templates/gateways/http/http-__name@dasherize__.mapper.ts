import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { <%= classify(name) %>Builder } from '@core/<%= dasherize(name) %>/use-cases/<%= dasherize(name) %>.builder';

/**
 * Définition de la classe <%= classify(name) %>FileMapper qui permet de mapper un objet récupéré depuis une requette http en instance de <%= classify(name) %>
 */
export class <%= classify(name) %>Mapper {
    // Définition de la méthode statique mapTo
    // Cette méthode prend un objet en entrée et renvoie une instance de <%= classify(name) %>
    static mapTo(object: { [key: string]: unknown }): <%= classify(name) %> {
        // Création d'une nouvelle instance de <%= classify(name) %>Builder
        // Utilisation de la méthode withJsonObj pour initialiser l'instance avec l'objet json en entrée
        // Penser à modifier le <%= classify(name) %>Builder pour overrider cette méthode (withJsonObj) et prendre en compte les champs necessaires pour construire l'instance de <%= classify(name) %>
        // Utilisation de la méthode build pour construire et renvoyer l'instance de <%= classify(name) %>
        return new <%= classify(name) %>Builder().withJsonObj(object).build();
    }
}
