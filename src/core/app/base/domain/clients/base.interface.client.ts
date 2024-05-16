import { Observable } from 'rxjs';

/**
 * L'interface `AbstractBaseClient` définit les méthodes qui devront être implémentées par les classes qui manipulant les données et qui extends cette interface.
 * C'est notre contrat pour manipuler les données.
 */
export interface AbstractBaseClient<T, F> {
    /**
     * La méthode `all` est utilisée pour récupérer tous les éléments.
     * Elle doit retourner un Observable qui émet un tableau d'éléments.
     * @returns {Observable<T[]>} Un Observable qui émet un tableau d'éléments.
     */
    all(filters?: F): Observable<T[]>;

    /**
     * La méthode `get` est utilisée pour récupérer un élément avec l'ID passé en param.
     * Elle retourne un Observable avec le bon élément ou une erreur si le élément n'est pas trouvé.
     * @param {string} id L'ID de l'élément à récupérer.
     * @returns {Observable<T>} Un Observable qui émet un le élément récupéré.
     */
    get(id: string): Observable<T>;

    /**
     * La méthode `create` est utilisée pour créer un élément.
     * Elle retourne un Observable avec le nouvel élément ou une erreur si la création a échoué.
     * @param {T} entity L'élément à créer.
     * @returns {Observable<T>} Un Observable qui émet le nouvel élément créé.
     */
    create(entity: T): Observable<T>;

    /**
     * La méthode `update` est utilisée pour mettre à jour un élément.
     * Elle retourne un Observable avec l'élément mis à jour ou une erreur si la mise à jour a échoué.
     * @param {T} entity L'élément à mettre à jour.
     * @returns {Observable<T>} Un Observable qui émet l'élément mis à jour.
     */
    update(entity: T): Observable<T>;

    /**
     * La méthode `delete` est utilisée pour supprimer un élément.
     * Elle retourne un Observable avec un message de succès ou une erreur si la suppression a échoué.
     * @param {string} id  L'ID de l'entité à supprimer.
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void>;
}
