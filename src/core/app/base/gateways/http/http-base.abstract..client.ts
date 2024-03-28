import { HttpClient } from '@angular/common/http';
import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { Observable } from 'rxjs';

/**
 * [TODO] La abstraite `AbstractHttpBaseClient` contient les méthodes partagées par les clients (services appelant les api) utilisant le protocole HTTP.
 */
export abstract class AbstractHttpBaseClient<B extends BaseEntity> {
    constructor(
        protected http: HttpClient,
        private baseUrlService: string
    ) {}

    /**
     * [TODO] Création d'une URL à partir d'un chemin et de paramètres
     * @param path
     * @param parameters
     * @returns
     */
    public makeURL(path: string): string {
        console.log(`api/${path}`);
        throw new Error('Not implemented');
    }

    /**
     * Url complète à partir de la base du service transmise au constructeur et de la config générale.
     */
    protected _getURL(url: string): string {
        return this.makeURL(
            (this.baseUrlService ? this.baseUrlService + '/' : '') + url
        );
    }

    /**
     * Appelle le service par la méthode HttpGet
     * @param {string} service Le nom du service a appeler
     */
    protected _get<T>(service: string): Observable<T> {
        return this.http.get<T>(this._getURL(service));
    }

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entités de type T.
     * @returns {Observable<B[]>} Un Observable qui émet un tableau vide ou contenant toutes les entités.
     */
    protected abstract all(): Observable<B[]>;

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * @param {string} id  L'ID de l'entités à récupérer.
     * @returns {Observable<B>} Un Observable qui émet un le dossier récupéré.
     */
    protected abstract get(id: string): Observable<B>;
}
