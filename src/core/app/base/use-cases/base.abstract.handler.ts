import { AbstractBaseClient } from '@core/base/domain/clients/base.interface.client';
import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { Observable } from 'rxjs';

/**
 * La classe abstraite `AbstractBaseHandler` permet d'avoir les méthodes utilisées par un gestionnaire de données
 * Elle définit les cas d'utilisation partagés pour les entités.
 */
export abstract class AbstractBaseHandler<T extends BaseEntity> {
    constructor(private _client: AbstractBaseClient<T>) {}

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entités de type T extends BaseEntity.
     * Elle appelle le client correspondant pour récupérer toutes les entités de type T extends BaseEntity ou afficher l'erreure correspondante.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau vide ou remplis d'entités.
     */
    public all(): Observable<T[]> {
        return this._client.all();
    }

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * Elle appelle le client correspondant pour récupérer une entité ou afficher l'erreure correspondante.
     * @param {strind} id L'ID de l'entité à récupérer.
     * @returns {Observable<T>} Un Observable qui émet l'entité récupéré.
     */
    public get(id: string): Observable<T> {
        return this._client.get(id);
    }
}
