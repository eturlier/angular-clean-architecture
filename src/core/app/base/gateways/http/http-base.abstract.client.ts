import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpOptions } from '@core/base/domain/models/http-options.model';
import { CustomHttpParams } from '@core/base/gateways/http/custom-http-params';
import { Observable } from 'rxjs';
import URI from 'urijs';

/**
 * La classe abstraite `AbstractHttpBaseClient` contient les méthodes partagées par les clients (services appelant les api) utilisant le protocole HTTP.
 */
export abstract class AbstractHttpBaseClient {
    private readonly http = inject(HttpClient);

    protected abstract basePathApi: string | undefined;

    /**
     * Création d'une URL à partir d'un chemin et de paramètres
     * @param {path} path Chemin de l'URL
     * @param {parameters} parameters Paramètres de l'URL
     * @returns {string} URL complète
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
     * @param {string} name Nom du paramètre
     * @param {string} value Valeur du paramètre
     * @returns {CustomHttpParams}
     */
    protected _makeSimpleParam(name: string, value: string): CustomHttpParams {
        const params = new CustomHttpParams().setValue(name, value);
        return params;
    }

    /**
     * Crée un objet RequestOptions initialisé
     * @param {CustomHttpParams} httpParams Tableau de paramètres
     * @param {boolean} withCredentials Indique si on veut envoyer les cookies (par défaut true)
     * @param {boolean} withResponse Indique si on veut récupérer la réponse entière (par défaut false)
     * @param {string} responseType Type de réponse attendue (par défaut 'json')
     * @returns {HttpOptions}
     */
    protected _getOptions(
        httpParams?: CustomHttpParams,
        headers?: HttpHeaders,
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

        if (headers) {
            options.headers = headers;
        }

        return options;
    }

    /**
     * Url complète à partir de la base du service transmise au constructeur et de la config générale.
     * @param {string} service Nom du service à appeler
     * @returns {string} URL complète
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
        param?: CustomHttpParams | string,
        headers?: HttpHeaders,
        responseType?: string
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;

        return this.http.get<T>(
            this._getURL(service),
            this._getOptions(
                httpParams,
                headers,
                true,
                false,
                responseType
            ) as object
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
        param?: CustomHttpParams | string,
        headers?: HttpHeaders
    ): Observable<T> {
        const httpParams: CustomHttpParams | undefined = param
            ? typeof param === 'string'
                ? this._makeSimpleParam('id', param)
                : param
            : undefined;
        return this.http.post<T>(
            this._getURL(service),
            data,
            this._getOptions(httpParams, headers) as object
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
}

class ConfigUrl {
    public static makeURL(path: string, parameters: object = {}): string {
        return URI(`api/${path}`).search(parameters).normalize().toString();
    }
}
