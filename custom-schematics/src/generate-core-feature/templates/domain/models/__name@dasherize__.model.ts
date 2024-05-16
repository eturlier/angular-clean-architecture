import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { KeyValueObject } from '@ui-shared/models/utils.model';

/**
 * Contrat d'interface `<%= classify(name) %>Interface` (permettant de bien configurer le mock par exemple)
 * [TODO] Implémenter au besoin les autres champs
 */
export interface <%= classify(name) %>Interface {
    id: string
}

/**
 * La classe `<%= classify(name) %>` est un modèle de l'objet `<%= classify(name) %>`.
 * [TODO] Implémenter au besoin les autres champs de l'object <%= classify(name) %>
 */
export class <%= classify(name) %> extends BaseEntity implements <%= classify(name) %>Interface {
    constructor(_json: KeyValueObject) {
        super(_json);
    }
}
