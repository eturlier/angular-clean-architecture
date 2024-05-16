import { HttpClient, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { HttpOptions } from '@core/base/domain/models/http-options.model';
import { CustomHttpParams } from '@core/base/gateways/http/custom-http-params';
import { Observable } from 'rxjs';
import URI from 'urijs';

/**
 * La classe abstraite `AbstractHttpBaseClient` contient les méthodes partagées par les clients (services appelant les api) utilisant le protocole HTTP.
 */
export abstract class AbstractHttpBaseClient<T extends BaseEntity> {
    private readonly http = inject(HttpClient);

    protected basePathApi: string | undefined;

    constructor() {}

    /**
     * Création d'une URL à partir d'un chemin et de paramètres
     * @param path
     * @param parameters
     * @returns
     */
    public makeURL(path: string, parameters?: string): string {
        let url = ConfigUrl.makeURL(
            this.basePathApi ? `${this.basePathApi}/${path}` : path
        );

        if (parameters) {
            url += '?' + parameters;
        }

        return url;
    }

    /**
     * Crée un objet de paramètres pour les url à partir d'un nom et d'une valeur
     */
    protected _makeSimpleParam(name: string, value: string): CustomHttpParams {
        const params = new CustomHttpParams().setValue(name, value);
        return params;
    }

    /**
     * Crée un objet RequestOptions initialisé
     */
    protected _getOptions(
        httpParams?: CustomHttpParams,
        withCredentials: boolean = true,
        withResponse: boolean = false,
        responseType: string = 'json'
    ): HttpOptions {
        const options: HttpOptions = {
            context: new HttpContext(),
            params: httpParams?.getParams() as CustomHttpParams | undefined,
            responseType: responseType,
            withCredentials: withCredentials,
            observe: withResponse ? 'response' : 'body',
        };

        return options;
    }

    /**
     * Url complète à partir de la base du service transmise au constructeur et de la config générale.
     */
    protected _getURL(service: string): string {
        return this.makeURL(service);
    }

    /**
     * Appelle le service par la méthode HttpGet
     * @param {string} service Le nom du service a appeler
     * @param {CustomHttpParams | string} param Tableau de paramètres (HttpParams) ou string donnant la valeur du paramètre ID
     */
    protected _get<T>(
        service: string,
        param?: CustomHttpParams | string
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;
        return this.http.get<T>(
            this._getURL(service),
            this._getOptions(httpParams) as object
        );
    }

    /**
     * Appelle le service par la méthode HttpPost et passe les données
     * @param {string} service Le nom du service a appeler
     * @param {unknown} data Les données à envoyer
     * @param {CustomHttpParams | string} param Tableau de paramètres (HttpParams) ou string donnant la valeur du paramètre ID
     */
    protected _post<T>(
        service: string,
        data: unknown,
        param?: CustomHttpParams | string
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;
        return this.http.post<T>(
            this._getURL(service),
            data,
            this._getOptions(httpParams) as object
        );
    }

    /**
     * Appelle le service par la méthode HttpPut et passe les données
     * @param {string} service Le nom du service a appeler
     * @param {unknown} data Les données à envoyer
     * @param {CustomHttpParams | string} param Tableau de paramètres (HttpParams) ou string donnant la valeur du paramètre ID
     */
    protected _put<T>(
        service: string,
        data: unknown,
        param?: CustomHttpParams | string
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;
        return this.http.put<T>(
            this._getURL(service),
            data,
            this._getOptions(httpParams) as object
        );
    }

    /**
     * Appelle le service par la méthode HttpDelete
     * @param {string} service Le nom du service a appeler
     * @param {CustomHttpParams | string} param Tableau de paramètres (HttpParams) ou string donnant la valeur du paramètre ID
     */
    protected _delete<T>(
        service: string,
        param?: CustomHttpParams | string
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;
        return this.http.delete<T>(
            this._getURL(service),
            this._getOptions(httpParams) as object
        );
    }

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entités de type T.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau vide ou contenant toutes les entités.
     */
    protected abstract all(): Observable<T[]>;

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * @param {string} id  L'ID de l'entités à récupérer.
     * @returns {Observable<T>} Un Observable qui émet un le dossier récupéré.
     */
    protected abstract get(id: string): Observable<T>;
}

class ConfigUrl {
    public static makeURL(path: string, parameters: object = {}): string {
        return URI(`api/${path}`).search(parameters).normalize().toString();
    }
}
