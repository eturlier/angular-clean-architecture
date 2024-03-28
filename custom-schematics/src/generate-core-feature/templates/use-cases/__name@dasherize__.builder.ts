import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { AbstractBaseBuilder } from '@core/base/use-cases/base.abstract.builder';

/**
 * La classe `<%= classify(name) %>Builder` est un constructeur de l'objet `<%= classify(name) %>`.
 * Elle utilise le pattern Builder pour créer des instances de `<%= classify(name) %>`.
 * Les méthodes communes sont déjà définies dans `AbstractBaseBuilder`.
 */
export class <%= classify(name) %>Builder extends AbstractBaseBuilder<<%= classify(name) %>>{
    constructor() {
        super((obj: unknown) => new <%= classify(name) %>(obj));
    }
}
