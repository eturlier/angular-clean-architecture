import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { KeyValueObject } from '@ui/shared/models/utils.model';

/**
 * Contrat d'interface `UserInterface` (permettant de bien configurer le mock par exemple)
 * [TODO] Implémenter au besoin les autres champs
 */
export interface UserInterface {
    id: string;
    name: string;
}

/**
 * La classe `User` est un modèle de l'objet `User`.
 * [TODO] Implémenter au besoin les autres champs de l'object User
 */
export class User extends BaseEntity implements UserInterface {
    constructor(
        _json: KeyValueObject,
        private _name: string
    ) {
        super(_json);
    }

    get name(): string {
        return this._name as string;
    }
}
