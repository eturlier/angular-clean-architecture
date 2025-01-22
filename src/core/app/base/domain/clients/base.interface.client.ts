import { Observable } from 'rxjs';
import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { FilterEvent } from '@core/base/domain/models/filter-event.model';
import { KeyValueObject } from '@ui/shared/models/utils.model';

/**
 * L'interface `AbstractBaseClient` définit les méthodes qui devront être implémentées par les classes qui manipulant les données et qui extends cette interface.
 * C'est notre contrat pour manipuler les données.
 * @param {T} T extends BaseEntity L'entité manipulée.
 * @param {F} F extends FilterEvent Le filtre utilisé pour récupérer les entités.
 */
export abstract class AbstractBaseClient<
    T extends BaseEntity,
    F extends FilterEvent,
> {

    /**
     * La méthode `all` est utilisée pour récupérer tous les éléments.
     * Elle doit retourner un Observable qui émet un tableau d'éléments.
     * @param {F} filters Les filtres utilisés pour récupérer les éléments.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau d'éléments.
     */
    abstract all(filters?: F): Observable<T[]>;

    /**
     * La méthode `get` est utilisée pour récupérer un élément avec l'ID passé en param.
     * Elle retourne un Observable avec le bon élément ou une erreur si le élément n'est pas trouvé.
     * @param {string} id L'ID de l'élément à récupérer.
     * @param {KeyValueObject} options Les paramètres additionnels.
     * @returns {Observable<T>} Un Observable qui émet un le élément récupéré.
     */
    abstract get(id: string, options?: KeyValueObject): Observable<T>;

    /**
     * La méthode `create` est utilisée pour créer un élément.
     * Elle retourne un Observable avec le nouvel élément ou une erreur si la création a échoué.
     * @param {T} entity L'élément à créer.
     * @returns {Observable<T | void>} Un Observable qui émet le nouvel élément créé ou rien du tout.
     */
    abstract create(entity: T): Observable<T | void>;

    /**
     * La méthode `update` est utilisée pour mettre à jour un élément.
     * Elle retourne un Observable avec l'élément mis à jour ou une erreur si la mise à jour a échoué.
     * @param {T} entity L'élément à mettre à jour.
     * @returns {Observable<T | void>} Un Observable qui émet l'élément mis à jour ou rien du tout.
     */
    abstract update(entity: T): Observable<T | void>;

    /**
     * La méthode `delete` est utilisée pour supprimer un élément.
     * Elle retourne un Observable avec un message de succès ou une erreur si la suppression a échoué.
     * @param {string | T} id  L'ID de l'entité à supprimer.
     * @param {T} entity  Facultatif: L'entité à supprimer (utilisé dans le cas des entité avec un State).
     * @returns {Observable<void>}
     */
    abstract delete(id: string, entity?: T): Observable<void>;
}
