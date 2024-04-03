import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

/**
 * La classe `<%= classify(name) %>` est un modèle de l'objet `<%= classify(name) %>`.
 * [TODO] Implémenter au besoin les autres champs de l'object <%= classify(name) %>
 */
export class <%= classify(name) %> extends BaseEntity {
    constructor(_json: { [key: string]: unknown }) {
        super(_json);
    }
}
