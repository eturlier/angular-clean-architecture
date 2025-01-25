import { AbstractBaseClient } from '@core/base/domain/clients/base.interface.client';
import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { FilterEvent } from '@core/base/domain/models/filter-event.model';
import { KeyValueObject } from '@ui/shared/models/utils.model';
import { Observable } from 'rxjs';

/**
 * La classe abstraite `AbstractBaseHandler` permet d'avoir les méthodes utilisées par un gestionnaire de données
 * Elle définit les cas d'utilisation partagés pour les entités.
 */
export abstract class AbstractBaseHandler<
    T extends BaseEntity,
    F extends FilterEvent,
> {
    constructor(protected _client: AbstractBaseClient<T, F>) {}

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entités de type T extends BaseEntity.
     * Elle appelle le client correspondant pour récupérer toutes les entités de type T extends BaseEntity ou afficher l'erreure correspondante.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau vide ou remplis d'entités.
     */
    public all(filters?: F): Observable<T[]> {
        return this._client.all(filters);
    }

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * Elle appelle le client correspondant pour récupérer une entité ou afficher l'erreure correspondante.
     * @param {strind} id L'ID de l'entité à récupérer.
     * @param {KeyValueObject} options Les paramètres additionnels.
     * @returns {Observable<T>} Un Observable qui émet l'entité récupéré.
     */
    public get(id: string, options?: KeyValueObject): Observable<T> {
        return this._client.get(id, options);
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour un élément.
     * Elle retourne un Observable avec l'élément mis à jour ou une erreur si la mise à jour a échoué.
     * @param {T} Entity L'élément à mettre à jour.
     * @returns {Observable<T | void>} Un Observable qui émet l'élément mis à jour ou rien.
     */
    public create(entity: T): Observable<T | void> {
        return this._client.create(entity);
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour un élément.
     * Elle retourne un Observable avec l'élément mis à jour ou une erreur si la mise à jour a échoué.
     * @param {T} entity L'élément à mettre à jour.
     * @returns {Observable<T | void>} Un Observable qui émet l'élément mis à jour ou rien.
     */
    public update(entity: T): Observable<T | void> {
        return this._client.update(entity);
    }

    /**
     * La méthode `delete` est utilisée pour supprimer un élément.
     * Elle retourne un Observable avec un message de succès ou une erreur si la suppression a échoué.
     * @param {string} id Id de l'élément à supprimer.
     * @param {T} entity  Facultatif: L'entité à supprimer (utilisé dans le cas des entité avec un State).
     * @returns {Observable<void>}
     */
    public delete(id: string, entity?: T): Observable<void> {
        return this._client.delete(id, entity);
    }
}
