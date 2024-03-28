import { Observable } from 'rxjs';

/**
 * L'interface `AbstractBaseClient` définit les méthodes qui devront être implémentées par les classes qui manipulant les données et qui extends cette interface.
 * C'est notre contrat pour manipuler les données.
 */
export interface AbstractBaseClient<T> {
    /**
     * La méthode `all` est utilisée pour récupérer tous les éléments.
     * Elle doit retourner un Observable qui émet un tableau d'éléments.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau d'éléments.
     */
    all(): Observable<T[]>;

    /**
     * La méthode `get` est utilisée pour récupérer un élément avec l'ID passé en param.
     * Elle retourne un Observable avec le bon élément ou une erreur si le élément n'est pas trouvé.
     * @param {string} id L'ID de l'élément à récupérer.
     * @returns {Observable<T>} Un Observable qui émet un le élément récupéré.
     */
    get(id: string): Observable<T>;
}
